cd(@__DIR__)

using Test, TestSetExtensions, SafeTestsets, Logging
using GenieBuilder

Logging.global_logger(NullLogger())

@testset ExtendedTestSet "GenieBuilder backend tests" begin
  @includetests ARGS
end