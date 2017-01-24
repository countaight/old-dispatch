class Admin::Place < ActiveRecord::Base
	has_many :place_assignments
	has_many :users, through: :place_assignments
end