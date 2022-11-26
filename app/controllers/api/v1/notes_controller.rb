class Api::V1::NotesController < ApiController
  def index
    notes = Note.all
  end

  def create
  end

  def show
  end
end