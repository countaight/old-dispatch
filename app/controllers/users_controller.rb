class UsersController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def index
		@users = User.all
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
		user = User.find(params[:userId])
		p user
		user.coordinates = params[:coordinates].to_json

		if user.save
			render json: { body: user.coordinates }
		else
			p user.errors.full_messages
			render json: { body: "Something went wrong" }
		end
	end

	private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end