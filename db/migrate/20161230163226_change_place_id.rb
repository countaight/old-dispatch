class ChangePlaceId < ActiveRecord::Migration
  def change
  	change_column :places, :place_id, :string
  	rename_column :places, :place_id, :g_place_id
  end
end
