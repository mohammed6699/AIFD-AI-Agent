import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompts";
import {  reviewFileCodeTool } from "./tools";

const codeReviewAgent = async (prompt: string) => {
    const result = streamText({
        model: google("models/gemini-2.5-flash"),
        prompt,
        system: SYSTEM_PROMPT,
        tools: {
            reviewFileCodeTool: reviewFileCodeTool
        },
        stopWhen: stepCountIs(10)
    });
    for await (const chunk of result.textStream){
        process.stdout.write(chunk)
    }
};
await codeReviewAgent(
  "Review the code in 'index.ts' and provide suggestions for improvements.",
);