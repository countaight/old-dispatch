class Admin::PlaceAssignmentsController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def update
		@place_assignment = Admin::PlaceAssignment.find(params[:id])
		@place_assignment.delivered = !@place_assignment.delivered
		respond_to do |format|
			format.json do
				if @place_assignment.save
					render json: @place_assignment
				else
					render json: { body: error }
				end
			end
		end
	end

	def destroy
		@place_assignment = Admin::PlaceAssignment.find(params[:id])
		respond_to do |format|
			format.json do
				if @place_assignment && @place_assignment.delivered
					render json: @place_assignment.delete
				else
					render json: { body: error }
				end
			end
		end
	end

end