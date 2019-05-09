class Admin::PlaceAssignment < ActiveRecord
	belongs_to :user
	belongs_to :place, class_name: 'Admin::Place'
end