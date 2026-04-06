export const programs = [
  {
    id: 'udih-2024-27',
    label: 'Програма 2024–2027',
    courses: [
      {
        id: 'digital-literacy',
        title: 'Въведение в дигиталната грамотност (Реф. № 001)',
        description:
          'Курс по хардуер, операционни системи, мрежи, отстраняване на проблеми и основни ИТ операции.',
        duration: '12 учебни часа (2 дни)',
        format: 'Онлайн (Google Meet)',
        level: 'Въвеждащо ниво',
        status: 'active',
        meetLink: {
          url: 'https://udih.anis.bg/meet-digital-fundamentals',
          directUrl: 'https://meet.google.com/ufr-gurh-enq',
          dialIn: '+359 2 907 4373',
          pin: '417 904 002#',
        },
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
        meetLink: {
          url: 'https://udih.anis.bg/meet-cybersecurity',
          directUrl: 'https://meet.google.com/jbp-arjq-hee',
          dialIn: '+359 2 907 4778',
          pin: '509 298 747#',
        },
        modules: [
          { id: 1, title: 'Въведение в киберсигурността', duration: '50 мин' },
          { id: 2, title: 'Фишинг, злонамерен софтуер и онлайн измами', duration: '80 мин' },
          { id: 3, title: 'Сигурност на пароли и автентикация', duration: '50 мин' },
          { id: 4, title: 'Защита на личната информация и данни', duration: '70 мин' },
          { id: 5, title: 'Мрежова сигурност и защита на инфраструктурата', duration: '90 мин' },
          { id: 6, title: 'Политики, процедури и реакция при инциденти', duration: '80 мин' },
        ],
        resources: [
          {
            label: 'Ръководство за лектора',
            url: '/udih-courses/cybersecurity/',
            type: 'app',
          },
          {
            label: 'Входен изпит',
            url: '/udih-courses/cybersecurity/entry-exam.html',
            type: 'document',
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
