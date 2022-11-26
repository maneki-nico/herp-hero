class Api::V1::VetsController < ApiController
  def create
    vet = Vet.new(vet_params)
    vet.user = current_user

    if vet.save
      render json: vet
    else
      render json: { errors: vet.errors.full_messages.to_sentence }
    end
  end

  def show
    render json: Vet.find(params[:id])
  end

  private

  def vet_params
    params.require(:vet).permit(:name, :phone_number, :email)
  end
end