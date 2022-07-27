module AddChannelToApplications

import SearchLight.Migrations: add_columns, drop_columns

function up()
  add_columns(:applications, [
    :channel => :string
  ])
end

function down()
  drop_columns(:applications, [
    :channel
  ])
end

end
