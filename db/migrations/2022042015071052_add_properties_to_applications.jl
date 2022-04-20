module AddPropertiesToApplications

import SearchLight.Migrations: add_columns, drop_columns

function up()
  add_columns(:applications, [
    :status   => :string
    :replport => :int
  ])
end

function down()
  drop_columns(:applications, [
    :name
    :port
    :path
  ])
end

end
