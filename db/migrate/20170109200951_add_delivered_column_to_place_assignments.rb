class AddDeliveredColumnToPlaceAssignments < ActiveRecord::Migration
  def change
  	add_column :place_assignments, :delivered, :boolean
  end
end
