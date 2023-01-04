require "rails_helper"

RSpec.describe Api::V1::PetsController, type: :controller do
  describe "POST#create" do
    let!(:user_1) { User.create(
      email: "snakelover@snakes.com",
      first_name: "Nico",
      password: "Suze2022",
      zip: "02144"
    )}
    let!(:pet_1) { Pet.create(
      name: "Suze",
      animal: "Snake",
      species: "Ball Python",
      birthday: Date.parse('01-09-2020')
      personality: "Docile, yet explorative and curious.",
      user: user_1
    )}

    it "should return a successful status" do
      sign_in(user_1)
      post :create, params: {user_id: user_1.id, current_user: user_1, 
      pet: { name: pet_1.name, animal: pet_1.animal, species: pet_1.species, birthday: pet_1.birthday, personality: pet_1.personality}}

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")\
    end

    context "when a signed-in user completes the form correctly and submits" do
      it "should return the successfully added pet" do
        sign_in(user_1)
        post :create, params: {user_id: user_1.id, current_user: user_1, 
        pet: { name: pet_1.name, animal: pet_1.animal, species: pet_1.species, birthday: pet_1.birthday, personality: pet_1.personality}}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response["pet"]["name"]).to eq(pet_1.rating)
        expect(parsed_response["pet"]["animal"]).to eq(pet_1.animal)
        expect(parsed_response["pet"]["species"]).to eq(pet_1.species)
        expect(parsed_response["pet"]["birthday"]).to eq(pet_1.birthday)
        expect(parsed_response["pet"]["personality"]).to eq(pet_1.personality)
      end

      context "when the signed-in user does not complete the form correctly" do
        context "with a blank name" do
          it "should return the blank name error message" do
            sign_in(user_1)
            post :create, params: {user_id: user_1.id, current_user: user_1, 
            pet: { name: "", animal: pet_1.animal, species: pet_1.species,birthday: pet_1.birthday, personality: pet_1.personality}}

            parsed_response = JSON.parse(response.body)

            expect(parsed_response["errors"]).to eq("Name can't be blank")
          end
        end
        context "with an unselected animal" do
          it "should return the blank animal error message" do
            sign_in(user_1)
            post :create, params: {user_id: user_1.id, current_user: user_1, 
            pet: { name: pet_1.name, animal: "", species: pet_1.species, birthday: pet_1.birthday, personality: pet_1.personality}}

            parsed_response = JSON.parse(response.body)

            expect(parsed_response["errors"]).to eq("Animal can't be blank")
          end
        end
        context "with a blank species" do
          it "should return the blank species error message" do
            sign_in(user_1)
            post :create, params: {user_id: user_1.id, current_user: user_1, 
            pet: {name: pet_1.name, animal: pet_1.animal, species: "", birthday: pet_1.birthday, personality: pet_1.personality}}

            parsed_response = JSON.parse(response.body)

            expect(parsed_response["errors"]).to eq("Species can't be blank")
          end
        end
        context "with an unselected animal and a blank species" do
          it "should return the blank rating and body error message" do
          sign_in(user_1)
          post :create, params: {user_id: user_1.id, current_user: user_1, 
          pet: {name: pet_1.name, animal: "", species: "", birthday: pet_1.birthday, personality: pet_1.personality}}   

          parsed_response = JSON.parse(response.body)
          
          expect(parsed_response["errors"]).to eq("Animal can't be blank and Species can't be blank")
        end
      end
    end
  end
end