module RunGB
# allow passing the GBDIR as an environment variable
const gbdir = Ref{String}(joinpath(homedir(), ".julia", "geniebuilder"))


if ! isempty(ARGS)
  argpath = filter(ARGS) do x
    startswith(x, "GBDIR=") # the argument is "appsdir=..."
  end

  if ! isempty(argpath)
    gbdir[] = normpath(argpath[1][7:end]) |> abspath
  end
end

appsdir = joinpath(gbdir[], "apps")

function installgb()
  isdir(gbdir[]) || mkpath(gbdir[])
  isdir(appsdir) || mkpath(appsdir)

  cp(joinpath(@__DIR__, "Manifest.toml"), joinpath(gbdir[], "Manifest.toml"))
  cd(gbdir[])

  cmd = `julia --startup-file=no --depwarn=no -e 'using Pkg;Pkg._auto_gc_enabled[] = false;Pkg.activate(".");Pkg.instantiate();Pkg.update();
              Pkg.add(url="https://github.com/GenieFramework/GenieBuilder.jl");Pkg.update();
              using GenieBuilder;GenieBuilder.postinstall();'`
  cmd |> run
end

function startgb()
  isdir(gbdir[]) ? cd(gbdir[]) : installgb()
  `julia --project --startup-file=no --history-file=no --depwarn=no -e 'using GenieBuilder;GenieBuilder.go();'` |> run
end

end
