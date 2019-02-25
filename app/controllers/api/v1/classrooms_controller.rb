class Api::V1::ClassroomsController < ApplicationController


  def index
    @classrooms = Classroom.all
    render json: @classrooms, status: :ok
  end

  def create
    @classroom = Classroom.find_or_create_by(name: params[:name].downcase)
    render json: @classroom, status: :ok
  end

  private
  def classroom_params
    params.require(:classroom).permit(:name)
  end
end ### end of the classroom controller
