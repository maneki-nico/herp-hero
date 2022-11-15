Rails.application.routes.draw do
  root 'homes#homepage'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/users/:id', to: "homes#index"
  
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index] do
        resources :pets, only: [:create]
      end
    end
  end

  # namespace :user do
  #   root :to => "welcome#index"
  # end
end
