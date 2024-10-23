import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

type PageLinksProps = {
  pageIndex: number;
  pageCount: number;
  onPageChanged: Function;
};

type Page = {
  pageIndex?: number;
  key: string;
  title?: number;
  active?: boolean;
  disabled?: boolean;
  spacer?: boolean;
};

function PageLinks({ pageIndex, pageCount, onPageChanged }: PageLinksProps) {
  const { t } = useTranslation('common');
  const pages: Page[] = [];

  const start = Math.max(pageIndex - 2, 0);
  const end = Math.min(pageIndex + 2, pageCount - 1);

  const addPage = (i: number) =>
    pages.push({
      pageIndex: i,
      key: i.toString(),
      title: i + 1,
      active: pageIndex === i
    });

  if (start > 0) {
    addPage(0);
    if (start > 1) pages.push({ spacer: true, key: 'spacer-1' });
  }

  for (let i = start; i <= end; i += 1) {
    addPage(i);
  }

  if (end <= pageCount - 2) {
    if (end <= pageCount - 3) pages.push({ spacer: true, key: 'spacer-2' });
    addPage(pageCount - 1);
  }

  const renderPrevButton = useCallback(
    () => (
      <li
        className={classNames('paginate_item page-item', {
          disabled: pageIndex <= 0
        })}
      >
        <button
          type="button"
          className="prev paginate_button previous page-link"
          onClick={() => onPageChanged(pageIndex - 1)}
          tabIndex={0}
        >
          <span aria-hidden="true">{t('buttons.previous')}</span>
        </button>
      </li>
    ),
    [onPageChanged, pageIndex, t]
  );

  const renderNextButton = useCallback(
    () => (
      <li
        className={classNames('paginate_item page-item', {
          disabled: pageIndex >= pageCount - 1
        })}
      >
        <button
          type="button"
          className="next paginate_button previous page-link"
          onClick={() => onPageChanged(pageIndex + 1)}
          tabIndex={0}
        >
          <span aria-hidden="true">{t('buttons.next')}</span>
        </button>
      </li>
    ),
    [onPageChanged, pageIndex, pageCount, t]
  );

  const links = pages.map((page) =>
    page.spacer ? (
      <li key={page.key} className="page-item disabled">
        <div className="page-link">
          <span>...</span>
        </div>
      </li>
    ) : (
      <li
        key={page.key}
        className={classNames('paginate_item page-item', {
          disabled: page.disabled === true,
          active: page.active === true
        })}
      >
        <button
          type="button"
          className="paginate_button page-link"
          onClick={() => {
            onPageChanged(page.pageIndex);
          }}
          tabIndex={0}
        >
          <span aria-hidden="true">{page.title}</span>
        </button>
      </li>
    )
  );

  return (
    <div className="d-flex justify-content-center justify-content-sm-end mt-1">
      {links.length > 1 && (
        <ul id="datatable_pagination" className="pagination datatable-custom-pagination">
          {renderPrevButton()}
          {links}
          {renderNextButton()}
        </ul>
      )}
    </div>
  );
}

export default PageLinks;
