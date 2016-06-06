class UsersController < ApplicationController
	def index
		@users = User.all
	end

	def show
		@user = User.find_by(id: params[:id])
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			log_in @user
			redirect_to @user
		else
			flash.now[:errors] = @user.errors.full_messages.uniq
			render 'new'
		end
	end

	private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end