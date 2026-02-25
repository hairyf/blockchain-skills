# Skills Generator

Generate [Agent Skills](https://agentskills.io/home) from project documentation.

PLEASE STRICTLY FOLLOW THE BEST PRACTICES FOR SKILL: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

- Session must begin with `/bonfire start` before any other work.

- Focus on agents capabilities and practical usage patterns.
- Ignore user-facing guides, introductions, get-started, install guides, etc.
- Ignore content that LLM agents already confident about in their training data.
- Make the skill as concise as possible, avoid creating too many references.

## Skill Source Types

There are two types of skill sources. The project lists are defined in `meta.ts`:

### Type 1: Generated Skills (`sources/`)

For OSS projects **without existing skills**. We clone the repo as a submodule and generate skills from their documentation.

- **Projects:** Vue, Nuxt, Vite, UnoCSS
- **Workflow:** Read docs → Understand → Generate skills
- **Source:** `sources/{project}/docs/`

### Type 2: Synced Skills (`vendor/`)

For projects that **already maintain their own skills**. We clone their repo as a submodule and sync specified skills to ours.

- **Projects:** Slidev, VueUse
- **Workflow:** Pull updates → Copy specified skills (with optional renaming)
- **Source:** `vendor/{project}/skills/{skill-name}/`
- **Config:** Each vendor specifies which skills to sync and their output names in `meta.ts`

### Type 3: Hand-written Skills

For skills that are written by Anthony Fu with his preferences, experience, tastes and best practices.

You don't need to do anything about them unless being asked.

### Manual Initialization (no GitHub)

Skills generated from docs that have no GitHub repo; source is `.bonfire/cache/<name>/`, and names are listed in `meta.ts` **`manual`** array. **Full workflow and rules:** [.bonfire/specs/manual-skill-initialization.md](.bonfire/specs/manual-skill-initialization.md).

## Repository Structure

```
.
├── meta.ts                     # Project metadata (repos & URLs, submodules, manual)
├── instructions/               # Instructions for generating skills
│   └── {project}.md            # Instructions for generating skills for {project}
│
├── .bonfire/
│   └── cache/                  # Fetched docs for manual-initialized skills (no GitHub)
│       └── {name}/             # Same name as skills/{name}, kebab-case
│
├── sources/                    # Type 1: OSS repos (generate from docs)
│   └── {project}/
│       └── docs/               # Read documentation from here
│
├── vendor/                     # Type 2: Projects with existing skills (sync only)
│   └── {project}/
│       └── skills/
│           └── {skill-name}/   # Individual skills to sync
│
└── skills/                     # Output directory (generated or synced)
    └── {output-name}/
        ├── SKILL.md           # Index of all skills
        ├── GENERATION.md       # Tracking metadata (for generated skills)
        ├── SYNC.md             # Tracking metadata (for synced skills)
        ├── references/
        │   └── *.md            # Individual skill files
        ├── scripts/            # Optional: executable scripts
        └── assets/             # Optional: templates, resources

```

**Important:** For Type 1 (generated), the `skills/{project}/` name must match `sources/{project}/`. For Type 2 (synced), the output name is configured in `meta.ts` and may differ from the source skill name.

## Workflows

### For Generated Skills (Type 1)

#### Adding a New Project

1. **Add entry to `meta.ts`** in the `submodules` object:
   ```ts
   export const submodules = {
     // ... existing entries
     'new-project': 'https://github.com/org/repo',
   }
   ```

2. **Run sync script** to clone the submodule:
   ```bash
   nr start init -y
   ```
   This will clone the repository to `sources/{project}/`

3. **Follow the generation guide** below to create the skills

#### General Instructions for Generation

- Focus on agents capabilities and practical usage patterns. For user-facing guides, introductions, get-started, or common knowledge that LLM agents already know, you can skip those content.
- Categorize each references into `core`, `features`, `best-practices`, `advanced`, etc categories, and prefix the reference file name with the category. For each feature field, feel free to create more categories if needed to better organize the content.

#### Creating New Skills

- **Read** source docs from `sources/{project}/docs/`
- **Read** the instructions in `instructions/{project}.md` for specific generation instructions if exists
- **Understand** the documentation thoroughly
- **Create** skill files in `skills/{project}/references/`
- **Create** `SKILL.md` index listing all skills
- **Create** `GENERATION.md` with the source git SHA

#### Parallel Mode (Multiple Sessions)

Multiple sessions can generate different skills at the same time.

- **One project per session**: Each session is assigned exactly one `{project}` (e.g. "this session: viem"). Do not pick a project already listed as in progress in `.bonfire/index.md`.
- **No file overlap**: Each project writes only to `skills/{project}/` and reads only from `sources/{project}/` or `vendor/{project}/`, so there is no file conflict between sessions.
- **Shared context**: The only shared file is `.bonfire/index.md`. When ending a session, update **only** the row for your assigned project (☐ → ☑). Do not overwrite or restructure the rest of the file.
- **In progress**: When starting in parallel mode, note your assigned project under "In progress" in `.bonfire/index.md` (e.g. `viem (this session)`). When ending, mark that project complete and remove it from "In progress".

#### Updating Generated Skills

1. **Check** git diff since the SHA recorded in `GENERATION.md`:
   ```bash
   cd sources/{project}
   git diff {old-sha}..HEAD -- docs/
   ```
2. **Update** affected skill files based on changes
3. **Update** `SKILL.md` with the new version of the tool/project and skills table.
4. **Update** `GENERATION.md` with new SHA

### For Synced Skills (Type 2)

#### Initial Sync

1. **Copy** specified skills from `vendor/{project}/skills/{skill-name}/` to `skills/{output-name}/`
2. **Create** `SYNC.md` with the vendor git SHA

#### Updating Synced Skills

1. **Check** git diff since the SHA recorded in `SYNC.md`:
   ```bash
   cd vendor/{project}
   git diff {old-sha}..HEAD -- skills/{skill-name}/
   ```
2. **Copy** changed files from `vendor/{project}/skills/{skill-name}/` to `skills/{output-name}/`
3. **Update** `SYNC.md` with new SHA

**Note:** Do NOT modify synced skills manually. Changes should be contributed upstream to the vendor project.

### When User Says "More"

When the user says "more" (or expresses intent to get more coverage), the agent MUST:

1. **Review** the current skill set — compare `skills/{output-name}/references/` and `SKILL.md` against the source (e.g. `sources/{project}/docs` for Type 1, or the project’s documented surface).
2. **Identify** missing modules — topics that exist in the source or are commonly needed for the project but are not yet covered by any reference file.
3. **Supplement** — create new reference files in `skills/{output-name}/references/` for each missing topic, following the Writing Guidelines and naming (e.g. `core-*`, `features-*`, `best-practices-*`).
4. **Update** `SKILL.md` — add the new references to the appropriate tables and sections.
5. For Type 1 (generated) skills, **update** `GENERATION.md` if the source was re-read (e.g. note or refresh SHA as appropriate).

Do not skip this review when the user asks for "more"; always check for gaps and add missing modules to the skills.

### When User Says "Update"

When the user says "update" (or expresses intent to refresh skills from source), the agent MUST:

1. **Determine** the skill type and target — from `skills/` and `meta.ts`, identify whether it is Type 1 (generated), Type 2 (synced), or **manual** (listed in `meta.ts` `manual` array), and which project/output name.
2. **For Type 1 (Generated):** Follow **Updating Generated Skills** — read `GENERATION.md` for the recorded SHA, run `git diff {old-sha}..HEAD -- docs/` in `sources/{project}/`, then update affected reference files, `SKILL.md`, and `GENERATION.md` with the new SHA.
3. **For Type 2 (Synced):** Follow **Updating Synced Skills** — read `SYNC.md` for the recorded SHA, run `git diff {old-sha}..HEAD -- skills/{skill-name}/` in `vendor/{project}/`, then copy changed files to `skills/{output-name}/` and update `SYNC.md` with the new SHA.
4. **For manual:** Re-fetch the **full doc set** from the original site into `.bonfire/cache/<name>/` (same discovery + batch-fetch as init), then update affected reference files, `SKILL.md`, and `GENERATION.md` (record new fetch date/source in `GENERATION.md`).

Always perform the diff against the recorded SHA (or re-fetch for manual) and update only what changed; then refresh the tracking metadata.

### When User Says "Initialize &lt;name&gt;"（初始化某个地址）

When the user says **「初始化某个地址」** or **「初始化 &lt;name&gt;」** (doc has no GitHub URL), follow the workflow in [.bonfire/specs/manual-skill-initialization.md](.bonfire/specs/manual-skill-initialization.md).

## File Formats

### `SKILL.md`

Index file listing all skills with brief descriptions. Name should be in `kebab-case`.

The version should be the date of the last sync.

Also record the version of the tool/project when the skills were generated.

```markdown
---
name: {name}
description: {description}
metadata:
  author: Hairy
  version: "2026.1.1"
  source: Generated from {source-url}, scripts located at https://github.com/antfu/skills
---

> The skill is based on {project} v{version}, generated at {date}.

// Some concise summary/context/introduction of the project

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Markdown Syntax | Slide separators, frontmatter, notes, code blocks | [core-syntax](references/core-syntax.md) |
| Animations | v-click, v-clicks, motion, transitions | [core-animations](references/core-animations.md) |
| Headmatter | Deck-wide configuration options | [core-headmatter](references/core-headmatter.md) |

## Features

### Feature a

| Topic | Description | Reference |
|-------|-------------|-----------|
| Feature A Editor | Description of feature a | [feature-a](references/feature-a-foo.md) |
| Feature A Preview | Description of feature b | [feature-b](references/feature-a-bar.md) |

### Feature b

| Topic | Description | Reference |
|-------|-------------|-----------|
| Feature B | Description of feature b | [feature-b](references/feature-b-bar.md) |

// ...
```

### `GENERATION.md`

Tracking metadata for generated skills (Type 1):

```markdown
# Generation Info

- **Source:** `sources/{project}`
- **Git SHA:** `abc123def456...`
- **Generated:** 2024-01-15
```

### `SYNC.md`

Tracking metadata for synced skills (Type 2):

```markdown
# Sync Info

- **Source:** `vendor/{project}/skills/{skill-name}`
- **Git SHA:** `abc123def456...`
- **Synced:** 2024-01-15
```

### `references/*.md`

Individual skill files. One concept per file.

At the end of the file, include the reference links to the source documentation.

```markdown
---
name: {name}
description: {description}
---

# {Concept Name}

Brief description of what this skill covers.

## Usage

Code examples and practical patterns.

## Key Points

- Important detail 1
- Important detail 2

<!--
Source references:
- {source-url}
- {source-url}
- {source-url}
-->
```

### assets/

Contains static resources:

- Templates (document templates, configuration templates)
- Images (diagrams, examples)
- Data files (lookup tables, schemas)

## Writing Guidelines

When generating skills (Type 1 only):

1. **Rewrite for agents** - Don't copy docs verbatim; synthesize for LLM consumption
2. **Be practical** - Focus on usage patterns and code examples
3. **Be concise** - Remove fluff, keep essential information
4. **One concept per file** - Split large topics into separate skill files
5. **Include code** - Always provide working code examples
6. **Explain why** - Not just how to use, but when and why

## Supported Projects

See `meta.ts` for the canonical list of projects and their repository URLs.
