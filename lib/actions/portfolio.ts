"use server"

import { Octokit } from "octokit"
import { PortfolioData } from "@/types/portfolio"
import { revalidatePath } from "next/cache"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO // Format: "owner/repo"
const DATA_PATH = "data/portfolio-data.json"

export async function updatePortfolioData(newData: PortfolioData) {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        throw new Error("Missing GitHub configuration (GITHUB_TOKEN or GITHUB_REPO)")
    }

    const [owner, repo] = GITHUB_REPO.split("/")
    const octokit = new Octokit({ auth: GITHUB_TOKEN })

    console.log(`Syncing to: ${owner}/${repo} at ${DATA_PATH}`)

    try {
        let sha: string | undefined

        try {
            // 1. Get current file data (to get SHA)
            const { data: currentFile } = await octokit.rest.repos.getContent({
                owner,
                repo,
                path: DATA_PATH,
            })

            if (Array.isArray(currentFile)) {
                throw new Error("Data path is a directory, not a file")
            }
            sha = currentFile.sha
        } catch (e: any) {
            if (e.status === 404) {
                console.log("File not found on GitHub, will create a new one.")
            } else {
                throw e
            }
        }

        // 2. Update or Create the file
        await octokit.rest.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: DATA_PATH,
            message: "Sync: Update portfolio data via Admin Dashboard",
            content: Buffer.from(JSON.stringify(newData, null, 2)).toString("base64"),
            sha, // If undefined, Octokit creates the file
        })

        revalidatePath("/")
        return { success: true }
    } catch (error: any) {
        console.error("GitHub Sync Error:", error)
        return {
            success: false,
            error: error.status === 404
                ? `Repository or file path not found. Please check GITHUB_REPO (${GITHUB_REPO}) and ensure the repo exists and the token has access.`
                : error.message
        }
    }
}
