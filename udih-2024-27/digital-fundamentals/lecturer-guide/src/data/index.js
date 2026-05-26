import { intro } from './intro'
import { module1 } from './module1'
import { module2 } from './module2'
import { module3 } from './module3'
import { module4 } from './module4'
import { module5 } from './module5'
import { module6 } from './module6'
import { module7 } from './module7'
import { day1Summary } from './day1Summary'
import { day2Review } from './day2Review'
import { exam } from './exam'

const M6_PART1_IDS = new Set(['6.1', '6.2', '6.3', '6.4'])
const M7_PART1_IDS = new Set(['7.1', '7.2', '7.3', '7.4', '7.5', '7.6'])

const module6part1 = {
  id: 'module6-part1',
  title: 'Модул 6: Социални мрежи (Част 1 — Въведение)',
  duration: '30 мин',
  timeMarker: 'Ден 1, 16:20 – 16:50',
  note: 'Въведение в социалните мрежи — продължава в Ден 2.',
  sections: module6.sections.filter((s) => M6_PART1_IDS.has(s.id)),
}

const module6part2 = {
  id: 'module6-part2',
  title: 'Модул 6: Социални мрежи (Част 2 — Задълбочаване и сигурност)',
  duration: '90 мин',
  timeMarker: 'Ден 2, 09:40 – 11:10',
  note: 'Продължение — поверителност, сигурност, дигитална етика.',
  sections: module6.sections.filter((s) => !M6_PART1_IDS.has(s.id)),
}

const module7part1 = {
  id: 'module7-part1',
  title: 'Модул 7: Изкуствен интелект (Част 1 — Въведение)',
  duration: '60 мин',
  timeMarker: 'Ден 2, 11:35 – 12:35',
  note: 'Въведение, ChatGPT, Claude — основи на промптването.',
  sections: module7.sections.filter((s) => M7_PART1_IDS.has(s.id)),
}

const module7part2 = {
  id: 'module7-part2',
  title: 'Модул 7: Изкуствен интелект (Част 2 — Приложения и отговорна работа)',
  duration: '60 мин',
  timeMarker: 'Ден 2, 13:35 – 14:35',
  note: 'Практически приложения за ВиК, ограничения, проверка и сигурност при AI.',
  sections: module7.sections.filter((s) => !M7_PART1_IDS.has(s.id)),
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
  module5,
  'module6-part1': module6part1,
  'day1-summary': day1Summary,
  'day2-review': day2Review,
  'module6-part2': module6part2,
  'module7-part1': module7part1,
  'module7-part2': module7part2,
  exam,
  'break-d1-1': makeBreak('break-d1-1', 'Почивка', '15 мин', 'Ден 1, 10:40 – 10:55'),
  'break-d1-lunch': makeBreak('break-d1-lunch', 'Обедна почивка', '60 мин', 'Ден 1, 12:05 – 13:05'),
  'break-d1-2': makeBreak('break-d1-2', 'Почивка', '15 мин', 'Ден 1, 14:05 – 14:20'),
  'break-d1-3': makeBreak('break-d1-3', 'Почивка', '15 мин', 'Ден 1, 15:25 – 15:40'),
  'break-d2-1': makeBreak('break-d2-1', 'Почивка', '15 мин', 'Ден 2, 11:20 – 11:35'),
  'break-d2-lunch': makeBreak('break-d2-lunch', 'Обедна почивка', '60 мин', 'Ден 2, 12:35 – 13:35'),
  'break-d2-2': makeBreak('break-d2-2', 'Почивка', '15 мин', 'Ден 2, 14:45 – 15:00'),
  'qa-m1': makeBreak('qa-m1', 'Въпроси и отговори', '10 мин', 'Ден 1, 10:30 – 10:40'),
  'qa-m2': makeBreak('qa-m2', 'Въпроси и отговори', '10 мин', 'Ден 1, 11:55 – 12:05'),
  'qa-m3': makeBreak('qa-m3', 'Въпроси и отговори', '10 мин', 'Ден 1, 13:55 – 14:05'),
  'qa-m4': makeBreak('qa-m4', 'Въпроси и отговори', '10 мин', 'Ден 1, 15:15 – 15:25'),
  'qa-m6': makeBreak('qa-m6', 'Въпроси и отговори', '10 мин', 'Ден 2, 11:10 – 11:20'),
  'qa-m7': makeBreak('qa-m7', 'Въпроси и отговори', '10 мин', 'Ден 2, 14:35 – 14:45'),
}
