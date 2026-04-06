export const sidebarGroups = [
  {
    label: null,
    items: [
      { id: 'course-plan', shortTitle: 'План на курса', type: 'utility' },
      { id: 'entry-exam', shortTitle: 'Входен изпит', type: 'utility' },
    ],
  },
  {
    label: 'Ден 1',
    items: [
      { id: 'intro', shortTitle: 'Въведение', type: 'utility', duration: '10 мин' },
      { id: 'module1', shortTitle: '1. Въведение в киберсигурността', type: 'module', duration: '50 мин' },
      { id: 'module2', shortTitle: '2. Фишинг, малуер и онлайн измами', type: 'module', duration: '90 мин' },
      { id: 'module3', shortTitle: '3. Пароли и автентикация', type: 'module', duration: '50 мин' },
      { id: 'module4', shortTitle: '4. Защита на данни', type: 'module', duration: '80 мин' },
      { id: 'module5-part1', shortTitle: '5. Мрежова сигурност (Част 1)', type: 'module', duration: '30 мин' },
      { id: 'day1-summary', shortTitle: 'Обобщение на Ден 1', type: 'utility', duration: '10 мин' },
    ],
  },
  {
    label: 'Ден 2',
    items: [
      { id: 'day2-review', shortTitle: 'Преговор на Ден 1', type: 'utility', duration: '10 мин' },
      { id: 'module5-part2', shortTitle: '5. Мрежова сигурност (Част 2)', type: 'module', duration: '90 мин' },
      { id: 'module6', shortTitle: '6. Политики и реакция при инциденти', type: 'module', duration: '120 мин' },
      { id: 'exam', shortTitle: 'Финален изпит', type: 'utility', duration: '120 мин' },
    ],
  },
]

export const navigationOrder = [
  'course-plan-info', 'course-plan-time', 'course-plan-day1', 'course-plan-day2',
  'entry-exam-main',
  'intro-main',
  '1.1', '1.2', '1.3', '1.4',
  '2.1', '2.2', '2.3', '2.4',
  '3.1', '3.2', '3.3', '3.4',
  '4.1', '4.2', '4.3', '4.4', '4.5',
  '5.1',
  'day1-summary-main',
  'day2-review-main',
  '5.2', '5.3', '5.4',
  '6.1', '6.2', '6.3', '6.4',
  'exam-main',
]

export const sectionToModule = {
  'course-plan-info': 'course-plan', 'course-plan-time': 'course-plan', 'course-plan-day1': 'course-plan', 'course-plan-day2': 'course-plan',
  'entry-exam-main': 'entry-exam',
  'intro-main': 'intro',
  '1.1': 'module1', '1.2': 'module1', '1.3': 'module1', '1.4': 'module1',
  '2.1': 'module2', '2.2': 'module2', '2.3': 'module2', '2.4': 'module2',
  '3.1': 'module3', '3.2': 'module3', '3.3': 'module3', '3.4': 'module3',
  '4.1': 'module4', '4.2': 'module4', '4.3': 'module4', '4.4': 'module4', '4.5': 'module4',
  '5.1': 'module5-part1',
  'day1-summary-main': 'day1-summary',
  'day2-review-main': 'day2-review',
  '5.2': 'module5-part2', '5.3': 'module5-part2', '5.4': 'module5-part2',
  '6.1': 'module6', '6.2': 'module6', '6.3': 'module6', '6.4': 'module6',
  'exam-main': 'exam',
}
