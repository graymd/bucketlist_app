require 'rails_helper'

RSpec.describe UserInterest, type: :model do
    it {should belong_to(:user)}

end
