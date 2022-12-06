class NoteSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at

  belongs_to :pet
end
