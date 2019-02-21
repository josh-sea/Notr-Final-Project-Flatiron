class User < ApplicationRecord
  has_many :notes
  has_many :classrooms, through: :notes
end
