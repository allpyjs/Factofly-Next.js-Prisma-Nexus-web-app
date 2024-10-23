import formatDistance from 'date-fns/formatDistance';
import da from 'date-fns/locale/da';
import enGB from 'date-fns/locale/en-GB';
import languages from '~/constants/languages';

export default function formatDateDistance(date: Date, language: string) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: language === languages.DA ? da : enGB
  });
}
