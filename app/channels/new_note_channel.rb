class NewNoteChannel < ApplicationCable::Channel


  def subscribed
    stream_from 'new_note'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
