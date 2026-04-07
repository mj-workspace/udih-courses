# UDIH Курсове

Учебни материали и приложения за курсове по програмите на UDIH (University Digital Innovation Hub), организирани от Академия по национална и информационна сигурност.

## Портал

[**mj-workspace.github.io/udih-courses/**](https://mj-workspace.github.io/udih-courses/) — защитен с парола портал с достъп до всички курсове, учебни материали и Google Meet линкове.

## Програми

### UDIH 2024–2027

| Курс | Описание | Приложения |
|------|----------|------------|
| [Въведение в дигиталната грамотност](udih-2024-27/digital-fundamentals/) (Реф. № 001) | Хардуер, операционни системи, мрежи, отстраняване на проблеми (12 уч. часа) | — |
| [Киберсигурност и защита на данните](udih-2024-27/cybersecurity-course/) (Реф. № 011) | Фишинг, пароли, защита на данни, мрежова сигурност (12 уч. часа) | [Ръководство за лектора](https://mj-workspace.github.io/udih-courses/cybersecurity-lecturer-guide/) |

### UDIH 2027–2030

(предстои)

## Структура

```
udih-courses/
├── homepage/                        # Портал (React + StaticCrypt)
├── udih-2024-27/                    # Програма 2024–2027
│   ├── cybersecurity-course/        # Курс по киберсигурност + lecturer-guide app
│   └── digital-fundamentals/        # Въведение в дигиталната грамотност
└── udih-2027-30/                    # Програма 2027–2030 (предстои)
```

## Deployment

Auto-deploy на push to `main` чрез GitHub Actions → GitHub Pages.

| App | URL |
|-----|-----|
| Портал (homepage) | [/udih-courses/](https://mj-workspace.github.io/udih-courses/) |
| Ръководство за лектора — Киберсигурност | [/udih-courses/cybersecurity-lecturer-guide/](https://mj-workspace.github.io/udih-courses/cybersecurity-lecturer-guide/) |

**Tech stack:** React 19 + Vite 8 + Tailwind CSS 4, pnpm, StaticCrypt за защита на портала.
