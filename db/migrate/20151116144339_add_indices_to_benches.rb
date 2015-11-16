class AddIndicesToBenches < ActiveRecord::Migration
  def change
    add_index :benches, :description
    add_index :benches, :lat
    add_index :benches, :long
    add_index :benches, :seating
  end
end
