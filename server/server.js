const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const GITHUB_API_URL = "https://api.github.com";

app.get("/api/search", async (req, res) => {
    const { query } = req.query;
    try {
    const response = await axios.get(
        `${GITHUB_API_URL}/search/repositories?q=${query}`
    );
    res.json(response.data);
    } catch (error) {
    res.status(500).json({ error: "Failed to fetch repositories" });
    }
});

app.get("/api/repo/:owner/:repo", async (req, res) => {
    const { owner, repo } = req.params;
    try {
    const response = await axios.get(
        `${GITHUB_API_URL}/repos/${owner}/${repo}`
    );
    res.json(response.data);
    } catch (error) {
    res.status(500).json({ error: "Failed to fetch repository details" });
    }
});

app.get("/api/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
