class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :notes, :classrooms
end
