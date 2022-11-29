class Api::V1::UsersController < ApiController
  def show
    render json: User.find(params[:id]), serializer: UserSerializer
  end

  def current
    render json: current_user
  end
end