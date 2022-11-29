class DeleteNameFromVets < ActiveRecord::Migration[5.2]
  def change
    remove_column :vets, :name
  end
end
