module AddChannelToApplications

import SearchLight.Migrations: add_columns, remove_columns

function up()
  add_columns(:applications, [
    :channel => :string
  ])
end

function down()
  remove_columns(:applications, [
    :channel
  ])
end

end
