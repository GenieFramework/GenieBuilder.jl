# GenieCloud backend

## Install

* Clone the repository
* Start a Julia REPL in the app's folder: `$ julia --project`
* Instantiate the dependencies: `pkg> instantiate`

## Load the app

In the app's folder: `$ bin/repl`.
You might need to edit the `repl` file to point to the correct `julia` binary.
You might also need to make the `repl` file executable: `$ chmod +x repl`.

Alternatively you can load the project: `$ julia --project`.
Then load the Genie app: `julia> using Genie; Genie.loadapp()`.

## Start the server

Once the app is loaded, run `julia> up()`.

## API

The following API endpoints are exposed by the GenieCloud backend:

### List apps

#### `/api/v1/apps` `GET`

Returns a list of all available apps.

#### Response

```json
{
  "applications": [
    {
      "id": {
        "value": 1
      },
      "name": "IrisClustering",
      "port": 24838,
      "path": "/apps/"
    }
  ]
}
```

### App status

#### `/api/v1/apps/<app_id>/status` `GET`

Returns the status of the app.

#### Response

```json
{
  "status": "online"
}
```

Possible `status` values are: `online`, `offline`, `error`.

### Start the app

#### `/api/v1/apps/<app_id>/start` `GET`

Starts the app if app is `offline` otherwise it returns the app's status.

### Stop the app

#### `/api/v1/apps/<app_id>/stop` `GET`

Stops the app if `online` otherwise it returns the app's status.

### Retrieve app's folder contents

#### `/api/v1/apps/<app_id>/dir?path=<path>` `GET`

Returns the list of files and folders within `path`

##### Example `/api/v1/apps/1/dir?path=.`

```json
{
  "dir": [
    {
      "file": ".gitattributes"
    },
    {
      "file": ".gitignore"
    },
    {
      "file": "Manifest.toml"
    },
    {
      "file": "Project.toml"
    },
    {
      "dir": "bin"
    },
    {
      "file": "bootstrap.jl"
    },
    {
      "dir": "build"
    },
    {
      "dir": "config"
    },
    {
      "dir": "log"
    },
    {
      "dir": "models"
    },
    {
      "dir": "plugins"
    },
    {
      "dir": "public"
    },
    {
      "file": "routes.jl"
    },
    {
      "dir": "sessions"
    },
    {
      "dir": "src"
    },
    {
      "dir": "test"
    },
    {
      "dir": "views"
    }
  ]
}
```

##### Example `/api/v1/apps/1/dir?path=./views`

```json
{
  "dir": [
    {
      "file": "iris.jl"
    },
    {
      "dir": "layouts"
    }
  ]
}
```

### Read file contents

#### `/api/v1/apps/<app_id>/edit?path=<path>` `GET`

Returns the contents of the file at `path`, if it exists -- an error otherwise.

##### Example `/api/v1/apps/1/edit?path=./views/iris.jl`

```json
{
  "content": "page(\n    model, partial = true,\n    [\n      heading(\"Iris flowers clustering\")\n\n      row([\n        cell(class=\"st-module\", [\n          h6(\"Number of clusters\")\n          slider( 1:1:20,\n                  @data(:no_of_clusters);\n                  label=true)\n        ])\n        cell(class=\"st-module\", [\n          h6(\"Number of iterations\")\n          slider( 10:10:200,\n                  @data(:no_of_iterations);\n                  label=true)\n        ])\n\n        cell(class=\"st-module\", [\n          h6(\"X feature\")\n          Stipple.select(:xfeature; options=:features)\n        ])\n\n        cell(class=\"st-module\", [\n          h6(\"Y feature\")\n          Stipple.select(:yfeature; options=:features)\n        ])\n      ])\n\n      row([\n        cell(class=\"st-module\", [\n          h5(\"Species clusters\")\n          plot(:iris_plot_data, layout = :layout, config = \"{ displayLogo:false }\")\n        ])\n\n        cell(class=\"st-module\", [\n          h5(\"k-means clusters\")\n          plot(:cluster_plot_data, layout = :layout, config = \"{ displayLogo:false }\")\n        ])\n      ])\n\n      row([\n        cell(class=\"st-module\", [\n          h5(\"Iris data\")\n          table(:iris_data; pagination=:credit_data_pagination, dense=true, flat=true, style=\"height: 350px;\")\n        ])\n      ])\n    ]\n  )"
}
```

##### Example `/api/v1/apps/1/edit?path=./views/irisssss.jl`

```json
{
  "error": "./views/irisssss.jl is not a file"
}
```

### Write file contents

#### `/api/v1/apps/<app_id>/save?path=<path>` `POST`

Writes the `POST` payload sent in the `POST` variable `payload` to the file denoted by `path`.

### Read the app's log

#### `/api/v1/apps/<app_id>/log` `GET`

Returns the application's log. Can be large.

#### Response

```json
{
  "content": "┌ Error: 2022-02-21 09:33:59 MethodError: no method matching (::GenieDevTools.var\"#32#37\")()\n│ Stacktrace:\n│   [1] #invokelatest#2\n│"
```

### Retrieve application build/compilation errors

#### `/api/v1/apps/<app_id>/errors` `GET`

Returns any compilation errors that can cause the app building to fail. If no errors, the response will be an empty object `{}`,

#### Response

```json
{
  "(PkgData(IrisClustering [37dd9d81-1a0e-4ce3-9765-cea2640fa567], basedir \"/Users/adrian/Dropbox/Projects/GenieCloud/apps/IrisClustering\":\n  \"src/IrisClustering.jl\": FileInfo(IrisClustering=>ExprsSigs(<0 expressions>, <0 signatures>), with cachefile /Users/adrian/.julia/compiled/v1.7/IrisClustering/kz2BH_tYonf.ji)\n  \"config/secrets.jl\": FileInfo(IrisClustering=>ExprsSigs(<1 expressions>, <0 signatures>), )\n  \"config/initializers/autoload.jl\": FileInfo(IrisClustering=>ExprsSigs(<1 expressions>, <0 signatures>), )\n  \"config/initializers/converters.jl\": FileInfo(IrisClustering=>ExprsSigs(<5 expressions>, <3 signatures>), )\n  \"config/initializers/inflector.jl\": FileInfo(IrisClustering=>ExprsSigs(<2 expressions>, <0 signatures>), )\n  \"config/initializers/logging.jl\": FileInfo(IrisClustering=>ExprsSigs(<5 expressions>, <1 signatures>), )\n  \"config/initializers/ssl.jl\": FileInfo(IrisClustering=>ExprsSigs(<3 expressions>, <1 signatures>), )\n  \"plugins/autoreload.jl\": FileInfo(IrisClustering=>ExprsSigs(<3 expressions>, <1 signatures>), )\n  \"plugins/devtools.jl\": FileInfo(IrisClustering=>ExprsSigs(<2 expressions>, <0 signatures>), )\n  \"plugins/sessionstorage.jl\": FileInfo(IrisClustering=>ExprsSigs(<3 expressions>, <0 signatures>), )\n  \"routes.jl\": FileInfo(IrisClustering=>ExprsSigs(<6 expressions>, <1 signatures>), )\n, \"routes.jl\")": [
    {
      "file": "/Users/adrian/Dropbox/Projects/GenieCloud/apps/IrisClustering/routes.jl",
      "line": 16,
      "error": "extra token \"do\" after end of expression"
    },
    [
      {}
    ]
  ]
}
```

