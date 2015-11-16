class CommentsController < ApplicationController
  def create
    @bench = Bench.find(params[:id])
    @comment = @bench.comments.new(comment_params)

    if !@comment.save
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:rating, :body)
  end
end
