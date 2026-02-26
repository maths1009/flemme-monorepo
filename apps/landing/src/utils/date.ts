import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

function formatDate(date: string | Date, format = 'D MMMM YYYY'): string {
  return dayjs(date).format(format);
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>?/gm, ' ');
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

export { calculateReadTime, formatDate };
