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
		render json: { body: params[:coordinates].to_json }
	end

	private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end