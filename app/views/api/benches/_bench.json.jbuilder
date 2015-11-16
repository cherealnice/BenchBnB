json.extract!(
  bench,
  :description, :lat, :lng, :id
)

if show_comments
  json.comments do
    json.array!(bench.comments) do |comment|
      json.partial! 'comments/comment', comment: comment
    end
  end
end
