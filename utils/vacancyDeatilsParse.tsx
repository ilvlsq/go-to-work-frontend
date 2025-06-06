export const parseJobDescription = (text: string) => {
  const rawSentences = text
    .split(/(?<=[.!?])\s+/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const elements: JSX.Element[] = [];

  const headingKeywords = [
    'Що важливо',
    'Ми пропонуємо',
    'Процес відбору',
    'Привіт!',
    'Зустрічай',
    'Обіймаємо',
    'Кого шукаємо',
    'Наші очікування',
    'Обов’язки',
    'Переваги',
    'Умови роботи',
    'Ми чекаємо на тебе',
    'Місія',
    'Команда',
    'Про компанію',
  ];

  const headingRegex = new RegExp(`^(${headingKeywords.join('|')})`, 'i');
  const listItemRegex = /^[-•●▪️*]?\s*(.+)/;

  let currentListItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentListItems.length > 0) {
      elements.push(
        <ul key={`ul-${keyPrefix}`} className="list-disc pl-5">
          {currentListItems.map((item, idx) => (
            <li key={`li-${keyPrefix}-${idx}`}>{item}</li>
          ))}
        </ul>,
      );
      currentListItems = [];
    }
  };

  rawSentences.forEach((sentence, i) => {
    if (headingRegex.test(sentence)) {
      flushList(i.toString());
      elements.push(
        <h3 key={`h3-${i}`} className="mt-6 font-bold">
          {sentence}
        </h3>,
      );
    } else if (/^[А-ЯІЇЄA-Z].{3,100}$/.test(sentence)) {
      currentListItems.push(sentence);
    } else {
      flushList(i.toString());
      elements.push(<p key={`p-${i}`}>{sentence}</p>);
    }
  });

  flushList('end');

  return <div className="prose max-w-none">{elements}</div>;
};
