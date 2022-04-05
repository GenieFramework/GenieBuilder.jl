module CreateTableApplications

import SearchLight.Migrations: create_table, column, columns, pk, add_index, drop_table, add_indices

function up()
  create_table(:applications) do
    [
      pk()
      columns([
        :name => :string
        :port => :int
        :path => :string
      ])
    ]
  end

  # add_index(:applications, :column_name)
  # add_indices(:applications, :column_name_1, :column_name_2)
end

function down()
  drop_table(:applications)
end

end
