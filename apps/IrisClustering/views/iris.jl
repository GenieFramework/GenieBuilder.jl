page(
    model, partial = true,
    [
      heading("Iris flowers clustering")

      row([
        cell(class="st-module", [
          h6("Number of clusters")
          slider( 1:1:20,
                  @data(:no_of_clusters);
                  label=true)
        ])
        cell(class="st-module", [
          h6("Number of iterations")
          slider( 10:10:200,
                  @data(:no_of_iterations);
                  label=true)
        ])

        cell(class="st-module", [
          h6("X feature")
          Stipple.select(:xfeature; options=:features)
        ])

        cell(class="st-module", [
          h6("Y feature")
          Stipple.select(:yfeature; options=:features)
        ])
      ])

      row([
        cell(class="st-module", [
          h5("Species clusters")
          plot(:iris_plot_data, layout = :layout, config = "{ displayLogo:false }")
        ])

        cell(class="st-module", [
          h5("k-means clusters")
          plot(:cluster_plot_data, layout = :layout, config = "{ displayLogo:false }")
        ])
      ])

      row([
        cell(class="st-module", [
          h5("Iris data")
          table(:iris_data; pagination=:credit_data_pagination, dense=true, flat=true, style="height: 350px;")
        ])
      ])
    ]
  )