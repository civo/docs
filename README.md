# Civo Documentation

[![Website](https://img.shields.io/badge/Website-www.civo.com-blue)](https://www.civo.com/docs)
[![License](https://img.shields.io/github/license/civo/docs)](LICENSE)

Official documentation repository for [Civo](https://www.civo.com) - Built for More.

## 🤝 We Welcome Your Contributions!

**Found a typo? Have a better explanation? Want to add missing information?**

We'd love your help! This documentation is open source, and contributions of all sizes are welcome and appreciated. Whether you're fixing a single typo or adding an entire page, your contribution helps the Civo community.

### Contributing is Easy

- **Small changes** (typos, clarifications, updates): Click the "Edit this page" button at the bottom of any docs page, or use GitHub's web editor to make changes directly in your browser. No local setup needed!
- **Larger contributions**: Clone this repo, run `yarn start` to preview your changes locally, then submit a pull request

Every markdown file in the `content/docs/` directory is a documentation page you can improve. Don't worry about making mistakes - all changes are reviewed before being published.

📖 Read our [Contributing Guidelines](CONTRIBUTING.md) for more details and best practices.

---

## 📚 About

This repository contains the source files that power the documentation site at [https://www.civo.com/docs](https://www.civo.com/docs).

The documentation covers all aspects of the Civo cloud platform:

- **Kubernetes** - Managed Kubernetes clusters
- **Compute** - Virtual machine instances
- **Databases** - Managed database services (PostgreSQL, MySQL, Redis)
- **Networking** - Load balancers, firewalls, and networking features
- **Object Storage** - S3-compatible object storage
- **Account Management** - Billing, teams, and account settings

## 🚀 Local Development Setup

Want to preview your changes or contribute larger updates? Here's how to run the docs locally:

### Prerequisites

- **Node.js** >= 16.14 (check with `node --version`)
- **npm** (comes with Node.js)
- **Yarn** package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/civo/docs.git
cd docs
```

2. Install Yarn globally (if not already installed):
```bash
npm install --global yarn
```

3. Install dependencies:
```bash
yarn
```

### Development Commands

Start the development server with live reload:
```bash
yarn start
```
Opens `http://localhost:3000` - changes are reflected instantly!

Build static files for production:
```bash
yarn build
```

Preview the production build locally:
```bash
yarn serve
```

Clear cache (useful if something seems broken):
```bash
yarn clear
```

## 📁 Project Structure

```
docs/
├── content/              # All documentation content (edit these!)
│   └── docs/
│       ├── account/      # Account management docs
│       ├── compute/      # Compute instance docs
│       ├── database/     # Database service docs
│       ├── kubernetes/   # Kubernetes docs
│       ├── networking/   # Networking docs
│       ├── object-stores/# Object storage docs
│       └── ...
├── src/                  # Custom React components and CSS
├── static/               # Static assets (images, files)
├── docusaurus.config.js  # Site configuration
├── sidebars.js           # Navigation structure
└── package.json          # Dependencies and scripts
```

## ✍️ Documentation Guidelines

When contributing, please keep these guidelines in mind:

- **Format**: Use Markdown with [Docusaurus extensions](https://docusaurus.io/docs/markdown-features) (tabs, admonitions, etc.)
- **Images**: Optimize file sizes and ensure text is legible
- **Code**: Use code blocks for commands and terminal output (not screenshots)
- **Scope**: Keep pull requests focused on a single topic or fix
- **New topics**: Open an issue first to discuss whether it's better as docs or a [tutorial](https://www.civo.com/learn)

## 🛠️ Built With

- [Docusaurus 2](https://docusaurus.io/) - Modern static website generator
- [React](https://reactjs.org/) - UI library
- [MDX](https://mdxjs.com/) - Markdown with JSX support
- [Typesense](https://typesense.org/) - Search functionality

## 📖 Useful Links

- [Live Documentation](https://www.civo.com/docs)
- [Civo Website](https://www.civo.com)
- [Civo API Documentation](https://www.civo.com/api)
- [Civo Academy](https://www.civo.com/academy)
- [Civo Tutorials](https://www.civo.com/learn)
- [Civo Blog](https://www.civo.com/blog)

## 💬 Get Help

- **Documentation issues**: Open an [Issue](https://github.com/civo/docs/issues) or submit a PR
- **Civo platform support**: Visit [Civo Support](https://www.civo.com/contact)
- **Community**: Join discussions on the [Civo Community Slack](https://civo-community.slack.com)

## 🔄 Deployment

Changes merged to the `main` branch are automatically deployed to [www.civo.com/docs](https://www.civo.com/docs) through our CI/CD pipeline.

---

**Thank you for helping make Civo's documentation better for everyone!** 💙
