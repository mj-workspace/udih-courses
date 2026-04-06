export const programs = [
  {
    id: 'udih-2024-27',
    label: 'Програма 2024–2027',
    courses: [
      {
        id: 'digital-literacy',
        title: 'Въведение в дигиталната грамотност (Реф. № 001)',
        description: null,
        status: 'upcoming',
        modules: [],
        resources: [],
      },
      {
        id: 'cybersecurity',
        title: 'Киберсигурност и защита на данните (Реф. № 011)',
        description:
          'Въвеждащ курс по киберсигурност за служители на ВиК дружество. Покрива фишинг, пароли, защита на данни, мрежова сигурност и реакция при инциденти.',
        duration: '12 учебни часа (2 дни)',
        audience: '25–30 технически специалисти',
        format: 'Онлайн (Google Meet)',
        level: 'Въвеждащо ниво',
        status: 'active',
        modules: [
          { id: 1, title: 'Въведение в киберсигурността', duration: '50 мин' },
          { id: 2, title: 'Фишинг, злонамерен софтуер и онлайн измами', duration: '80 мин' },
          { id: 3, title: 'Сигурност на пароли и автентикация', duration: '50 мін' },
          { id: 4, title: 'Защита на личната информация и данни', duration: '70 мін' },
          { id: 5, title: 'Мрежова сигурност и защита на инфраструктурата', duration: '90 мін' },
          { id: 6, title: 'Политики, процедури и реакция при инциденти', duration: '80 мін' },
        ],
        resources: [
          {
            label: 'Ръководство за лектора',
            url: '/udih-courses/cybersecurity/',
            type: 'app',
          },
        ],
      },
    ],
  },
  {
    id: 'udih-2027-30',
    label: 'Програма 2027–2030',
    courses: [],
  },
]
