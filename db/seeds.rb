# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

benches = [
  Bench.create({description: "LES", lat: 40.717986 , long: -73.990675}),
  Bench.create({description: "UWS", lat: 40.790422, long: -73.971710}),
  Bench.create({description: "Central Park", lat: 40.771802, long: -73.973899})
]
