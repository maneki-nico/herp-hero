class Api::V1::PetsController < ApiController
  def create
    pet = Pet.new(pet_params)
    pet.user = current_user
    
    if pet.save
      render json: pet
    else
      render json: { errors: pet.errors.full_messages.to_sentence }
    end
  end

  def show
    render json: Pet.find(params[:id]), serializer: PetSerializer
  end

  def edit
    pet = Pet.find(params[:id])
  end

  def update
    pet = Pet.find(params[:id])
    pet.update(pet_params(:name, :animal, :species, :birthday, :personality, :profile_photo))
    redirect_to "/users/#{current_user.id}"
  end

  def destroy
    pet = Pet.find(params[:id])
    pet.destroy
  end

  private
  def pet_params
    params.require(:pet).permit(:name, :animal, :species, :birthday, :personality, :profile_photo)
  end
end