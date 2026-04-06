import { coursePlan } from './coursePlan'
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
import { entryExam } from './entryExam'

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

export const modules = {
  'course-plan': coursePlan,
  'entry-exam': entryExam,
  intro,
  module1,
  module2,
  module3,
  module4,
  'module5-part1': module5part1,
  'day1-summary': day1Summary,
  'day2-review': day2Review,
  'module5-part2': module5part2,
  module6,
  exam,
}
