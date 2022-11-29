class Note < ApplicationRecord
  validates :body, presence: true
  belongs_to :pet
end