require_relative '../user/user_type'
require_relative '../place/place_type'

Types::AssignmentType = GraphQL::ObjectType.define do
	name "Assignment"
	description "A Driver's pick up or delivery assignment."
	field :id, types.ID
	field :place, Types::PlaceType
	field :user, Types::UserType
	field :pu_del, types.String
	field :delivered, types.Boolean
end