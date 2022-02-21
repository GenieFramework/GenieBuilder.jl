Html.div([
  heading("GenieCloud")
  page(model, partial = true, [
    row([
      # left section
      cell([
        row([
          partial(:applications, :list, context = context)
        ])
        row([
          partial(:applications, :files, context = context)
        ])
        row([
          partial(:applications, :editor, context = context)
        ])
      ])
      # right section
      cell([
        row([
          partial(:applications, :preview, context = context)
        ])
        row([
          partial(:applications, :status, context = context)
        ])
        row([
          partial(:applications, :console, context = context)
        ])
      ])
    ])
  ])
])