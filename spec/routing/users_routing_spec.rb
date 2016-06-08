require 'rails_helper'

describe UsersController do
	describe "routing" do

		it "does not route to #index" do
			expect(:get => "/users").to_not route_to("users#index")
		end

		it "does not route to #delete" do
			expect(:delete => "/users/1").to_not route_to("users#destroy", id: "1")
		end
	end
end