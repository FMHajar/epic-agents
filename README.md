# Epic Agents

This project demonstrates a **multi‑agent pipeline** written in TypeScript.  It starts with a simple two‑agent flow and is extensible to include additional agents for workflow and backlog generation.

## Agents

The repository currently defines four agents:

- **EpicRefinerAgent** – trims and refines an input epic description.
- **UserStoriesGeneratorAgent** – takes the refined epic and generates user stories.
- **WorkflowGeneratorAgent** – converts the generated user stories into a structured workflow, outlining the steps, tools and agents required to complete the epic.
- **BacklogGeneratorAgent** – derives backlog tasks from the workflow and repository context (simplified in this example).

## Running the examples

To run the original two‑agent pipeline:

```bash
npm install
npm start
```

To run the full pipeline (including workflow and backlog generation):

```bash
npm install
npm run start:full
```

### Build

You can compile the TypeScript files to JavaScript with:

```bash
npm run build
```

The compiled files will be output to the `dist/` directory.  You can then run the compiled full pipeline with:

```bash
node dist/fullPipeline.js
```

