class AddColumnToPlaceAssignments < ActiveRecord::Migration
  def change
  	add_column :place_assignments, :pu_del, :string
  end
end
