class Poem < ActiveRecord::Base
  validates :author_id, :passage, :book_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "User"

  belongs_to :book

  has_many :selected_texts

  belongs_to :style

end