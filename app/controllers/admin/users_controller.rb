class Admin::UsersController < ApplicationController
	skip_before_filter :verify_authenticity_token
	load_and_authorize_resource

	def index
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