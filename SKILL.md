---
name: ai-second-brain
description: Walks the user through Charlie Hills's AI Second Brain + Karpathy Wiki setup from the MarTech AI newsletter. Use whenever the user mentions building an AI second brain, the Karpathy wiki, organising their ChatGPT/Claude exports in Obsidian, setting up a living wiki with Claude Code, connecting iMessage Channels, or installing the /today, /ideas, /create slash commands. Trigger on phrases like "set up my second brain", "build the Karpathy wiki", "follow Charlie's newsletter setup", "organise my AI conversations", "Obsidian + Claude Code setup", "I exported my ChatGPT data what now", or any reference to MarTech AI's Karpathy Wiki issue. Use even if the user only mentions one of the three steps (AI Brain, Karpathy Wiki, or Channels + slash commands).
---

# AI Second Brain Setup

This skill walks the user through the full setup from Charlie Hills's MarTech AI newsletter issue *"How to build a second brain with Obsidian and Claude Code"*. The process turns a folder of exports and raw research into a living wiki the user can talk to from their phone.

The setup has three steps. The user can do all three or pick one — confirm at the start which they want.

1. **AI Brain** — export ChatGPT and Claude history, organise it in Obsidian as tagged, linked markdown
2. **Karpathy Wiki** — set up `raw/` and `wiki/` folders with Karpathy's `CLAUDE.md` instruction file so Claude Code can compile a living wiki from raw research
3. **Living Wiki** — add MCP connectors (Gmail, NotebookLM, Granola), set up iMessage Channels, scaffold the `/today`, `/ideas`, `/create` slash commands

## How to use this skill

The user is most likely a non-technical newsletter reader. Many will be opening Terminal for the first time. Default to plain English, never assume CLI familiarity, and explain what each command does *before* running it.

The skill orchestrates a conversation. At each step there are things Claude Code can do (create folders, download files, install other skills, scaffold commands) and things only the user can do (request a data export from OpenAI, grant Full Disk Access in macOS System Settings, log in to NotebookLM in a browser). Be explicit about which is which. Pause and wait when the ball is in the user's court.

If the user says "skip step 1, I've already done it" or "just do step 3", honour that. Confirm what's already in place, then jump in.

## Step 0: Pre-flight check

Before touching anything, confirm what the user has installed. Ask:

> Quick check before we start. Do you have:
> 1. **Claude Code** installed and working? (you're using it now if so)
> 2. **Obsidian** downloaded? (free from obsidian.md)
> 3. Any **ChatGPT or Claude data exports** already requested? (the OpenAI one takes 1–3 days, so we may need to start it now and come back)

If Obsidian isn't installed, point them to https://obsidian.md and pause until it's done. If they haven't requested the ChatGPT export, kick that off **first** (instructions in Step 1) so it's processing in the background while they do the rest.

Also confirm where they want the brain to live. Default: `~/Desktop/Brain` (one word, no spaces — spaces caused issues for Charlie when he used "LLM Brain"). Use `Brain` unless the user pushes back.

## Step 1: Build the AI Brain

The goal here is to turn years of ChatGPT and Claude conversations into a tagged, linked, searchable Obsidian vault.

### 1a. Request the data exports (user does this)

This is user-only. Walk them through both:

**ChatGPT** (do this FIRST — it can take up to 3 days):
> Go to chatgpt.com → click your profile icon (top right) → Settings → Data Controls → "Export data". OpenAI will email you a download link. Tell me when you've requested it.

**Claude** (arrives in ~5 minutes):
> Go to claude.ai → click your profile icon (bottom left) → Settings → Privacy → "Export Data". The email arrives in about 5 minutes. Tell me when you've got both ZIP files downloaded and unzipped.

Wait for the user to confirm. If they say "the ChatGPT one will take days, what do I do meanwhile" — suggest moving to Step 2 (Karpathy Wiki) since it doesn't depend on the exports.

### 1b. Set up the vault (Claude Code can do this)

Once the user has unzipped both export folders on their desktop, do this:

```bash
mkdir -p ~/Desktop/Brain
```

Then ask the user to drag the two unzipped export folders into `~/Desktop/Brain`. After they confirm:

```bash
ls ~/Desktop/Brain
```

Verify both folders are there.

Then tell them:
> Open Obsidian. Click "**Open folder as vault**" (not "Create new vault"). Navigate to your Desktop and select the `Brain` folder. Tell me once it's open.

### 1c. Organise everything (Claude Code does this — this is the magic)

Once the vault is open in Obsidian, the user needs to launch a fresh Claude Code session pointing at the Brain folder. Tell them:

> Open a new Terminal window (Cmd+Space, type Terminal, hit Enter). Then paste this:
> ```
> cd ~/Desktop/Brain
> claude
> ```
> Once Claude Code is running in that window, paste this prompt:
> ```
> Organise this folder into an Obsidian vault. Convert all my ChatGPT and Claude conversations into individual markdown files with proper frontmatter (title, date, tags, category). Then launch 10 sub-agents to go through every conversation and smartly tag things: names, people, places, recurring themes, projects, and topics. Link everything together with wikilinks so the Obsidian graph connects related conversations.
> ```

This will run for several minutes and spawn 10 sub-agents in parallel. When it's done, tell the user:
> Open Obsidian. Hit **Cmd+G** (or Ctrl+G on Windows) to open Graph View. Every conversation is now a tagged, linked markdown file. Have a wander.

## Step 2: Set up the Karpathy Wiki

The AI Brain organises the past. The Karpathy Wiki is a *living* knowledge base that grows every time the user drops in new research. The user dumps raw sources into a `raw/` folder, and Claude Code compiles structured wiki articles in `wiki/`.

Karpathy's framing is worth quoting to the user: *"Obsidian is the IDE. The LLM is the programmer. The wiki is the codebase."*

### 2a. Create the structure (Claude Code does this)

In the same Brain folder, create the two subfolders and download Karpathy's instruction file:

```bash
mkdir -p ~/Desktop/Brain/raw ~/Desktop/Brain/wiki
curl -L https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f/raw -o ~/Desktop/Brain/CLAUDE.md
```

Verify the download worked:
```bash
ls -la ~/Desktop/Brain/CLAUDE.md
```

If the curl fails, fall back to: `WebFetch` the gist URL (`https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`) and write the contents to `~/Desktop/Brain/CLAUDE.md` using the Write tool.

### 2b. Get sources into the raw folder (user-led, with options)

Two paths — let the user pick.

**Option A: Drag and drop.** Tell them:
> Open the `raw` folder in Finder. Drop in 5–10 sources on a single topic to start — PDFs, articles you've saved, transcripts, notes. Tell me when you're done.

**Option B: Pull from NotebookLM.** This requires the NotebookLM skill. If they want this option, install it for them and walk through the login. See **Step 3: Connectors** below — the NotebookLM connector is the same setup. Once installed, ask the user for their notebook URL and run:

> Pull all the sources from this NotebookLM notebook and save them as files in `~/Desktop/Brain/raw`: [user pastes URL]

### 2c. Build the wiki (Claude Code does this)

Once sources are in `raw/`, run:

> Process every source in `~/Desktop/Brain/raw` using the wiki instructions in `~/Desktop/Brain/CLAUDE.md`. For each source, write a summary page in the `wiki` folder, create or update relevant topic and concept pages, add wikilinks between related pages, and maintain an index file listing every wiki page with a one-line description.

This takes a few minutes. When it finishes, tell the user to open Obsidian, switch to the `wiki/` folder, and hit Cmd+G for the graph view.

### 2d. Iterate (ongoing)

Coach the user on what to do next:
> The wiki won't be perfect on the first run. Tell Claude Code to adjust: "split this page", "merge these two", "add more detail here". Karpathy also recommends periodic health checks — ask Claude Code to "check the wiki for contradictions, orphan pages, and missing concept pages" every week or two.

## Step 3: Give the wiki a heartbeat (MCP + Channels + slash commands)

This step turns a static wiki into something the user can talk to from their phone. Three sub-steps.

### 3a. MCP connectors

Three connectors are worth setting up first:
- **Gmail** — for forwarded articles, research links, email threads
- **Granola** — for meeting transcripts, decisions, action items
- **NotebookLM** — for pulling existing notebooks

For each one the user wants, tell Claude Code:
> Connect to my [Gmail / Granola / NotebookLM] so you can pull new content into the wiki.

For NotebookLM specifically, the install requires a one-time browser login that **must** happen outside Claude Code. Walk the user through it:

1. In Claude Code, run: `Install the NotebookLM skill so I can pull sources from my notebooks.`
2. Once install completes, tell the user:
   > Open a brand new Terminal window (don't run this inside Claude Code). Type:
   > ```
   > notebooklm login
   > ```
   > A browser will open. Sign into your Google account, wait for the NotebookLM homepage to fully load, then go back to Terminal and press Enter. Close that Terminal window. You're done.

### 3b. iMessage Channels

This is the part Charlie says "people lose their minds" over. The user sets up a Mac-side service that listens for iMessages sent to their own number, processes them against the wiki, and replies in the same thread.

Walk the user through it:

> In Terminal, run:
> ```
> claude --channels plugin:imessage@claude-plugins-official
> ```

Claude Code will request two macOS permissions. Both are user-only — explain what to do:

**1. Full Disk Access for Terminal.**
> macOS will prompt you, or you can do it manually: open System Settings → Privacy & Security → Full Disk Access → toggle Terminal **on**. This lets Claude Code read incoming iMessages.

**2. Automation permission for Messages.**
> The first time Claude Code tries to send a reply, macOS will ask if Terminal can control Messages. Click **Allow**.

Once both are granted, test:
> On your phone, open iMessage and **send a text to your own number**. Within a few seconds, Claude Code will detect it, process it against your wiki, and reply in the same thread.

Note for the user: if they close Claude Code on their Mac, Channels stops listening. Tell them: `claude --resume` to pick up where they left off, or keep a session running in the background.

### 3c. Scaffold the slash commands (Claude Code does this)

Three commands to start. For each, send the user the prompt and ask them to paste it into Claude Code so it can save the command file (Claude Code will ask for write permission — they approve).

**`/today`** — daily plan (requires Gmail + Google Calendar + wiki):
> Create a slash command called /today that reads my Google Calendar for today's meetings, checks my Gmail for anything urgent, and cross-references both against my wiki for relevant context on the people and projects involved. Give me a prioritised plan for the day. Save it as a file so I can run /today any time.

**`/ideas`** — content ideas (requires Granola + Gmail + wiki):
> Create a slash command called /ideas that reads my recent Granola meeting transcripts, latest Gmail threads, and wiki pages, finds patterns and emerging topics across all of them, and generates ideas for content I should create, topics I should write about, and opportunities I might be missing. Save it as a file so I can run /ideas any time.

**`/create`** — content drafting (requires the wiki):
> Create a slash command called /create that takes a topic or idea as input, pulls relevant context from my wiki, and produces a finished piece of content in my voice. It should be able to write posts, newsletter drafts, video scripts, and infographic outlines. Save it as a file so I can run /create any time.

Once saved, the commands work from the user's phone too. Texting `/today` to themselves in iMessage gets back a daily briefing.

## Wrapping up

After all three steps, tell the user what they now have:
- Every past AI conversation, tagged and linked, in Obsidian
- A living wiki that grows every time they drop in new research
- The ability to talk to it from their phone via iMessage
- Three slash commands that pull their day, surface content ideas, and draft posts

Suggest a next move: drop one new source into `raw/`, then text themselves `/create [topic from that source]` to feel the loop close.

If they got stuck at any step, point them back to the original newsletter and offer to debug the specific failure rather than restart.

## Things that commonly go wrong

- **Folder name has a space** ("LLM Brain" instead of "Brain") — Claude Code's path handling will break. Always use a single-word folder name.
- **User runs `claude` without `cd`-ing first** — Claude Code reads from whatever directory the terminal is sitting in. If they skip the `cd`, sub-agents won't see the export files. Re-confirm the working directory before any organise/process step.
- **NotebookLM login attempted inside Claude Code** — must be a separate Terminal window. The browser handoff fails otherwise.
- **Channels stops working after Mac sleeps / Claude Code closes** — `claude --resume` brings it back. Worth telling the user up front so they don't think it's broken.
- **Full Disk Access toggle didn't appear** — sometimes macOS needs a Terminal restart after granting it. Quit Terminal fully (Cmd+Q) and reopen.
- **Gist download fails** — fall back to the WebFetch + Write approach in Step 2a.
