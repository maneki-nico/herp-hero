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

  private
  def note_params
    params.require(:note).permit(:body)
  end
end