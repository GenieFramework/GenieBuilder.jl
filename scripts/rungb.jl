# run in terminal
# $ julia rungb.jl
# to be distributed with the VSCode plugin

@show ARGS

const DEFAULT_GBDIR = joinpath(homedir(), ".julia", "geniebuilder")

# allow passing the GBDIR as an environment variable
const gbdir = if ! isempty(ARGS)
  argpath = filter(ARGS) do x
    startswith(x, "GBDIR=") # the argument is "appsdir=..."
  end

  if ! isempty(argpath)
    normpath(argpath[1][7:end]) |> abspath
  else
    DEFAULT_GBDIR
  end
else
  DEFAULT_GBDIR
end

const appsdir = joinpath(gbdir, "apps")

function installgb()
  isdir(gbdir) || mkdir(gbdir)
  isdir(appsdir) || mkdir(appsdir)

  cp(joinpath(@__DIR__, "Manifest.toml"), joinpath(gbdir, "Manifest.toml"))
  cd(gbdir)

  cmd = `julia --startup-file=no --depwarn=no -e 'using Pkg;Pkg.activate(".");Pkg.instantiate();
              Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl");
              using GenieBuilder;GenieBuilder.postinstall();'`
  @show gbdir
  setenv(cmd, "GBDIR" => gbdir)
  cmd |> run

  # `julia -e 'using Pkg;Pkg.activate(".");
  #             Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl");
  #             using GenieBuilder;
  #             GenieBuilder.postinstall();'` |> run
  # `julia -e 'using Pkg;Pkg.activate(".");
  #             Pkg.develop("GenieBuilder");
  #             using GenieBuilder;
  #             GenieBuilder.postinstall();'` |> run
end

function startgb()
  isdir(gbdir) ? cd(gbdir) : installgb()
  `julia --project --startup-file=no --history-file=no --depwarn=no -e 'using GenieBuilder;GenieBuilder.go();'` |> run
end

startgb()