module AddPropertiesToApplications

import SearchLight.Migrations: add_columns, remove_columns

function up()
  add_columns(:applications, [
    :status   => :string
    :replport => :int
  ])
end

function down()
  remove_columns(:applications, [
    :name
    :port
    :path
  ])
end

end
