require 'rails_helper'

feature "User signing up" do
	scenario "user visits register page" do
		visit '/users/new'
		expect(page).to have_selector 'form'
	end

	scenario "user fills in wrong information" do
		visit '/users/new'
		click_button 'Register'
		expect(page).to have_selector ".field_with_errors"
	end

	scenario "user fills in right information" do
		visit '/users/new'
		within("#new_user") do
			fill_in 'Full Name', with: "Oscar Delgadillo"
			fill_in 'Email', with: "oscar@noeltrans.com"
			fill_in 'Password', with: "coconuts"
			fill_in 'Confirm Password', with: "coconuts"
		end
		click_button 'Register'
		expect(User.all.count).to eq(1)
	end
end

feature "User sign in process" do
	before :each do
		User.create!(name: "Oscar Delgadillo", email: "oscar@noeltrans.com", password: "coconuts")
	end

	scenario "user logs in with right information" do
		visit '/login'
		within("#session") do
			fill_in 'Email', with: "oscar@noeltrans.com"
			fill_in 'Password', with: "coconuts"
		end
		click_button 'Login'
		expect(page).to have_content 'Success'
	end

	scenario "user logs in with wrong information" do
		visit '/login'
		within("#session") do
			fill_in 'Email', with: "oscar@noeltrans.com"
			fill_in 'Password', with: "notpassword"
		end
		click_button 'Login'
		expect(page).to have_content 'Invalid email/password combination.'
	end
end