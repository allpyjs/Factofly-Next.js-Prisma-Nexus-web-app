import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

const debounceTimeout = 300;

type SearchFilterProps = {
  value: string;
  className?: string;
  onChange: (value: string) => void;
  onClick?: (value: string) => void;
  placeholder?: string;
};

function SearchFilter({
  value,
  onChange,
  className = undefined,
  onClick = undefined,
  placeholder = undefined
}: SearchFilterProps) {
  const [internalValue, setInternalValue] = useState(value);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // make sure that we can clear the value if needed.
  useEffect(() => {
    if (value === '') setInternalValue(value);
  }, [value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChangeHandler = useCallback(debounce(onChangeHandler, debounceTimeout), []);

  const onInternalChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      debouncedOnChangeHandler(e);
    },
    [debouncedOnChangeHandler]
  );

  return (
    <div className={classNames('search-filter', className)}>
      <input
        type="search"
        className="form-control form-control-sm"
        placeholder={placeholder}
        aria-controls="DataTables_Table_0"
        value={internalValue}
        onChange={onInternalChangeHandler}
        onClick={() => onClick && onClick(internalValue)}
      />
      <span className="mdi mdi-magnify search-icon" />
      <style jsx>{`
        .search-filter {
          position: relative;
        }
        .search-filter .form-control {
          height: calc(1.5em + 0.9rem + 2px);
          padding-left: 40px;
          padding-right: 20px;
        }
        .search-filter .search-icon {
          position: absolute;
          z-index: 9;
          font-size: 20px;
          line-height: 38px;
          left: 10px;
          top: 0;
          z-index: 0;
        }
      `}</style>
    </div>
  );
}

export default SearchFilter;
