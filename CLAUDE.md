# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Монорепо за UDIH (Университетска Дигитална Иновационна Хъб) курсове, организирани по програми.

**Организация:** Академия по национална и информационна сигурност

## Structure

```
udih-courses/
├── homepage/                        # Портал (списък с курсове, защитен със StaticCrypt)
├── udih-2024-27/                    # Програма 2024–2027
│   ├── cybersecurity-course/        # Курс по киберсигурност
│   └── digital-fundamentals/        # (предстои)
└── udih-2027-30/                    # Програма 2027–2030 (предстои)
```

## Working on a specific course

When working on a specific course, **always read the course-level CLAUDE.md first**:

- Cybersecurity: `udih-2024-27/cybersecurity-course/CLAUDE.md`

Each course has its own CLAUDE.md with course-specific context, structure, and constraints.

## Language

All content is in **Bulgarian**. Technical terms use English equivalents where standard.

**UDIH** is always written in English as **UDIH** (University Digital Innovation Hub). Never use the Bulgarian transliteration "UDIH" — UDIH is a proper term/brand name and must remain in Latin script everywhere (code, UI, docs, comments).

## Hosting & Deployment

**Monorepo** hosted at `mj-workspace/udih-courses` (public) on GitHub.

- **GitHub Pages:** auto-deploy on push to `main` via `.github/workflows/deploy.yml`
- **Custom domain:** https://udih.anis.bg/
- **URL scheme:** `/<course>/<app>/` (grouped by course)

**Currently deployed apps:**

| App | Course | URL |
|-----|--------|-----|
| homepage | (портал) | `/` |
| entry-exam | cybersecurity-course | `/cybersecurity/entry-exam/` |
| program | cybersecurity-course | `/cybersecurity/program/` |
| presentation | cybersecurity-course | `/cybersecurity/presentation/` |
| lecturer-guide | cybersecurity-course | `/cybersecurity/lecturer-guide/` |

### Adding a new deployed app

1. Add build step in `.github/workflows/deploy.yml` (follow existing pattern)
2. Add assemble step: `cp -r <build-output> _site/<short-name>/`
3. Set `base: '/<short-name>/'` in the app's `vite.config.js`
4. Update this table
