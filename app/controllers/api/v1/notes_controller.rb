class Api::V1::NotesController < ApiController
  def index
    notes = Note.all
  end

  def create
    note = Note.new(note_params)
    note.pet = Pet.find(params[:petId])
    
    if note.save
      render json: note
    else
      render json: { errors: note.errors.full_messages.to_sentence }
    end
  end

  def show
    render json: Note.find(params[:id]), serializer: NoteSerializer
  end

  def edit
    note.pet = Pet.find(params[:id])
  end

  def update
    note.pet = Pet.find(params[:id])
    note.pet.update(note_params(:body))
    redirect_to user_path
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
  end

  private
  def note_params
    params.require(:note).permit(:body)
  end
end