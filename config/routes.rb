Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :show, :create]
    resources :comments, only: [:show, :create]
  end
end
