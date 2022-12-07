class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :animal, :species, :birthday, :personality, :profile_photo, :updated_at

  belongs_to :user
  has_many :notes
end
