# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

benches = [
  Bench.create({description: "LES", lat: 40.717986 , lng: -73.990675, seating: 1}),
  Bench.create({description: "UWS", lat: 40.790422, lng: -73.971710, seating: 2}),
  Bench.create({description: "Central Park", lat: 40.771802, lng: -73.973899, seating: 2})
]
