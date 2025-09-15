# my-agent

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

# AIFD-AI-Agent

## Overview

AIFD-AI-Agent is an AI-powered code review assistant designed to help developers analyze, review, and improve their codebase efficiently. The agent leverages advanced AI models to provide feedback, suggestions, and code change summaries for files or entire directories in your project.

## Features
- **Code Review Tool**: Review the code in any file you choose and receive actionable suggestions.
- **Directory Change Summary**: Get a summary of code changes in a specified directory, excluding unnecessary files.
- **Prompt-Based Interaction**: Use natural language prompts to instruct the agent on what to review or analyze.
- **Extensible Tooling**: Easily add new tools for custom code analysis or review workflows.

## How It Works

1. **Tools Integration**: The agent exposes tools such as `getFileChangesInDirectoryTool` and `reviewFileCodeTool`.
   - `getFileChangesInDirectoryTool`: Summarizes code changes in a directory using git.
   - `reviewFileCodeTool`: Reviews the code in a specified file and provides a summary with basic suggestions (e.g., TODOs, long lines).

2. **Prompt Handling**: You provide a prompt (e.g., "Review the code in 'index.ts'") and the agent uses the appropriate tool to analyze the code and return feedback.

3. **AI Model**: The agent uses the Gemini AI model via the `@ai-sdk/google` package to process prompts and generate responses.

4. **Streaming Output**: Results are streamed to the console for real-time feedback.

## Example Usage

```typescript
import { reviewFileCodeTool } from "./tools";

const prompt = "Review the code in 'index.ts' and provide suggestions for improvements.";
// The agent will use reviewFileCodeTool to analyze the file and return a summary.
```

## Getting Started

1. **Install Dependencies**
   ```bash
   bun install
   ```
2. **Configure Your Prompts**
   - Edit `prompts.ts` to customize system prompts and agent instructions.
3. **Run the Agent**
   - Use the main entry point (e.g., `index.ts`) to interact with the agent using your desired prompt.

## Project Structure
- `index.ts`: Main entry point for running the agent and handling prompts.
- `tools.ts`: Contains tool definitions for code review and change summary.
- `prompts.ts`: System prompt and agent configuration.
- `package.json`: Project dependencies and scripts.
- `README.md`: Project documentation.

## Customization
- Add new tools in `tools.ts` for additional code analysis features.
- Modify prompts in `prompts.ts` to tailor agent behavior.

## License
MIT
