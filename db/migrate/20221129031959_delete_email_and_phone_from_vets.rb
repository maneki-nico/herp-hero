class DeleteEmailAndPhoneFromVets < ActiveRecord::Migration[5.2]
  def change
    remove_column :vets, :phone_number
    remove_column :vets, :email
  end
end
