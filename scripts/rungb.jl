# run in terminal
# $ julia rungb.jl
# to be distributed with the VSCode plugin

const gbdir = joinpath(homedir(), ".julia", "geniebuilder")
const appsdir = joinpath(gbdir, "apps")

function installgb()
  isdir(gbdir) || mkdir(gbdir)
  isdir(appsdir) || mkdir(appsdir)

  cd(gbdir)

  # `julia -e 'using Pkg;Pkg.activate(".");Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl");using GenieBuilder;GenieBuilder.postinstall();'` |> run
  `julia -e 'using Pkg;Pkg.activate(".");
              Pkg.develop("GenieBuilder");
              using GenieBuilder;
              GenieBuilder.postinstall();'` |> run
end

function startgb()
  isdir(gbdir) ? cd(gbdir) : installgb()
  `julia --project --startup-file=no --history-file=no --depwarn=no -e 'using GenieBuilder;GenieBuilder.go();'` |> run
end

try
  startgb()
catch ex
  @error ex
finally
  exit()
end