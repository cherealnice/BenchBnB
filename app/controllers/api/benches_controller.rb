class Api::BenchesController < ApplicationController

  def index
    debugger
    @benches = Bench.in_bounds(params[:bounds])
  end

end
