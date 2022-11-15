class CreatePets < ActiveRecord::Migration[5.2]
  def change
    create_table :pets do |t|
      t.string :name, null: false
      t.string :animal, null: false 
      t.date :birthday
      t.string :species, null: false
      t.string :gender
      t.text :personality
      t.belongs_to :user, null: false
      

      t.timestamps null: false
    end
  end
end
