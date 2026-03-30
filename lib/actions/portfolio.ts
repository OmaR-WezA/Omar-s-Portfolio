"use server"

import { Octokit } from "octokit"
import { PortfolioData } from "@/types/portfolio"
import { revalidatePath } from "next/cache"
import fs from "fs"
import path from "path"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO = process.env.GITHUB_REPO // Format: "owner/repo"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const DATA_PATH = "data/portfolio-data.json"

export async function verifyAdminPassword(password: string) {
    if (!ADMIN_PASSWORD) {
        console.error("ADMIN_PASSWORD not set in environment")
        return false
    }
    return password === ADMIN_PASSWORD
}

export async function updatePortfolioData(newData: PortfolioData, saveLocally: boolean = false) {
    try {
        if (saveLocally) {
            const fullPath = path.join(process.cwd(), DATA_PATH)
            fs.writeFileSync(fullPath, JSON.stringify(newData, null, 2))
            revalidatePath("/")
            return { success: true, isLocal: true }
        }

        if (!GITHUB_TOKEN || !GITHUB_REPO) {
            throw new Error("Missing GitHub configuration. Please add GITHUB_TOKEN and GITHUB_REPO to your Vercel Environment Variables.")
        }

        const [owner, repo] = GITHUB_REPO.split("/")
        const octokit = new Octokit({ auth: GITHUB_TOKEN })
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

export async function getImageAssets() {
    try {
        const publicDir = path.join(process.cwd(), "public")
        const imgDir = path.join(publicDir, "img")

        if (!fs.existsSync(imgDir)) {
            return []
        }

        const files: string[] = []

        function traverse(dir: string) {
            const list = fs.readdirSync(dir)
            list.forEach(file => {
                const fullPath = path.join(dir, file)
                const stat = fs.statSync(fullPath)
                if (stat.isDirectory()) {
                    traverse(fullPath)
                } else {
                    // Only include common image extensions
                    if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(file)) {
                        // Normalize to web paths starting with /img
                        const relativePath = path.relative(publicDir, fullPath).replace(/\\/g, "/")
                        files.push("/" + relativePath)
                    }
                }
            })
        }

        traverse(imgDir)
        return files.sort()
    } catch (error) {
        console.error("Error listing images:", error)
        return []
    }
}

export async function uploadImage(base64Data: string, fileName: string) {
    try {
        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), "public", "img", "uploads")
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        // Clean up base64 string
        const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "")
        const buffer = Buffer.from(base64Content, "base64")
        
        // Ensure unique filename
        const ext = path.extname(fileName) || ".png"
        const nameWithoutExt = path.basename(fileName, ext)
        const uniqueName = `${nameWithoutExt}-${Date.now()}${ext}`
        const filePath = path.join(uploadDir, uniqueName)
        
        fs.writeFileSync(filePath, buffer)
        
        return { 
            success: true, 
            path: `/img/uploads/${uniqueName}` 
        }
    } catch (error: any) {
        console.error("Upload Error:", error)
        return { success: false, error: error.message }
    }
}
