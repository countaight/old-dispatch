class Admin::PlaceAssignment < ActiveRecord::Base
	belongs_to :user
	belongs_to :place, class_name: 'Admin::Place'
end