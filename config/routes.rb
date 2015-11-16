Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :show, :create]
  end
  resources :comments, only: [:show, :create]
end
