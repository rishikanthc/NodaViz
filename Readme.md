# NodaViz

NodaViz is your sleek, companion web app for [Noda](https://noda.io), designed to breathe life into your mind-maps. It can also visualize any arbitrary graph data housed in a `CSV` file with full support for all features.

## Why I built this ?

[Noda](https://noda.io) is an integral part of my workflow and I use it constantly. The default web viewer has a clunky UI and offers a terrible UX navigating around the graph. Built from a personal need for a more fluid and accessible way to navigate Noda's VR mind-mapping creations on a laptop, NodaViz stands out with its user-centric design and intuitive navigation features. It's more than just a visualization tool—it's an extension of your creative process, allowing for effortless exploration and interaction with your ideas.

## Why NodaViz? Because Your Ideas Deserve Elegance and Ease.

- **Visualize with Clarity**: Dive into your Noda mind-maps or any graph data with a visually intuitive interface that makes exploration a breeze.
- **Enhance with ChatGPT**: Elevate your graphs with AI-driven summaries, adding depth and insight directly within NodaViz. (API Key required)
- **Navigate with Precision**: Zoom, drag, pan, rotate and click through nodes with fluidity, making your journey through ideas seamless.
- **Customize on the Fly**: Rearrange your nodes for that perfect layout, enhancing clarity and focus.

### Features

- Visualize mind-maps created in Noda
- ChatGPT integration for generating summaries (Requires API Key)
- Intuitive UI for exploring the graph
- Click nodes to jump
- Zoom in/out
- Drag and pan
- Move nodes around
- Can be self-hosted (WIP)

Experience the demo at [nodaviz.io](https://nodaviz.io) and see for yourself how NodaViz transforms the way you engage with mind maps.

## A Note on Security and Development

Currently in its enthusiastic pre-alpha phase, NodaViz invites you to join its evolution—expect the unexpected, and kindly report any adventurers (bugs) you encounter. For now, your OpenAI API key is stored locally with care yet in your browser. This is but a temporary arrangement, set to evolve for better security. The stored key can be deleted by clearing the website data in your browser.

## Roadmap

- [ ] Add a Rest API backend
  - [ ] Ingest and parse CSV in backend
- [ ] Feature: User accounts
- [ ] Feature: Store and switch between multiple graphs
- [ ] Persist changes to graph structure
- [ ] Feature: Send to NodaViz from Noda (Sync feature)
- [ ] Call GPT on subset of nodes
- [ ] Custom prompts for GPT
- [ ] Full text search
- [ ] Sync to Obsidian
- [ ] Chat with your mind-maps

## Contributing

Contributions are more than welcome. I would love to grow and expand this project to benefit the community. Please feel free to open an issue or a PR. Open a discussion to request new features or ideas.

## Development

_Note_ Requires Node.js to be installed on your system.
Simply clone the repo and run `npm install`. Then run `npm run dev` to start the development server. The app is built using ReactJS and Tailwind CSS.

### Dependencies

- react-force-graph (https://github.com/vasturiano/react-force-graph)
