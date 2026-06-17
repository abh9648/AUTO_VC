const fs = require("fs").promises;
const path = require("path");

async function getRepoFiles(req, res) {
  try {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    const commitFolders = await fs.readdir(commitsPath);

    let result = [];

    for (const commitId of commitFolders) {
      const commitDir = path.join(commitsPath, commitId);

      const files = await fs.readdir(commitDir);

      result.push({
        commitId,
        files,
      });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read repo files" });
  }
}

module.exports = { getRepoFiles };