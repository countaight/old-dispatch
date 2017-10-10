class SessionsController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def new
	end

	def create
		user = User.find_by(email: params[:session][:email].downcase)
		if user && user.authenticate(params[:session][:password])
			respond_to do |format|
				format.html do
					flash[:success] = "Success"
					log_in user
					redirect_to profile_path
				end

				format.json do
					result = NoeldispatchSchema.execute(
						%Q|{
							user(id: #{user.id}) {
								id
								name
								email
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
					render json: { body: result["data"]["user"] }
				end
			end
		else
			respond_to do |format|
				format.html do
					flash.now[:danger] = "Invalid email/password combination."
					render 'new'
				end
				format.json { render json: { error: "Invalid email/password combination." } }
			end
		end
	end

	def destroy
		log_out
		redirect_to root_url
	end

end