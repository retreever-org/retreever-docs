<p align="center">
  <img src="http://raw.githubusercontent.com/Retreever-org/retreever-java/fae0a98e028e9b7bc6b269c480b388245530ea8d/Docmentation/Logo/retreever-banner.svg" width="100%" alt="Retreever Banner" />
</p>

# Retreever Docs

**Retreever Docs** is a lightweight, fast, and fully customizable documentation interface for the Retreever ecosystem. It is built to serve as the primary documentation site for:

* Retreever Java
* Retreever API Tools
* Any upcoming Retreever modules

This project focuses on clarity, speed, and a developer-centric experience. All content is Markdown-based and rendered through a clean, modern UI.


## Purpose

Retreever Docs provides a simple way to:

* Organize documentation without introducing heavy frameworks
* Render Markdown with a consistent layout
* Auto-generate navigation from folder structure
* Maintain documentation alongside code
* Allow the community to contribute easily

The goal is not to be a full documentation engine — only a clean, efficient frontend for reading docs.


## Key Features

### **• Modern Dark UI**

Responsive layout with a minimal, tool-first design:

* Custom color tokens
* Navbar + Sidebar + TOC layout
* Tailwind v4-based styling
* Clean typography for technical content

### **• Markdown Rendering**

* `markdown-it`
* Syntax highlighting via `highlight.js`
* Sanitized HTML with `DOMPurify`

### **• Navigation From File Structure**

* Vite glob imports automatically map files inside `/docs`
* URL-based routing
* No manual sidebar configuration needed

### **• Lightweight State & Routing**

* React Router v7
* Zustand for UI state

### **• Open & Extensible**

Built to be modified, extended, or integrated into other Retreever tooling.


## Project Structure

```
docs/     ← your markdown files live here
src/
  components/
  pages/
  store/
  utils/
public/
```


## Getting Started

### Installation

```bash
git clone https://github.com/Retreever-org/retreever-docs.git
cd retreever-docs
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The output is a static site that can be deployed to any static hosting environment.


## Contributing

Contributions are welcome.

If you'd like to add or update documentation, improve UI components, or extend functionality:

1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a pull request

For documentation updates, edit or add Markdown files inside `/src/docs`.

If you're unsure where a change belongs, open an issue to discuss it.


## Licensing

This project is available under the **MIT License**.


## Maintainers

**Retreever Org**
Focused on building reliable, reflection-driven tools for the Java and Spring ecosystem.
