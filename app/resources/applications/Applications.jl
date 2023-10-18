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
  pkgmngport::Int = UNASSIGNED_PORT
  error::String   = ""
end
Application(id::Int) = findone(Application; id = id)

function SearchLight.Validation.validator(::Type{Application})
  ModelValidator([
    ValidationRule(:name, ApplicationsValidator.not_empty)
    ValidationRule(:name, ApplicationsValidator.is_unique)
    ValidationRule(:port, ApplicationsValidator.is_int)
    ValidationRule(:port, ApplicationsValidator.is_unique)
    ValidationRule(:path, ApplicationsValidator.not_empty)
    ValidationRule(:path, ApplicationsValidator.is_unique)
  ])
end

end
