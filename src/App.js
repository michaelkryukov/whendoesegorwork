import 'react-calendar/dist/Calendar.css';
import './App.css';

import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';

const FIRST_WORKING_DAY_AFTER_DAYS_OFF = new Date(Date.parse('2023-08-27'));
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

function doesEgorWork(date) {
  const delta = date - FIRST_WORKING_DAY_AFTER_DAYS_OFF;
  const daysDelta = delta / MILLISECONDS_IN_DAY;
  const pairsPassed = Math.floor(daysDelta / 2);
  return pairsPassed % 2 === 0;
}

function getThisMonday() {
  const now = new Date();
  const nowUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  if (nowUtc.getUTCDay() === 0) {
    return new Date(nowUtc.valueOf() - MILLISECONDS_IN_DAY * 6);
  }
  return new Date(nowUtc.valueOf() + MILLISECONDS_IN_DAY * (1 - nowUtc.getUTCDay()));
}

function getNextMonday() {
  const thisMonday = getThisMonday();
  return new Date(thisMonday.valueOf() + MILLISECONDS_IN_DAY * 7);
}

function getNextDayAfter(startingDate, targetDay) {
  return new Date(startingDate.valueOf() + MILLISECONDS_IN_DAY * ((targetDay + (7 - startingDate.getUTCDay())) % 7));
}

function getAnswer(...values) {
  let result = values[0];

  for (const value of values.slice(1)) {
    if (result !== value) {
      return 'Partially';
    }
  }

  return result ? 'Yes' : 'No';
}

function getQuestionsAndAnswers() {
  const now = new Date();
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const tommorow = new Date(today.valueOf() + MILLISECONDS_IN_DAY);

  const thisMonday = getThisMonday();
  const thisSaturday = getNextDayAfter(thisMonday, 6);
  const thisSunday = getNextDayAfter(thisMonday, 0);

  const nextMonday = getNextMonday();
  const nextSaturday = getNextDayAfter(nextMonday, 6);
  const nextSunday = getNextDayAfter(nextMonday, 0);

  return [
    {
      text: 'Does Egor work today?',
      answer: getAnswer(doesEgorWork(today)),
    },
    {
      text: 'Does Egor work tommorow?',
      answer: getAnswer(doesEgorWork(tommorow)),
    },
    {
      text: 'Does Egor work this weekend?',
      answer: getAnswer(doesEgorWork(thisSaturday), doesEgorWork(thisSunday)),
    },
    {
      text: 'Does Egor work this saturday?',
      answer: getAnswer(doesEgorWork(thisSaturday)),
    },
    {
      text: 'Does Egor work this sunday?',
      answer: getAnswer(doesEgorWork(thisSunday)),
    },
    {
      text: 'Does Egor work next weekend?',
      answer: getAnswer(doesEgorWork(nextSaturday), doesEgorWork(nextSunday)),
    },
    {
      text: 'Does Egor work next saturday?',
      answer: getAnswer(doesEgorWork(nextSaturday)),
    },
    {
      text: 'Does Egor work next sunday?',
      answer: getAnswer(doesEgorWork(nextSunday)),
    },
  ];
}

function answerToColorClass(answer) {
  switch (answer) {
    case 'Yes':
      return 'negative';
    case 'No':
      return 'positive';
    default:
      return 'unsure';
  }
}

function Question({ text, answer }) {
  const answerColorClass = answerToColorClass(answer);
  const { t } = useTranslation();

  return (
    <div className='question-wrapper'>
      <div className={`question ${answerColorClass}`}>{t(text)}</div>
      <div className={`answer ${answerColorClass}`}>{t(answer)}</div>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <div className='App-body'>
        <div className='content-wrapper'>
          <div>
            {getQuestionsAndAnswers().map((question) => {
              return <Question key={question.text} {...question} />;
            })}
          </div>
          <div className='calendar'>
            <Calendar
              value={null}
              tileClassName={({ date }) => {
                const properDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
                return doesEgorWork(properDate) ? 'calendar-tile-working' : 'calendar-tile-day-off';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
