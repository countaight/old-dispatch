require "rails_helper"

describe User do
	let(:user) { User.create!(name: "Oscar Delgadillo", email: "oscar@noeltrans.com", password: "password")}

	it "has a name" do 
		expect(user.name).to eq("Oscar Delgadillo")
	end

	it "has an email" do
		expect(user.email).to eq("oscar@noeltrans.com")
	end

	it "has a password" do
		expect(user.password).to eq("password")
	end

	it "is valid" do
		user.valid?
		expect(user.errors.full_messages).to be_empty
	end

	context "validations" do
		it "is not valid with no name" do
			user1 = User.new()
			user1.valid?
			expect(user1.errors.full_messages).to_not be_empty
		end
	end
end