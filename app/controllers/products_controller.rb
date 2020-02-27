class ProductsController < ApplicationController
  before_action :set_brand, only: [:new]

  def index
    # @product = Product.includes(:images).order("created_at DESC").limit(3)
    # @brand = Product.where(brand_id: "2").last(3)
    # @parents = Category.all.order("ancestry ASC").limit(13)
  end   


  def new 
    @product = Product.new
    @product.images.new

    @category_parent_array = ["---"]
    #親カテゴリーのみ抽出 => 配列に追加（[表示する値,取得する値] = [parent.name, parent.id]）
    @category_parent_array.concat(Category.where(ancestry: nil).pluck(:name,:id))
  end

  def get_category_children
    @category_children = Category.find_by(id: "#{params[:parent_id]}", ancestry: nil).children
  end

  def get_category_grandchildren
    #選択された子カテゴリーに紐付く孫カテゴリーの配列を取得
    @category_grandchildren = Category.find(params[:child_id]).children

  end

  def create
    @user = current_user
    @product = Product.new(product_params)
    if @product.save!
      redirect_to product_path(@product.id)
    else
      redirect_to new_product_path
    end
  end

  def edit
    # binding.pry
    @product = Product.find(params[:id])
  end

  def update
    if @product.update(product_params)
      redirect_to ''
    else
      render :edit
    end
  end

  def show
    @product = Product.find(params[:id])
    @parents = Category.all.order("ancestry ASC").limit(13)
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    redirect_to root_path
  end

  require 'payjp'
  def pay
    Payjp.api_key = ENV['PAYJP_PRIVATE_KEY']
    charge = Payjp::Charge.create(
    amount: @product.price,
    card: params['payjp-token'],
    currency: 'jpy'
    )
  end

  private

  def product_params
    params.require(:product).permit(:name, :content, :condition, :status, :payment, :delivery_date, :delivery_method, :price, :user_id, :brand_id, :category_id, :prefecture_id, images_attributes: [:image, :_destroy, :id]).merge( user_id: current_user.id)
  end

  def set_product
    @product = Product.find(params[:id])
  end

  def current
    @current_user = Current_user_id
  end

  def set_brand
    @brand_array = Brand.pluck(:name, :id)
  end

end