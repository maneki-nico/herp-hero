Rails.application.routes.draw do
  root 'homes#homepage'
  devise_for :users

  get '/users/:id' => "homes#index" 
  get '/pets/:id', to: "homes#index"
  get '/map', to: "homes#index"
  
  namespace :api do
    namespace :v1 do
      get '/users/current', to: "users#current"
      resources :users, only: [:show] 
      resources :pets, only: [:create, :index, :show, :update, :destroy]
      resources :vets, only: [:create, :index, :show]
      resources :notes, only: [:create, :index, :show, :update, :destroy]
      resources :tasks, only: [:create, :index]
    end
  end
end
