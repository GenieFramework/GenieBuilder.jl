module Applications

using SearchLight
using GenieBuilder.ApplicationsValidator

import SearchLight: AbstractModel, DbId
import Base: @kwdef
import SearchLight.Validation: ModelValidator, ValidationRule
import Stipple

export Application

const UNASSIGNED_PORT = 0

@kwdef mutable struct Application <: AbstractModel
  id::DbId        = DbId()
  name::String    = ""
  port::Int       = UNASSIGNED_PORT
  path::String    = ""
  status::String  = "offline"
  channel::String = Stipple.channelfactory()
  replport::Int   = UNASSIGNED_PORT
end

function SearchLight.Validation.validator(::Type{Application})
  ModelValidator([
    ValidationRule(:name, ApplicationsValidator.not_empty)
    ValidationRule(:name, ApplicationsValidator.is_unique)
    ValidationRule(:port, ApplicationsValidator.is_int)
    ValidationRule(:path, ApplicationsValidator.not_empty)
  ])
end

"""
  boilerplate(app_path::String)
"""
function boilerplate(app_path::String)
  # set up the Julia environment
  try
    cmd = Cmd(`julia --startup-file=no -e '
                using Pkg;
                Pkg._auto_gc_enabled[] = false;
                Pkg.activate(".");
                Pkg.add("GenieFramework");
                exit(0);
    '`; dir = app_path)
    cmd |> run
  catch ex
    @error ex
    rethrow(ex)
  end

  # generate the app's files
  try
    current_path = pwd()
    cd(app_path)

    GenieBuilder.Generators.app()
    GenieBuilder.Generators.view()

    cd(current_path)
  catch ex
    @error ex
    rethrow(ex)
  end

  nothing
end
boilerplate(app::Application) = boilerplate(app.path)

end
