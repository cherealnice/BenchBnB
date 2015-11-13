class Bench < ActiveRecord::Base
  validates :description, :lat, :long, presence: true

  def self.in_bounds(bounds)
      # bounds in the following format:
  # {
  #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
  #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
  # }
  #... query logic goes here

    north_east_lat = bounds["northEast"]["lat"].to_f
    north_east_lng = bounds["northEast"]["lng"].to_f
    south_west_lat = bounds["southWest"]["lat"].to_f
    south_west_lng = bounds["southWest"]["lng"].to_f


    in_bounds_benches = Bench.where(
      ("(lat < ? AND lat > ?) AND
      (long < ? AND long > ?)"),
      north_east_lat, south_west_lat,
      north_east_lng, south_west_lng
    )

    in_bounds_benches.map { bench }

  end

end
