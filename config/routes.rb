Rails.application.routes.draw do
  root 'homes#homepage'
  devise_for :users

  get '/users/:id', to: "homes#index"
  get '/pets/:id', to: "homes#index"
  
  namespace :api do
    namespace :v1 do
      resources :users, only: [:show] 
      resources :pets, only: [:create, :index, :show]
    end
  end
end
