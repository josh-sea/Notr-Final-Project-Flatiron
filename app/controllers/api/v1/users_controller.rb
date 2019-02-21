class Api::V1::UsersController < ApplicationController
# before_action: :only, [:create, :show, :destroy]
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  def create
    @user = User.create(user_params)
    render json: @user, status: :ok
  end

  def show
    render json: @user, status: :ok
  end










#################################################################################################
  private
#################################################################################################

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username)
  end

#################################################################################################

end #end of users controller
