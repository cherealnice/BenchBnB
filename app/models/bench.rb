class Bench < ActiveRecord::Base
  validates :description, :lat, :long, presence: true
  validates :seating, presence: true, inclusion: { in: 1..20,
      message: 'Benches must sit between 1 and 20 people.'}

  def self.in_bounds(bounds)

    north_east_lat = bounds["northEast"]["lat"].to_f
    north_east_lng = bounds["northEast"]["lng"].to_f
    south_west_lat = bounds["southWest"]["lat"].to_f
    south_west_lng = bounds["southWest"]["lng"].to_f


    in_bounds_benches = Bench.where(
      ("(lat < ? AND lat > ?) AND
      (long < ? AND long > ?)"),
      north_east_lat, south_west_lat,
      north_east_lng, south_west_lng
    ).to_a

  end

end
