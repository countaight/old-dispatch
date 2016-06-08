class User < ActiveRecord::Base
	validates :email, :name, presence: true
	
	has_secure_password
	validates :password, presence: true
end