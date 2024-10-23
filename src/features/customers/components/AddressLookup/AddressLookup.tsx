import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import SearchFilter from '~/features/tables/components/SearchFilter';
import AddressLookupQuery from './graphql/AddressLookupQuery.gql';
import {
  AddressLookupQuery as AddressLookupQueryType,
  AddressLookupQuery_vatSearch as CompanyType
} from './graphql/.generated/AddressLookupQuery';
import useOutsideAlerter from '~/features/shared/hooks/useOutsideAlerter';

type AddressLookupProps = {
  onSelect: (company: AddressLookupResult) => void;
};

export type AddressLookupResult = CompanyType;

export default function AddressLookup({ onSelect }: AddressLookupProps) {
  const resultRef = useRef(null);
  const [query, setQuery] = useState('');
  const [search, { error, data }] = useLazyQuery<AddressLookupQueryType>(AddressLookupQuery);
  const { t } = useTranslation('customers');

  const clearSearch = useCallback(() => {
    setQuery('');
  }, [setQuery]);

  useOutsideAlerter(resultRef, clearSearch);

  useEffect(() => {
    if (query.length >= 3) {
      search({ variables: { query } });
    }
  }, [search, query]);

  const itemSelectedHandler = useCallback(
    (company: CompanyType) => {
      setQuery('');
      onSelect(company);
    },
    [setQuery, onSelect]
  );

  const results = data?.vatSearch?.map((company) => (
    <li
      className="search-result"
      key={company.vatId}
      role="row"
      onKeyDown={() => itemSelectedHandler(company)}
      onClick={() => itemSelectedHandler(company)}
    >
      <div className="company-name">{company.name}</div>
      <div>
        <span className="me-1">{t('labels.addressLookup.vatId.dk')}:</span>
        {company.vatId}
      </div>
    </li>
  ));

  return (
    <div>
      <SearchFilter value={query} onChange={setQuery} placeholder={t('placeholders.addressLookup')} />
      {query && results && results.length > 0 && (
        <ul className="search-results" ref={resultRef}>
          {results}
        </ul>
      )}
      {query && results && results.length === 0 && (
        <div className="search-results no-results" ref={resultRef}>
          {t('messages.addressLookup.noResults')}
        </div>
      )}
      {error && <div className="alert alert-danger mt-2">{t('errors.addressLookup')}</div>}
      <style jsx>{`
        .search-results {
          margin-top: 10px;
          padding: 0;
          list-style: none;
          position: absolute;
          z-index: 10;
          background-color: white;
          border: 1px solid #dee2e6;
          border-radius: 3px;
          left: 25px;
          right: 25px;
          cursor: pointer;
        }
        .search-results.no-results {
          padding: 1rem;
          font-weight: bold;
          font-style: italic;
        }
        .search-results :global(.search-result) {
          padding: 0.5rem 1rem;
        }
        .search-results :global(.search-result):hover {
          background-color: #eee;
        }
        .search-results :global(.search-result) :global(.company-name) {
          font-weight: bold;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
