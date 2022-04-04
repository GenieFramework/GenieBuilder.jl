const gbdir = joinpath(homedir(), ".julia", "geniecloud")

function installgb()
  isdir(gbdir) || mkdir(gbdir)
  cd(gbdir)

  `julia -e 'using Pkg;Pkg.activate(".");Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl")'` |> run
end

function startgb()
  isdir(gbdir) ? cd(gbdir) : installgb()
  `julia --project -e 'using GenieBuilder;GenieBuilder.go(async=false);'` |> run
end

startgb()