require "rails_helper"

RSpec.describe Api::V1::VetsController, type: :controller do
  describe "POST#create" do
    let!(:user_2) { User.create(
      email: "lizardlover@herpz.com",
      first_name: "Anna",
      password: "Ilovemylizard97",
      zip: "03038"
    )}
    let!(:vet_1) { Vet.create(
      name: "Derry Animal Hospital",
      address: "28 Tsienneto Rd, Derry, NH 03038"
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
        sign_in(user_2)
        post :create, params: {user_id: user_2.id, current_user: user_2,
        vet: { name: vet_1.name, address: vet_1.address}}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response["name"]).to eq(vet_1.name)
        expect(parsed_response["address"]).to eq(vet_1.address)
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
        sign_in(user_2)
        # post :create, params: {user_id: user_2.id, current_user: user_2,
        # vet: { name: vet_1.name, address: vet_1.address}}

        # parsed_response = JSON.parse(response.body)

        visit "/users/#{user_2.id}"

        expect(page).to have_text("Derry Animal Hospital")
      end
    end
  end
end

