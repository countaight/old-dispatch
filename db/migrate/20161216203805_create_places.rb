class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
    	t.string :name
    	t.string :location
    	t.integer :place_id
    end
  end
end
