class User < ActiveRecord
  rolify
	validates :email, :name, presence: true

	has_secure_password
	validates_presence_of :password, on: :create
	serialize :coordinates

	has_many :place_assignments, class_name: 'Admin::PlaceAssignment'
	has_many :places, through: :place_assignments
end