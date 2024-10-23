import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import Select from 'react-select';
import useUser from '~/contexts/User/useUser';

type PageSizeSelectProps = {
  pageSize: number;
  totalItems: number;
  onPageSizeChanged: Function;
};

function PageSizeSelect({ pageSize, totalItems, onPageSizeChanged }: PageSizeSelectProps) {
  const { isAdmin } = useUser();
  const { t } = useTranslation('common');

  const pageSizes = useMemo(() => {
    const items = [{ value: 10, label: '10' }];
    if (totalItems > 15) items.push({ value: 15, label: '15' });
    if (totalItems > 20) items.push({ value: 20, label: '20' });
    if (totalItems > 100 && isAdmin) items.push({ value: 100, label: `100` });
    return items;
  }, [totalItems, isAdmin]);

  const defaultValue =
    pageSize > totalItems ? pageSizes[pageSizes.length - 1] : pageSizes.find((x) => x.value === pageSize);

  return (
    <div className="dataTables_length text-end">
      {totalItems > 10 && (
        <label>
          {t('messages.show')}{' '}
          <Select
            options={pageSizes}
            className="page-select"
            classNamePrefix="react-select"
            defaultValue={defaultValue}
            menuPlacement="bottom"
            onChange={(item) => onPageSizeChanged(item?.value)}
          />{' '}
          {t('messages.entries')}
        </label>
      )}
      <style jsx global>{`
        div.page-select {
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

export default PageSizeSelect;
