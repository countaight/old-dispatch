class User < ActiveRecord::Base
  rolify
	validates :email, :name, presence: true
	
	has_secure_password
	validates :password, presence: true
end