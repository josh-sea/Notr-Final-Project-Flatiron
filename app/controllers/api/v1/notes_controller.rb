class Api::V1::NotesController < ApplicationController
  def index
    @notes = Note.all
    render json: @notes, status: :ok
  end


  def create
    @note = Note.create(note_params)
    render json: @note, status: :ok
  end

  def update
    @note = Note.find(params[:id])
    # byebug
    @note.update(note_params)
    render json: @note, status: :ok
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render json: @note, status: :ok
  end

  private

  def note_params
    params.require(:note).permit(:title, :content, :user_id, :classroom_id)
  end
end
