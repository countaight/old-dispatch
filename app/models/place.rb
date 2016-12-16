class Place < ActiveRecord::Base
	has_many :place_assignments
	has_many :users, through: :place_assignments

	serialize :location
end