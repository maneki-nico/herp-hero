class UserSerializer < ActiveModel::Serializer
  attributes :id, :zip, :created_at, :email

  has_many :pets
  has_many :tasks
  has_one :vet
end
