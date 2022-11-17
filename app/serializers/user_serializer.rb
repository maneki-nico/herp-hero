class UserSerializer < ActiveModel::Serializer
  attributes :id, :zip, :created_at, :email

  has_many :pets
end
