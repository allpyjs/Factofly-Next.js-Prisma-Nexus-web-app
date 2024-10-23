import React from 'react';
import { nanoid } from 'nanoid';

function RowSelectCheckbox({ ...rest }: any, ref: React.LegacyRef<HTMLInputElement>) {
  const uniqueId = nanoid();

  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        name={`selectCheckbox_${uniqueId}`}
        ref={ref}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        onClick={(e) => e.stopPropagation()}
      />
      <style jsx>{`
        .form-check {
          margin: 8px -32px -8px 32px;
          padding: 0;
        }
        :global(thead) .form-check {
          margin: 0px -32px -8px 32px;
        }
      `}</style>
    </div>
  );
}

export default React.forwardRef(RowSelectCheckbox);
