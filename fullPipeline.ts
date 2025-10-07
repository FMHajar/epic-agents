/*
 * Full multi-agent pipeline example.
 *
 * This script orchestrates the following agents:
 * 1. EpicRefinerAgent – trims and refines an input epic.
 * 2. UserStoriesGeneratorAgent – generates user stories from the refined epic.
 * 3. WorkflowGeneratorAgent – creates a structured workflow from the stories.
 * 4. BacklogGeneratorAgent – produces backlog tasks from the workflow and repository name.
 *
 * Run with: ts-node --transpile-only fullPipeline.ts
 */

// Import TypeScript modules. When compiled to JS, the extensions
// will be resolved automatically by Node or by bundlers. Using
// `.ts` here allows ts-node to import these files directly.
import { EpicRefinerAgent, UserStoriesGeneratorAgent } from './agents.ts';
import { WorkflowGeneratorAgent, BacklogGeneratorAgent } from './extendedAgents.ts';

/**
 * Run the full pipeline. This function chains the output of each agent
 * into the next. It logs intermediate results and returns the final
 * backlog array.
 *
 * @param epic The raw epic description provided by a user.
 * @param repo The repository name (e.g. "username/repo") used by the backlog generator.
 */
export async function runFullPipeline(epic: string, repo: string) {
  // 1. Refine the epic
  const refiner = new EpicRefinerAgent();
  const refined = await refiner.refine(epic);

  // 2. Generate user stories
  const generator = new UserStoriesGeneratorAgent();
  const stories = await generator.generateStories(refined);

  // 3. Create a workflow from user stories
  const workflowAgent = new WorkflowGeneratorAgent();
  const workflow = await workflowAgent.createWorkflow(stories);

  // 4. Generate backlog tasks from workflow and repository context
  const backlogAgent = new BacklogGeneratorAgent();
  const backlog = await backlogAgent.createBacklog(workflow, repo);

  // Log intermediate and final results
  console.log('Original epic:', epic);
  console.log('Refined epic:', refined);
  console.log('\nUser stories:');
  stories.forEach((story) => console.log('  -', story));
  console.log('\nWorkflow:');
  workflow.forEach((step) => console.log('  -', JSON.stringify(step)));
  console.log('\nBacklog items:');
  backlog.forEach((item) => console.log('  -', JSON.stringify(item)));

  return backlog;
}

// Example invocation when run directly
if (typeof require !== 'undefined' && require.main === module) {
  const exampleEpic =
    'Build a mobile app for our bookstore that allows users to browse books and order them online. We also need to manage inventory and track customer orders in real time.';
  const exampleRepo = 'username/repo';
  runFullPipeline(exampleEpic, exampleRepo).catch((err) => {
    console.error(err);
  });
}