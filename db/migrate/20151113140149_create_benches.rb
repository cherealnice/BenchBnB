class CreateBenches < ActiveRecord::Migration
  def change
    create_table :benches do |t|
      t.text :description, null: false
      t.float :lat, null: false
      t.float :long, null: false

      t.timestamps null: false
    end
  end
end
