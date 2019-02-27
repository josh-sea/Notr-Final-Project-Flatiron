class Api::V1::NotesController < ApplicationController
  def index
    @notes = Note.all
    render json: @notes, status: :ok
  end

  # def test
  #     # Fetch and parse HTML document
  #     doc = Nokogiri::HTML(open("https://en.wikipedia.org/wiki/#{params[:search]}"))
  #     @content = doc.css('.mw-parser-output')
  #     @html="<body>#{@content}</body>"
  #     @testing="<html>#{@html}</html>"
  #     render html: @testing.html_safe
  #   end


  def create
    # byebug
    @note = Note.create(note_params)
    @notes = Note.all
    ActionCable.server.broadcast 'new_note', @notes
    render json: @note, status: :ok
  end

  def update
    @note = Note.find(params[:id])
    # byebug
    @note.update(note_params)
    @notes = Note.all
    ActionCable.server.broadcast 'new_note', @notes
    render json: @note, status: :ok
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    @notes = Note.all
    ActionCable.server.broadcast 'new_note', @notes
    render json: @note, status: :ok
  end

  private

  def note_params
    params.require(:note).permit(:title, :content, :user_id, :classroom_id)
  end
end
