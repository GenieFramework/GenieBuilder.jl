# run in terminal
# $ julia rungb.jl
# to be distributed with the VSCode plugin

const gbdir = joinpath(homedir(), ".julia", "geniecloud")
const appsdir = joinpath(gbdir, "apps")

function installgb()
  isdir(gbdir) || mkdir(gbdir)
  isdir(appsdir) || mkdir(appsdir)

  cd(gbdir)

  `julia -e 'using Pkg;Pkg.activate(".");Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl")'` |> run
  # `julia -e 'using Pkg;Pkg.activate(".");Pkg.develop("GenieBuilder")'` |> run
end

function startgb()
  isdir(gbdir) ? cd(gbdir) : installgb()
  `julia --project --startup-file=no --history-file=no --depwarn=no -e 'using GenieBuilder;GenieBuilder.go();'` |> run
end

startgb()