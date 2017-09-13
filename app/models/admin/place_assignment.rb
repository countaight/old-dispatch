class Admin::PlaceAssignment < ActiveRecord::Base
	belongs_to :user
	belongs_to :place, class_name: 'Admin::Place'
	attr_reader :distance

	def distance
		self.place.location
	end
end