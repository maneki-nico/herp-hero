require "pry"

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
    render json: Pet.find(params[:id])
  end

  private
  def pet_params
    params.require(:pet).permit(:name, :animal, :species, :birthday, :personality, :profile_photo)
  end
end