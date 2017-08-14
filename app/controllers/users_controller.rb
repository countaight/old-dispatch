class UsersController < ApplicationController
	skip_before_filter :verify_authenticity_token
	load_and_authorize_resource
	skip_authorize_resource :only => :testPost

	def index
		results = NoeldispatchSchema.execute("{\n  users {\n    name\n    coordinates\n    updated_at\n    assignments {\n      delivered\n      pu_del\n      place {\n        name\n        location {\n          lat\n          lng\n        }\n      }\n    }\n  }\n}")
		p results.data.users
		@users = []
		User.all.each do |user|
			places = []
			user.place_assignments.each do |assignment|
				places << {assignment: assignment, place: assignment.place}
			end
			@users << {user: user, places: places}
		end
		@users
	end

	def show
		@user = current_user
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			log_in @user
			redirect_to profile_path
		else
			flash.now[:errors] = @user.errors.full_messages.uniq
			render 'new'
		end
	end

	def test
		render json: { body: "Success!" }
	end

	def testPost
		respond_to do |format|
			format.json do
				user = User.find(params[:userId])
				user.coordinates = params[:coordinates]
				if user.save
					render json: { body: user.coordinates }
				else
					p user.errors.full_messages
					render json: { body: "Something went wrong" }
				end
			end
		end
	end

	private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end