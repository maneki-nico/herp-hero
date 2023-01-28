require "rails_helper"

RSpec.describe Api::V1::NotesController, type: :controller do
  describe "POST#create" do
    let!(:user_1) { User.create(
      email: "ilovefrogs@frogs.com",
      first_name: "Freida",
      password: "froglover2023",
      zip: "02144"
    )}
    let!(:pet_1) { Pet.create(
      name: "Tinkerbell",
      animal: "Frog",
      species: "Pixie Frog",
      birthday: Date.parse('27-01-2022'),
      personality: "Just kind of sits there",
      user: user_1
    )}
    let!(:note_1) { Note.create(
      body: "Ate on 1/04/2023",
      created_at: Date.parse('20-01-2023'),
      pet: pet_1
    )}
    let!(:note_2) { Note.create(
      body: "Ate on 1/27/2023",
      created_at: Date.parse('27-01-2023'),
    )}

    it "should return a successful status" do
      sign_in(user_1)
      post :create, params: { 
        petId: pet_1.id,
        note: { body: note_2.body}
      }

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end
end