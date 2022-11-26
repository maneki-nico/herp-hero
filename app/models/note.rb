class Note < ApplicationRecord
  validates :body
  belongs_to :pet
end