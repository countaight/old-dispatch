class Admin::PlacesController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def index
	end

	def create
		@place = Admin::Place.find_or_create_by(g_place_id: params[:place_id]) do |place|
			place.name = params[:name]
			place.location = params[:place]
		end

		@user = User.find(params[:user_id])

		@new_load = @user.place_assignments.new

		@new_load.place = @place
		@new_load.pu_del = params[:pu_del]
		@new_load.delivered = false

		respond_to do |format|
			format.json do
				if @new_load.save
					render json: @new_load, include: [:place, :user]
				else
					render json: { body: "Error" }
				end
			end
			format.html { p "Sent via HTML"}
		end
	end

	private
	def place_params
		params.require(:place).permit(:name)
	end

end