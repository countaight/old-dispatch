require 'rails_helper'

RSpec.describe Role, type: :model do
	let(:user) { User.create!(name: "Oscar Delgadillo", email: "oscar@noeltrans.com", password: "password")}

  describe "roles" do
  	it "should assign the right roles" do
  		user.add_role :admin
  		expect(user.has_role?(:staff)).to eq(false)
  	end
  end
end
