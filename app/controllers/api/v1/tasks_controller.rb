class Api::V1::TasksController < ApiController
  def create
    task = Task.new(task_params)
    task.user = current_user
    
    if task.save
      render json: task
    else
      render json: { errors: task.errors.full_messages.to_sentence }
    end
  end

  def show
    render json: Task.find(params[:id])
  end

  private
  def task_params
    params.require(:task).permit(:name, :date)
  end
end