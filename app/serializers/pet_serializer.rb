class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :animal, :species, :birthday, :personality, :profile_photo

  belongs_to :user
  has_many :notes
end
