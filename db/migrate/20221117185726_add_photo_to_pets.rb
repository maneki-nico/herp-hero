class AddPhotoToPets < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :profile_photo, :string
  end
end
