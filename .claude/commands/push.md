---
description: Stage, commit, and push your prototype changes in one step — and share the live URL
allowed-tools: Bash, Read
---

You are saving and publishing the user's prototype work in one step. The user is likely a non-engineer — keep your responses in plain English and avoid terminal jargon.

## Step 1: Check What's Changed

Run `git status` to see what files have been modified, added, or deleted.

If there are no changes, tell the user there's nothing to save and stop.

## Step 2: Generate a Commit Message

Look at the changes (`git diff --stat`, and peek at the actual diff if needed) and write a short, plain-English commit message describing what changed. Keep it under 70 characters. Examples:

- "Add new claims dashboard mockup"
- "Update facility search filter UI"
- "Fix typo in welcome banner"

Don't ask the user for the message — write it yourself based on the diff. They can correct after the fact if needed.

## Step 3: Stage, Commit, Push

Run in sequence:

1. `git add .`
2. `git commit -m "<your message>"`
3. `git push origin <current-branch-name>`

If the user is currently on the `main` branch, do NOT push directly to main. Stop and tell them: "You're on the main branch — let's create a feature branch first so we don't overwrite the template. What should we call it?" Then create the branch and continue.

## Step 4: Confirm + Share the Live URL

Once the push succeeds:

1. Tell the user the push was successful and what commit message you used.
2. Share the auto-deployed live URL for the prototype (the prototype repo has auto-deployment wired up — every push generates a URL automatically).
3. If you can detect the URL from the deploy status, share it directly. Otherwise tell them to wait ~30 seconds and check the latest deploy in their GitHub Actions tab.

## If Something Goes Wrong

Translate any git error into plain English. Don't dump the raw error. Common issues:

- **Merge conflict** — explain that the remote has changes that conflict with theirs, and offer to walk through resolving it.
- **Authentication failure** — tell them their GitHub auth needs refreshing and give them the exact command to fix it.
- **Nothing to commit** — tell them no changes were detected.

## Rules

- Never use `--force` or `--no-verify`.
- Never push directly to `main`.
- Always show what was committed before declaring success.
- If the user looks lost, offer to explain what just happened in plain English.
