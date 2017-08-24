Types::LocationType = GraphQL::ObjectType.define do
	name "Location"
	description "Latitude and Longitude coordinates."

	field :lat, types.Float do
		resolve -> (loc, args, ctx) {
			loc["lat"]
		}
	end

	field :lng, types.Float do
		resolve -> (loc, args, ctx) {
			loc["lng"]
		}
	end
end

Types::PlaceType = GraphQL::ObjectType.define do
	name "Place"
	description "A Place"
	field :id, types.ID
	field :name, types.String
	field :location, Types::LocationType
	field :g_place_id, types.Int
end