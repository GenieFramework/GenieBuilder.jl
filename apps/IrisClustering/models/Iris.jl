module Iris

using Stipple
using StippleUI
using StipplePlotly

using Clustering
import RDatasets: dataset
import DataFrames

using Genie.Sessions

export IrisModel

data = DataFrames.insertcols!(dataset("datasets", "iris"), :Cluster => zeros(Int, 150))

@reactive mutable struct IrisModel <: ReactiveModel
  iris_data::R{DataTable} = DataTable(data)
  credit_data_pagination::DataTablePagination =
    DataTablePagination(rows_per_page=50)

  features::R{Vector{String}} =
    ["SepalLength", "SepalWidth", "PetalLength", "PetalWidth"]
  xfeature::R{String} = ""
  yfeature::R{String} = ""

  iris_plot_data::R{Vector{PlotData}} = []
  cluster_plot_data::R{Vector{PlotData}} = []
  layout::R{PlotLayout} = PlotLayout(plot_bgcolor = "#fff")

  no_of_clusters::R{Int} = 3
  no_of_iterations::R{Int} = 10
end

function plot_data(cluster_column::Symbol, ic_model::IrisModel)
  plot_collection = Vector{PlotData}()
  isempty(ic_model.xfeature[]) || isempty(ic_model.yfeature[]) && return plot_collection

  for species in Array(data[:, cluster_column]) |> unique!
    x_feature_collection, y_feature_collection = Vector{Float64}(), Vector{Float64}()
    for r in eachrow(data[data[!, cluster_column] .== species, :])
      push!(x_feature_collection, (r[Symbol(ic_model.xfeature[])]))
      push!(y_feature_collection, (r[Symbol(ic_model.yfeature[])]))
    end
    plot = PlotData(
            x = x_feature_collection,
            y = y_feature_collection,
            mode = "markers",
            name = string(species),
            plot = StipplePlotly.Charts.PLOT_TYPE_SCATTER)
    push!(plot_collection, plot)
  end
  plot_collection
end

function compute_clusters!(ic_model::IrisModel)
  features = collect(Matrix(data[:, [Symbol(c) for c in ic_model.features[]]])')
  result = kmeans(features, ic_model.no_of_clusters[]; maxiter=ic_model.no_of_iterations[])
  data[!, :Cluster] = assignments(result)
  ic_model.iris_data[] = DataTable(data)
  ic_model.cluster_plot_data[] = plot_data(:Cluster, ic_model)

  nothing
end

function handlers(model::IrisModel)
  onany(model.xfeature, model.yfeature, model.no_of_clusters, model.no_of_iterations) do (_...)
    model.iris_plot_data[] = plot_data(:Species, model)
    compute_clusters!(model)
  end

  model
end

end