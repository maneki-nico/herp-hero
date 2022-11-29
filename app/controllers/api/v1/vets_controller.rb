class Api::V1::VetsController < ApiController
  def create
    vet = nil
    if current_user.vet == nil
      vet = Vet.new(vet_params)
      vet.user = current_user
    else
      vet = current_user.vet
      vet.name = vet_params[:name]
      vet.address = vet_params[:address]
    end

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
    params.require(:vet).permit(:name, :address)
  end
end