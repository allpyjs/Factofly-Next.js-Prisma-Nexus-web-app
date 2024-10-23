import classNames from 'classnames';
import { createContext, useCallback, useMemo, useState } from 'react';

type FormSectionProps = {};

type ContextData = { visible: boolean; toggle: Function };
export const FormSectionContext = createContext<ContextData>({ visible: true, toggle: () => {} });

function FormSection({ children }: React.PropsWithChildren<FormSectionProps>) {
  const [visible, setVisibility] = useState(true);
  const toggle = useCallback(() => setVisibility((state) => !state), []);

  const contextValue = useMemo(() => ({ visible, toggle }), [visible, toggle]);

  return (
    <div className={classNames('form-section', { hidden: !visible })}>
      <FormSectionContext.Provider value={contextValue}>{children}</FormSectionContext.Provider>
      <style jsx>{`
        .form-section :global(.form-section-content.hidden) {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default FormSection;
