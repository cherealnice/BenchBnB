class Bench < ActiveRecord::Base
  validates :description, :lat, :long, presence: true
end
