import { z } from "zod";
import { simpleGit } from "simple-git";
import { tool } from "ai";
import fs from "fs/promises";
// initalize zod
const fileChange = z.object({
    rootDir: z.string().min(1).describe("The Root Directory")
});
type fileChange = z.infer<typeof fileChange>

const fileReviewInput = z.object({
    filePath: z.string().min(1).describe("Absolute or relative path to the file to review")
});
type fileReviewInput = z.infer<typeof fileReviewInput>;

// itialize simpleGit
const excludeFiles = ["dist", "bun.lock"];
async function getFileChangesInDirectory({rootDir}: fileChange) {
    const git = simpleGit(rootDir);
    const summary = await git.diffSummary();
    const diffs: {file: string; diff: string}[] = [];
    for (const file of summary.files){
        if(excludeFiles.includes(file.file)) continue;
        const diff = await git.diff(["--", file.file]);
        diffs.push({ file: file.file, diff });
    }
    return diffs;
}
export const getFileChangesInDirectoryTool = tool({
    description: "Gets the code changes made in given directory",
    inputSchema: fileChange,
    execute: getFileChangesInDirectory
});

async function reviewFileCode({ filePath }: fileReviewInput) {
    try {
        const code = await fs.readFile(filePath, "utf-8");
        // Simple review: check for TODOs, long lines, and basic suggestions
        const lines = code.split("\n");
        const todos = lines.filter(line => line.includes("TODO"));
        const longLines = lines.filter(line => line.length > 120);
        let summary = `File: ${filePath}\n`;
        summary += `Total lines: ${lines.length}\n`;
        if (todos.length) summary += `Found ${todos.length} TODOs.\n`;
        if (longLines.length) summary += `Found ${longLines.length} lines longer than 120 characters.\n`;
        summary += "Basic review completed.";
        return { summary };
    } catch (error: any) {
        return { error: error?.message || "Could not read file." };
    }
}

export const reviewFileCodeTool = tool({
    description: "Reviews the code in the specified file and returns a summary with basic suggestions.",
    inputSchema: fileReviewInput,
    execute: reviewFileCode
});