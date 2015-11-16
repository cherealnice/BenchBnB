class Comment < ActiveRecord::Base
  validates :bench, :body, :rating, presence: true
  validates :rating, inclusion: { in: 1..5,
      message: 'Rating must be between 1 and 5.'}

  belongs_to :bench
end
