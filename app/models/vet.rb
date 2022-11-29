class Vet < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  belongs_to :user
end