# run in terminal
# $ julia rungb.jl
# to be distributed with the VSCode plugin

module RunGB
# allow passing the GBDIR as an environment variable
gbdir = joinpath(homedir(), ".julia", "geniebuilder")


if ! isempty(ARGS)
  argpath = filter(ARGS) do x
    startswith(x, "GBDIR=") # the argument is "appsdir=..."
  end

  if ! isempty(argpath)
    global gbdir = normpath(argpath[1][7:end]) |> abspath
  end
end

appsdir = joinpath(gbdir, "apps")

function installgb()
  isdir(gbdir) || mkdir(gbdir)
  isdir(appsdir) || mkdir(appsdir)

  @show gbdir
  @show appsdir

  cp(joinpath(@__DIR__, "Manifest.toml"), joinpath(gbdir, "Manifest.toml"))
  cd(gbdir)

  cmd = `julia --startup-file=no --depwarn=no -e 'using Pkg;Pkg.activate(".");Pkg.instantiate();
              Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl");
              using GenieBuilder;GenieBuilder.postinstall();'`
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
  @show gbdir

  isdir(gbdir) ? cd(gbdir) : installgb()
  `julia --project --startup-file=no --history-file=no --depwarn=no -e 'using GenieBuilder;GenieBuilder.go();'` |> run
end

end

using .RunGB
RunGB.startgb()