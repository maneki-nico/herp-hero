require "rails_helper"

RSpec.describe Api::V1::VetsController, type: :controller do
  describe "POST#create" do
    let!(:user_2) { User.create(
      email: "lizardlover@herpz.com",
      first_name: "Anna",
      password: "Ilovemylizard97",
      zip: "10001"
    )}
    let!(:vet_1) { Vet.create(
      name: "West Chelsea Veterinary",
      address: "248 W 26th St, New York, NY 10001"
    )}
    let!(:user_3) { User.create(
      email: "herpfan1994@herps.com",
      first_name: "Ghiana",
      password: "herpherp4567",
      zip: "10001",
      vet: vet_1
    )}
    let!(:vet_2) { Vet.create(
      name: "Downtown Veterinary Clinic",
      address: "244 9th Ave, New York, NY 10011"
    )}


    it "shoud return a successful status" do
      sign_in(user_2)
      post :create, params: {user_id: user_2.id, current_user: user_2,
      vet: { name: vet_1.name, address: vet_1.address}}

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  
    context "when a signed-in user selects the vet and doesn't already have a vet" do
      it "should submit the successfully added vet" do
        sign_in(user_2)
        post :create, params: {user_id: user_2.id, current_user: user_2,
        vet: { name: vet_1.name, address: vet_1.address}}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response["name"]).to eq(vet_1.name)
        expect(parsed_response["address"]).to eq(vet_1.address)
      end
    end

    context "when a signed-in user selects the vet and already has a vet" do
      it "should change the user's vet to the successfully added vet" do
        sign_in(user_3)
        post :create, params: {user_id: user_3.id, current_user: user_3,
        vet: { name: vet_2.name, address: vet_2.address}}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response["name"]).to eq(vet_2.name)
        expect(parsed_response["address"]).to eq(vet_2.address)
      end
    end

    context "when a signed-in user does not select a vet and doesn't already have a vet" do
      it "shouldn't have a vet listed for the user", js: true do
        sign_in(user_2)
        visit "/users/#{user_2.id}"

        expect(page).to have_text("None yet.")
      end
    end

    context "when a signed-in user has a vet" do
      it "should display the user's vet on the dashboard", js: true do
        sign_in(user_3)
        # post :create, params: {user_id: user_2.id, current_user: user_2,
        # vet: { name: vet_1.name, address: vet_1.address}}

        # parsed_response = JSON.parse(response.body)

        visit "/users/#{user_3.id}"

        expect(page).to have_text("West Chelsea Veterinary")
      end
    end
  end
end

