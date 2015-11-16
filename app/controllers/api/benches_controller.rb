class Api::BenchesController < ApplicationController

  def index
    @benches = Bench.in_params(map_params)
  end

  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render :show
    else
      render json: @bench.errors.full_messages, status: 422
    end
  end

  def show
    @bench = Bench.find(params[:id])

    if @bench
      render :show
    else
      render status: 404
    end
  end

  private

  def bench_params
    params.require(:bench).permit(:description, :lat, :lng, :seating)
  end

  def map_params
    params.require(:mapParams).permit(:minSeating, :maxSeating, {
      mapBounds: [
        northEast: [:lat, :lng],
        southWest: [:lat, :lng]
      ]
    })
  end

end
