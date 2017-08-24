require_relative 'user/user_type'
require_relative 'place/place_type'
require_relative 'assignment/assignment_type'

Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  description "The query root for this schema"

  field :users, types[Types::UserType] do
    resolve -> (obj, args, ctx) {
      User.all
    }
  end

  field :user do
    type Types::UserType
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      User.find(args[:id])
    }
  end

  field :assignment do
    type Types::AssignmentType
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      Admin::PlaceAssignment.find(args[:id])
    }
  end
end
