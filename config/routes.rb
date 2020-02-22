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

  resources :products, only: [:index, :new, :create]do
  #Ajax用
  collection do
    get 'get_category_children', defaults: { format: 'json' }
    get 'get_category_grandchildren', defaults: { format: 'json' }
  end
end

  resources :useraddress, only: [:index]
  resources :purchase, only: :new
  resources :credit, only: :new
  resources :useraddress, only: :new
end
