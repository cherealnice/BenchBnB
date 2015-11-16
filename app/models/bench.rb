class Bench < ActiveRecord::Base
  validates :description, :lat, :lng, presence: true
  validates :seating, presence: true, inclusion: { in: 1..20,
      message: 'Benches must sit between 1 and 20 people.'}

  def self.in_params(params)
    bounds = params["mapBounds"]
    min_seating = params["minSeating"]
    max_seating = params["maxSeating"]

    north_east_lat = bounds["northEast"]["lat"].to_f
    north_east_lng = bounds["northEast"]["lng"].to_f
    south_west_lat = bounds["southWest"]["lat"].to_f
    south_west_lng = bounds["southWest"]["lng"].to_f


    in_bounds_benches = Bench.where(
      ("(lat BETWEEN ? AND ?) AND
      (lng BETWEEN ? AND ?) AND
      (seating BETWEEN ? AND ?)"),
      south_west_lat, north_east_lat,
      south_west_lng, north_east_lng,
      min_seating, max_seating
    ).to_a

  end

end
