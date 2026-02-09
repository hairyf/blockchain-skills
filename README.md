# Hairy's Skills

> Forked from [antfu/skills](https://github.com/antfu/skills)

A curated collection of [Agent Skills](https://agentskills.io/home) based on [Anthony Fu's skills collection](https://github.com/antfu/skills), extended with additional skills reflecting [Hairyf](https://github.com/hairyf)'s preferences, experience, and best practices for web development.

> [!IMPORTANT]
> This is a proof-of-concept project for generating agent skills from source documentation and keeping them in sync.
> I haven't fully tested how well the skills perform in practice, so feedback and contributions are greatly welcome.

## Installation

```bash
pnpx skills add hairyf/skills
```

or to install all of them globally:

```bash
pnpx skills add hairyf/skills --all -g
```

Learn more about the CLI usage at [skills](https://github.com/vercel-labs/skills).

## Skills

This collection extends Anthony Fu's original collection with additional skills from Hairyf. It includes skills from different sources with different scopes, covering both Vue/Vite/Nuxt ecosystem and React/Next.js ecosystem.

### Hand-maintained Skills

> Opinionated

Manually maintained skills reflecting personal preferences and best practices.

| Skill | Description | Maintainer |
|-------|-------------|------------|
| [hairy](skills/hairy) | Hairyf's preferences and best practices for web development (TypeScript, ESLint, pnpm, Vitest, etc.) | Hairyf |
| [antfu](skills/antfu) | Anthony Fu's preferences and best practices for app/library projects (eslint, pnpm, vitest, vue, etc.) | Anthony Fu |

### Skills Generated from Official Documentation

> Unopinionated but with tilted focus (e.g. TypeScript, ESM, Composition API, and other modern stacks)

Generated from official documentation and fine-tuned for agent usage.

#### Any Group of Projects

| Skill | Description | Source |
|-------|-------------|--------|

### Vendored Skills

Synced from external repositories that maintain their own skills.

#### Official Skills

| Skill | Description | Source |
|-------|-------------|--------|

#### Community Skills

| Skill | Description | Source |
|-------|-------------|--------|

## FAQ

### What Makes This Collection Different?

This collection is based on [Anthony Fu's skills collection](https://github.com/antfu/skills) and extends it with:

- **Additional Skills**: More skills covering React/Next.js ecosystem, animation libraries, backend frameworks, desktop apps (Electron, Tauri), API specifications (OpenAPI 2.0/3.2), and build tools (unplugin)
- **Architecture & Starters**: Skills for scaffolding Nuxt/Vue/TS libraries/CLI/VSCode/WebExtension projects (arch-nuxt, arch-tsdown, arch-unplugin, arch-vscode, arch-webext-vue, etc.)
- **Hairyf's Projects**: Skills for Hairyf's own open-source projects (hairylib, valtio-define, overlastic)
- **Personal Preferences**: Hairyf's own opinionated preferences and best practices

The key difference from the original collection is that it uses git submodules to directly reference source documentation. This provides more reliable context and allows the skills to stay up-to-date with upstream changes over time.

The project is also designed to be flexible - you can use it as a template to generate your own skills collection.

### Skills vs llms.txt vs AGENTS.md

To me, the value of skills lies in being **shareable** and **on-demand**.

Being shareable makes prompts easier to manage and reuse across projects. Being on-demand means skills can be pulled in as needed, scaling far beyond what any agent's context window could fit at once.

You might hear people say "AGENTS.md outperforms skills". I think that's true — AGENTS.md loads everything upfront, so agents always respect it, whereas skills can have false negatives where agents don't pull them in when you'd expect. That said, I see this more as a gap in tooling and integration that will improve over time. Skills are really just a standardized format for agents to consume—plain markdown files at the end of the day. Think of them as a knowledge base for agents. If you want certain skills to always apply, you can reference them directly in your AGENTS.md.

## Generate Your Own Skills

Fork this project to create your own customized skill collection.

1. Fork or clone this repository
2. Install dependencies: `pnpm install`
3. Update `meta.ts` with your own projects and skill sources
4. Run `nr start cleanup` to remove existing submodules and skills
5. Run `nr start init` to clone the submodules
6. Run `nr start sync` to sync vendored skills
7. Ask your agent to "generate skills for \<project\> anthor \<author\>, use <language>." (recommended one at a time to manage token usage)

**Ongoing maintenance:**

- **More, until all** — When you say "more" (or ask for more coverage) for an existing skill, the agent compares current `references/` with the source docs, identifies missing modules, adds new reference files, and updates `SKILL.md` (and `GENERATION.md` for Type 1).
- **Update** — When you say "update" (or ask to refresh from source) for a skill, the agent runs `git diff` against the SHA in `GENERATION.md` / `SYNC.md`, then updates only the affected references, `SKILL.md`, and tracking metadata.

See [AGENTS.md](AGENTS.md) for detailed generation guidelines.

## Credits

- Original project: [antfu/skills](https://github.com/antfu/skills) by [Anthony Fu](https://github.com/antfu)
- Extended by: [Hairyf](https://github.com/hairyf)

## License

Skills and the scripts in this repository are [MIT](LICENSE.md) licensed.

Vendored skills from external repositories retain their original licenses - see each skill directory for details.
