class Pet < ApplicationRecord
  validates :name, presence: true
  validates :animal, presence: true
  validates :species, presence: true
  belongs_to :user
  has_many :notes
end