import { useTranslation } from 'next-i18next';

type PageCountDisplayProps = {
  pageSize: number;
  totalItems: number;
  pageIndex: number;
};

function PageCountDisplay({ pageSize, totalItems, pageIndex }: PageCountDisplayProps) {
  const firstItemNumber = pageIndex * pageSize + 1;
  const lastItemNumber = Math.min(pageIndex * pageSize + pageSize, totalItems);

  const { t } = useTranslation('common');

  let text;

  if (totalItems === 0) {
    text = t('messages.noEntries');
  } else if (firstItemNumber === lastItemNumber && firstItemNumber === totalItems) {
    text = t('messages.showingEntries', { count: firstItemNumber });
  } else if (lastItemNumber === totalItems) {
    text = t('messages.showingEntriesTo', { from: firstItemNumber, to: totalItems });
  } else {
    text = t('messages.showingEntriesToOf', { from: firstItemNumber, to: lastItemNumber, of: totalItems });
  }

  return <div className="page-count-display">{text}</div>;
}

export default PageCountDisplay;
