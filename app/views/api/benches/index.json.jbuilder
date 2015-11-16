json.array!(@benches) do |bench|
  json.partial!('bench', bench: bench, show_comments: false)
end
