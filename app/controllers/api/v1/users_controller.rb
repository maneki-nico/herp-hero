class Api::V1::UsersController < ApiController
  def index
    unless
      current_user
        redirect_to new_user_session_path :alert => "Please log in to continue."
    end
    render json: User.find(current_user.id), serializer: UserSerializer
  end

  # def show
  #   render json: User.find(current_user.id), serializer: UserSerializer
  # end
end