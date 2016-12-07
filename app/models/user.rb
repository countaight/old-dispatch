class User < ActiveRecord::Base
  rolify
	validates :email, :name, presence: true
	
	has_secure_password
	validates_presence_of :password, on: :create
	serialize :coordinates
end