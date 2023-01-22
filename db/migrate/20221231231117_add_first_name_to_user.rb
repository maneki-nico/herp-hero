class AddFirstNameToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string, null: false, default: "herp owner"
  end
end
