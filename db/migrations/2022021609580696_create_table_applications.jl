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
        :status     => :string
        :replport   => :int
        :channel    => :string
        :pkgmngport => :int
      ])
    ]
  end

  # add_index(:applications, :column_name)
  add_indices(:applications, :name, :port, :path, :status)
end

function down()
  drop_table(:applications)
end

end
