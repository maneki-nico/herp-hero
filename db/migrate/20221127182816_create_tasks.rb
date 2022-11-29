class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.date :date
      t.belongs_to :user, null: false
    end
  end
end
