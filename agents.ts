/*
 * Simple two-agent example in TypeScript
 *
 * EpicRefinerAgent: refines an incoming Epic string by trimming whitespace
 *   and attaching a prefix. In a real implementation this agent could
 *   leverage AI to rephrase or clarify high-level requirements.
 *
 * UserStoriesGeneratorAgent: generates a set of user stories from a
 *   refined epic. This sample implementation splits the epic into
 *   sentences and produces a user story for each. In production you
 *   would replace this logic with an AI agent or domain-specific
 *   template based on your backlog standards.
 */

export class EpicRefinerAgent {
  /**
   * Refine an epic description by performing basic cleanup and
   * returning a new string. If additional processing is needed
   * (e.g. summarization or rewriting), implement it here.
   *
   * @param epic The original epic description.
   * @returns A promise that resolves with the refined epic.
   */
  async refine(epic: string): Promise<string> {
    const cleaned = epic.trim().replace(/\s+/g, ' ');
    return `Refined Epic: ${cleaned}`;
  }
}

export class UserStoriesGeneratorAgent {
  /**
   * Generate user stories from a refined epic. This simplistic
   * implementation splits the epic into sentences and returns one
   * user story per sentence. Customize this logic to match your
   * workflow or integrate with AI-driven story generation.
   *
   * @param refinedEpic A refined epic string produced by another agent.
   * @returns A promise that resolves with a list of user stories.
   */
  async generateStories(refinedEpic: string): Promise<string[]> {
    // Remove the prefix used by the refiner agent
    const withoutPrefix = refinedEpic.replace(/^Refined Epic:\s*/, '');
    // Split by periods into sentences
    const sentences = withoutPrefix
      .split('.')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    // Create a simple user story for each sentence
    return sentences.map((sentence, index) => {
      return `User Story ${index + 1}: As a user, I want ${sentence.toLowerCase()} so that the goal is achieved.`;
    });
  }
}

/**
 * Run a simple pipeline with the two agents. In a more complex
 * scenario you might call remote services or MCP servers here.
 */
async function runPipeline(epic: string) {
  const refiner = new EpicRefinerAgent();
  const refined = await refiner.refine(epic);
  const generator = new UserStoriesGeneratorAgent();
  const stories = await generator.generateStories(refined);
  console.log('Original epic:', epic);
  console.log('Refined epic:', refined);
  console.log('Generated user stories:');
  stories.forEach((story) => {
    console.log('  -', story);
  });
}

// Example invocation for testing
const exampleEpic =
  'Build a mobile app for our bookstore that allows users to browse books and order them online. We also need to manage inventory and track customer orders in real time.';
// Only run the example when this file is executed directly (not when imported)
if (typeof require !== 'undefined' && require.main === module) {
  runPipeline(exampleEpic).catch((err) => {
    console.error(err);
  });
}

// Export the runPipeline function for use in other modules
export { runPipeline };