class AddAddressToVets < ActiveRecord::Migration[5.2]
  def change
    add_column :vets, :address, :string, null: false
  end
end
