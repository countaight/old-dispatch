class Admin::PlacesController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def index
	end

	def create
		respond_to do |format|
			format.json do
				p place_params
				render json: { body: "Sent"}
			end
			format.html { p "Sent via HTML"}
		end
	end

	private
	def place_params
		params.require(:place).permit(:name)
	end

end