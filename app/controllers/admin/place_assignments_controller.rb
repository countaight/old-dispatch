class Admin::PlaceAssignmentsController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def update
		@place_assignment = Admin::PlaceAssignment.find(params[:id])
		@place_assignment.delivered = !@place_assignment.delivered
		respond_to do |format|
			format.json do
				if @place_assignment.save
					results = NoeldispatchSchema.execute(queryString(@place_assignment.id))
					render json: results["data"]["assignment"]
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
					results = NoeldispatchSchema.execute(queryString(@place_assignment.id))
					@place_assignment.delete
					render json: results["data"]["assignment"]
				else
					render json: { body: error }
				end
			end
		end
	end

	private

	def queryString(id)
		%|{
			assignment(id: #{id}) {
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
		}|
	end
end