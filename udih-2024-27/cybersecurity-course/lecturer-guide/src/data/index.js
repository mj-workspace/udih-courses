import { intro } from './intro'
import { module1 } from './module1'
import { module2 } from './module2'
import { module3 } from './module3'
import { module4 } from './module4'
import { module5 } from './module5'
import { module6 } from './module6'
import { day1Summary } from './day1Summary'
import { day2Review } from './day2Review'
import { exam } from './exam'

const module5part1 = {
  id: 'module5-part1',
  title: 'Модул 5: Мрежова сигурност (Част 1)',
  duration: '30 мин',
  timeMarker: 'Ден 1, 16:20 – 16:50',
  note: 'Въведение в мрежовата сигурност — продължава в Ден 2.',
  sections: module5.sections.filter((s) => s.id === '5.1'),
}

const module5part2 = {
  id: 'module5-part2',
  title: 'Модул 5: Мрежова сигурност (Част 2)',
  duration: '90 мин',
  timeMarker: 'Ден 2, 09:40 – 11:10',
  note: 'Продължение — рискове за ВиК, мониторинг, мрежови атаки.',
  sections: module5.sections.filter((s) => s.id !== '5.1'),
}

function makeBreak(id, title, duration, timeMarker) {
  return {
    id,
    title,
    duration,
    timeMarker,
    sections: [{ id: `${id}-main`, title, talkingPoints: [], examples: [] }],
  }
}

export const modules = {
  intro,
  module1,
  module2,
  module3,
  module4,
  'module5-part1': module5part1,
  'day1-summary': day1Summary,
  'day2-review': day2Review,
  'module5-part2': module5part2,
  'module6-part1': {
    id: 'module6-part1',
    title: 'Модул 6: Политики, процедури и реакция при инциденти (Част 1)',
    duration: '60 мин',
    timeMarker: 'Ден 2, 11:35 – 12:35',
    note: 'Политики за защита на данни и мрежи, план за реакция при инциденти.',
    sections: module6.sections.filter((s) => s.id === '6.1' || s.id === '6.2'),
  },
  'module6-part2': {
    id: 'module6-part2',
    title: 'Модул 6: Политики, процедури и реакция при инциденти (Част 2)',
    duration: '60 мин',
    timeMarker: 'Ден 2, 13:35 – 14:35',
    note: 'Практически упражнения, обобщение на курса.',
    sections: module6.sections.filter((s) => s.id === '6.3' || s.id === '6.4'),
  },
  exam,
  'break-d1-1': makeBreak('break-d1-1', 'Почивка', '15 мин', 'Ден 1, 10:40 – 10:55'),
  'break-d1-lunch': makeBreak('break-d1-lunch', 'Обедна почивка', '60 мин', 'Ден 1, 12:35 – 13:35'),
  'break-d1-2': makeBreak('break-d1-2', 'Почивка', '15 мин', 'Ден 1, 14:35 – 14:50'),
  'break-d2-1': makeBreak('break-d2-1', 'Почивка', '15 мин', 'Ден 2, 11:20 – 11:35'),
  'break-d2-lunch': makeBreak('break-d2-lunch', 'Обедна почивка', '60 мин', 'Ден 2, 12:35 – 13:35'),
  'break-d2-2': makeBreak('break-d2-2', 'Почивка', '15 мин', 'Ден 2, 14:45 – 15:00'),
  'qa-m1': makeBreak('qa-m1', 'Въпроси и отговори', '10 мин', 'Ден 1, 10:30 – 10:40'),
  'qa-m2': makeBreak('qa-m2', 'Въпроси и отговори', '10 мин', 'Ден 1, 12:25 – 12:35'),
  'qa-m3': makeBreak('qa-m3', 'Въпроси и отговори', '10 мин', 'Ден 1, 14:25 – 14:35'),
  'qa-m4': makeBreak('qa-m4', 'Въпроси и отговори', '10 мин', 'Ден 1, 16:10 – 16:20'),
  'qa-m5': makeBreak('qa-m5', 'Въпроси и отговори', '10 мин', 'Ден 2, 11:10 – 11:20'),
  'qa-m6': makeBreak('qa-m6', 'Въпроси и отговори', '10 мин', 'Ден 2, 14:35 – 14:45'),
}
