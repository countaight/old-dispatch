require 'rails_helper'

describe UsersController do
	let(:user) { User.create!(name: "Oscar Delgadillo",
														email: "oscar@noeltrans.com",
														password: "coconuts")}
	describe "GET #show" do
		it "assigns the requested user as @user" do
			get :show, { id: user.id }
			expect(assigns(:user)).to eq(user)
		end
	end

	describe "GET #new" do
		it "assigns a user object" do
			get :new
			expect(assigns(:user)).to_not be_nil
		end

		it "should render the correct template" do
			get :new
			assert_template :new
		end
	end

	describe "POST #create" do
		context "when valid params are passed" do
			it "creates a user object" do
				post :create, user: { name: "Oscar Delgadillo", email: "oscar@noeltrans.com", password: "coconuts" }
				expect(assigns(:user)).to be_a(User)
			end

			it "redirects to the user page" do
				post :create, user: { name: "Oscar Delgadillo", email: "oscar@noeltrans.com", password: "coconuts" }
				expect(response).to redirect_to(user_path(assigns(:user)))
			end
		end

		context "when invalid params are passed" do
			it "creates an unsaved object of user" do
				post :create, user: { name: '', email: '', password: '' }
				expect(assigns(:user).persisted?).to eq(false)
			end

			it "rerenders the new template" do
				post :create, user: { name: '', email: '', password: '' }
				expect(response).to render_template(:new)
			end
		end
	end
end