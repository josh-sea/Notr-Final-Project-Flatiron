class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user_id, :classroom_id, :updated_at

  def updated_at
    self.object.updated_at.strftime('%^b %-d %Y %l:%M%P')
  end

end
