class AddNameToVetsWithConstraint < ActiveRecord::Migration[5.2]
  def change
    add_column :vets, :name, :string, null: false
  end
end
