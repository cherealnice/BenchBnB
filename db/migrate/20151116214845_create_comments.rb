class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :bench_id, null: false
      t.integer :rating, null: false
      t.text :body, null: false

      t.timestamps null: false
    end
    add_index :comments, :bench_id
  end
end
