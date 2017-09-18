class Admin::UsersController < ApplicationController
	skip_before_filter :verify_authenticity_token
	load_and_authorize_resource

	def index
		respond_to do |format|
			format.html do
				@users = User.all
			end

			format.json do
				results = NoeldispatchSchema.execute(
					%Q|{
						users {
							id
							name
							coordinates {
								lat
								lng
							}
							updated_at
							assignments {
								id
								delivered
								pu_del
								user {
									id
								}
								place {
									id
									name
									location {
										lat
										lng
									}
								}
							}
						}
					}|
				)

				@users = results["data"]["users"]
			end
		end
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)

		respond_to do |format|
			format.js { render layout: false }
		end
	end

	private
	def user_params
		params.require(:user).permit(:name, :email, :password, :password_confirmation)
	end
end