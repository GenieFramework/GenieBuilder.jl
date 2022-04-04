const gbdir = joinpath(homedir(), ".julia", "geniecloud")

function installgb()
  isdir(gbdir) || mkdir(gbdir)
  cd(gbdir)

  # `julia -e 'using Pkg;Pkg.activate(".");Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl")'` |> run
  `julia -e 'using Pkg;Pkg.activate(".");Pkg.develop("GenieBuilder")'` |> run
end

function startgb()
  isdir(gbdir) ? cd(gbdir) : installgb()
  `julia --project --startup-file=no --history-file=no --depwarn=no -e 'using GenieBuilder;GenieBuilder.go();'` |> run
end

startgb()