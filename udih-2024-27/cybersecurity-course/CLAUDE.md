# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** Read [`PROJECT_GUIDE.md`](PROJECT_GUIDE.md) at the start of every session. It contains the full project context — course structure, React app architecture, data model, how to add content, and current status.

## Project Overview

This is a **content repository** for a cybersecurity course ("Курс по киберсигурност и защита на данните"), not a software project. It contains course materials being developed for delivery to employees of a water utility company (ВиК дружество).

**Organizing body:** Академия по национална и информационна сигурност
**Format:** Online (Google Meet), 12 teaching hours across 2 days
**Audience:** 25–30 technical staff (software engineers, IT specialists, sysadmins) — high computer literacy, introductory cybersecurity level
**Level:** Introductory (CompTIA Network+/Security+ beginner level)

## Language

All content is in **Bulgarian**. Technical terms use their English equivalents where standard (e.g., "phishing", "ransomware", "firewall", "CIA Triad"). Follow this bilingual convention when generating or editing content.

## Course Structure — 6 Modules

| Module  | Topic                                          | Duration |
| ------- | ---------------------------------------------- | -------: |
| Модул 1 | Въведение в киберсигурността                   |   50 min |
| Модул 2 | Фишинг, злонамерен софтуер и онлайн измами     |   80 min |
| Модул 3 | Сигурност на пароли и автентикация             |   50 min |
| Модул 4 | Защита на личната информация и данни           |   70 min |
| Модул 5 | Мрежова сигурност и защита на инфраструктурата |   90 min |
| Модул 6 | Политики, процедури и реакция при инциденти    |   80 min |

**Teaching:** 420 min (7h) | **Final exam:** 120 min (2h)

## Key Constraints

- **SCADA/ICS is explicitly excluded** — separate course, not our scope
- Water utility (ВиК) specifics are covered at introductory/general level only
- The exam is for a state-mandated training — 24 questions, 4 answer options with 1 correct, medium to hard difficulty
- Practical exercises/demos are desirable but not mandatory
- The lecturer's guide follows a consistent format per section: **Ключови тези** (what to say), **Примери** (real-world examples), **ПРЕХОД →** (transition notes)
