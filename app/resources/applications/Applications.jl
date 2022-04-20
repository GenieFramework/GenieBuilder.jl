module Applications

using SearchLight, ApplicationsValidator

import SearchLight: AbstractModel, DbId
import Base: @kwdef
import SearchLight.Validation: ModelValidator, ValidationRule

export Application

@kwdef mutable struct Application <: AbstractModel
  id::DbId        = DbId()
  name::String    = ""
  port::Int       = rand(10_000:65_535)
  path::String    = "/apps/"
  status::String  = "offline"
  replport::Int   = 0
end

function SearchLight.Validation.validator(::Type{Application})
  ModelValidator([
    ValidationRule(:name, ApplicationsValidator.not_empty)
    ValidationRule(:name, ApplicationsValidator.is_unique)
    ValidationRule(:port, ApplicationsValidator.is_int)
    ValidationRule(:path, ApplicationsValidator.not_empty)
  ])
end

end
