Rails.application.routes.draw do

  devise_for :users, controllers: {
    registrations: 'users/registrations',
  }
  devise_scope :user do
    get 'addresses', to: 'users/registrations#new_address'
    post 'addresses', to: 'users/registrations#create_address'
  end
  root 'products#index'

  resources :users, only: [:new, :create, :show]
  resources :registration, only: [:index, :new, :create]

  resources :products, only: [:index, :new, :create]
  resources :useraddress, only: [:index]
  resources :purchase, only: :new
  resources :useraddress, only: :new

  resources :cards, only: [:index, :new, :show] do
    collection do
      post 'show', to: 'cards#show'
      post 'pay', to: 'cards#pay'
      post 'delete', to: 'cards#delete'
    end
  end
end
