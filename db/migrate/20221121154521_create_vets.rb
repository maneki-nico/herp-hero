class CreateVets < ActiveRecord::Migration[5.2]
  def change
    create_table :vets do |t|
      t.string :name
      t.string :phone_number
      t.string :email
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
