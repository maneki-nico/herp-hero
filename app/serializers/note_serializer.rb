class NoteSerializer < ActiveModel::Serializer
  attributes :id, :body

  belongs_to :pet
end
