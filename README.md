# GenieBuilder.jl


## Installation

### Optional: create a project for GenieBuilder

```bash
> mkdir "mygeniebuilder"
> cd "mygeniebuilder"
> julia
```

```julia
pkg> activate .
```

or install globally:

```bash
> julia
```

### Install GenieBuilder

```julia
pkg> add https://github.com/GenieFramework/GenieBuilder.jl#v0.16
```

or

```julia
pkg> dev https://github.com/GenieFramework/GenieBuilder.jl#v0.16
```

## Usage

```julia
julia> using GenieBuilder
```

This will bring `GenieBuilder` into scope and start the GenieBuilder service. The service is responsible for managing the list of registered Genie apps, as well as the no-code editor.

By default, the service will start on port `10101` over HTTP, and on port `10102` for websockets.

## Creating a boilerplate Genie app

```julia
julia> GenieBuilder.create([name], [path])
```

API endpoint:
```html
/api/v1/apps/create?path=/Users/adrian/Projects/GenieBuilderNextGen&name=testapp
```

-> `name` is the name of the app, and `path` is the path to the app's directory. If `name` is not provided, the name of the app will be the name of the directory. If `path` is not provided, the current directory will be used.
-> returns information about the registered app

This will create a new Julia project in the current directory. You will see the new project files: `Project.toml`, `Manifest.toml` -- as well as the application itself: `app.jl` (for the backend) and `app.jl.html` (for the frontend/UI).

Upon successfully creating the app, the new application is automatically registered with `GenieBuilder` so you can edit it with the no-code editor.

## Working with the GenieBuilder API

The following functions are available to interact with `GenieBuilder`:

### Get the list of apps registered with GenieBuilder

```julia
julia> GenieBuilder.apps()
```

-> Returns an array of `GenieBuilder.App` objects.

API endpoint:

```html
/api/v1/apps
```

```json
{
  "applications": [
    {
      "id": {
        "value": 1
      },
      "name": "geniebuildernextgen",
      "port": 9101,
      "path": "/Volumes/Storage/Dropbox/Projects/GenieBuilderNextGen/",
      "status": "offline",
      "channel": "HSTYSOOKBWUMHXUZIABDTXFEHDEHHWIU",
      "replport": 9102
    }
  ]
}
```

### Register an app with GenieBuilder

```julia
julia> GenieBuilder.register([name], [path])
```

-> `name` is the name of the app, and `path` is the path to the app's directory. If `name` is not provided, the name of the app will be the name of the directory. If `path` is not provided, the current directory will be used.
-> returns information about the registered app

API endpoint:

```html
/api/v1/register
```

-> GET payload: `name` and `path` (see above for expected data for both vars).

#### Example

```html
http://127.0.0.1:10101/api/v1/apps/register?path=/Users/adrian/Projects/GenieBuilderNextGen&name=testapp
```

```json
{
  "id": {
    "value": 1
  },
  "name": "testapp",
  "port": 9101,
  "path": "/Users/adrian/Projects/GenieBuilderNextGen/",
  "status": "offline",
  "channel": "SERRLQOMSCNRBLARTUZOZZYBSDAACOAF",
  "replport": 9102
}
```

### Edit an app with the no-code editor

In order to edit an app with the no-code editor, the app must be registered with GenieBuilder and started (running). For more information on how to register an app, see the `register` function above.

### Start an app

```julia
julia> GenieBuilder.start(app::Application)
```

API endpoint:

```html
/api/v1/apps/<app_id>/start
```

-> `app_id` is the ID of the app to start. The app must be registered with GenieBuilder.
-> `app` is an instance of `GenieBuilder.Application` (see `apps()` for more information).

### Open no-code editor

```julia
julia> GenieBuilder.editor(app::Application)
```

or

```julia
julia> GenieBuilder.editor([name], [path])
```

### Stop an app

```julia
julia> GenieBuilder.stop(app::Application)
```

API endpoint:

```html
/api/v1/apps/<app_id>/stop
```

-> `app_id` is the ID of the app to stop. The app must be registered with GenieBuilder.
-> `app` is an instance of `GenieBuilder.Application` (see `apps()` for more information).

### Get information about an app

API endpoint:

```html
/api/v1/apps/<app_id>/pages
```

### Unregister an app

```julia
julia> GenieBuilder.unregister(app::Application)
```

or

```julia
julia> GenieBuilder.unregister([name], [path])
```

API endpoint:

```html
/api/v1/apps/<app_id>/unregister
```

or

API endpoint:

```html
/api/v1/apps/unregister?path=/Users/adrian/Projects/GenieBuilderNextGen&name=testapp
```

### Open app in browser

```julia
julia> GenieBuilder.openbrowser(app::Application)
```

### Stop GenieBuilder

```julia
julia> GenieBuilder.stop!()
```
