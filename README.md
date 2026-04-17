# AI Second Brain

> A Claude Code skill that walks you through building a living, searchable, AI-powered knowledge base from your own ChatGPT and Claude history, your raw research, and your daily inputs.

Built for non-technical readers of [MarTech AI](https://martechai.substack.com) — the newsletter where I share what I'm building with AI as a content creator with 200k+ LinkedIn followers.

If you've ever felt the pain of asking ChatGPT the same question six months apart, or losing a brilliant idea because it lived in a chat tab you closed, this is for you.

## What it does

The skill walks you through three stages:

1. **AI Brain** — exports your full ChatGPT and Claude history and turns the lot into a tagged, linked Obsidian vault you can actually search.
2. **Karpathy Wiki** — sets up a `raw/` and `wiki/` folder pair so Claude Code can compile a *living* wiki from your research. Drop a PDF in, the wiki updates itself.
3. **Living Wiki** — connects Gmail, NotebookLM and Granola to your wiki, sets up iMessage Channels so you can text your second brain from your phone, and scaffolds three slash commands (`/today`, `/ideas`, `/create`) that you can fire from anywhere.

The skill orchestrates all of it. Every step where Claude Code can do the work for you, it does. Every step that needs you (data exports from OpenAI, granting macOS permissions, NotebookLM browser login) is paused until you confirm.

## Before you start

You'll need:

- [Claude Code](https://docs.anthropic.com/claude-code) installed and working
- [Obsidian](https://obsidian.md) (free)
- About 30 minutes of attention (plus 1–3 days of background waiting for OpenAI to email your ChatGPT export)

## Install

There are two install paths. Pick one.

### Option A: Download the `.skill` file (easiest)

1. Download [`ai-second-brain.skill`](./ai-second-brain.skill) from this repo (click the file, then "Download raw file").
2. Double-click the downloaded file. Claude Code will install it.
3. Open Claude Code in any folder and say:
   > Set up my AI second brain.

### Option B: Clone the repo (for developers)

```bash
git clone https://github.com/charlie947/ai-second-brain.git ~/.claude/skills/ai-second-brain
```

Then open Claude Code and say:
> Set up my AI second brain.

## Trigger phrases

The skill activates when you ask Claude Code anything like:

- "Set up my AI second brain"
- "Build the Karpathy wiki"
- "Organise my ChatGPT conversations in Obsidian"
- "I exported my ChatGPT data, what now?"
- "Help me set up iMessage Channels"
- "Create the /today, /ideas and /create slash commands"

You can also run only one of the three stages — just say "skip step 1, I've already done it".

## Credits

This skill stands on the shoulders of three people. None of the underlying ideas are mine. The skill exists to package what they already shared so it takes ten minutes instead of ten hours.

- **[Andrej Karpathy](https://github.com/karpathy)** — published the [original gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) on 3rd April 2026 describing how to maintain a living wiki with an LLM and a folder of markdown. The wiki framework — `raw/`, `wiki/`, `CLAUDE.md` — is his.
- **Alex Freedman ([@alex2learn](https://twitter.com/alex2learn))** — wrote the AI Brain export-and-organise process this skill adapts in Step 1.
- **[Greg Isenberg](https://www.youtube.com/@GregIsenberg)** — published the YouTube breakdown of slash commands built on top of an Obsidian vault that Steps 3c is based on. Three commands here, twelve in his video.

I (Charlie Hills) wrote the skill that orchestrates all three and walks you through the parts that trip people up.

## Want to talk?

I write [MarTech AI](https://martechai.substack.com) — a weekly Substack on what I'm actually building with AI as a creator. If you got value from this skill, that's where to find more.

Reach me on [LinkedIn](https://linkedin.com/in/charlie-hills) or [Instagram](https://instagram.com/charliehills).

## Licence

MIT. Fork it, modify it, rebrand it — just don't strip the credits to Karpathy, Alex and Greg. Their work is what makes this useful.
