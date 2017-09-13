require_relative '../place/place_type'
require_relative '../assignment/assignment_type'

Types::UserType = GraphQL::ObjectType.define do
	name "User"
	description "A User"
	field :id, types.ID
	field :name, types.String
	field :email, types.String
	field :coordinates, Types::LocationType
	field :created_at, types.Int do
		resolve -> (user, args, ctx) {
			user.created_at.to_i * 1000
		}
	end

	field :updated_at, types.Int do
		resolve -> (user, args, ctx) {
			user.updated_at.to_i * 1000
		}
	end

	field :assignments, types[Types::AssignmentType] do
		resolve -> (user, args, ctx) {
			user.place_assignments
		}
	end

	field :places, types[Types::PlaceType] do
		argument :size, types.Int, default_value: 10
		resolve -> (user, args, ctx) {
			user.places.limit(args[:size])
		}
	end
end