# Civo Documentation

This repository serves as the source for [Civo](https://www.civo.com) documentation. The source files in the repository are used to render the documentation pages at https://www.civo.com/docs .

You can contribute to this repository by submitting a Pull Request with your suggested changes. Once merged to the main branch, these changes will be reflected on the site. Read our [contributing document](CONTRIBUTING.md) for more detail.

## Website

This website is built using [starlight](https://starlight.astro.build/), a modern static website generator base on Astro

### Installation

You will need [bun](https://bun.sh/) installed, to achieve this you can run this.

macOS/Linux (curl)
```console
curl -fsSL https://bun.sh/install | bash
```

Windows (PowerShell)
```console
powershell -c "irm bun.sh/install.ps1|iex"
```
### Local Development

```console
$ bun install
```

```console
$ bun run dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
$ bun run build
```

This command generates static content into the `dist` directory and can be served using any static contents hosting service.

### Deployment


