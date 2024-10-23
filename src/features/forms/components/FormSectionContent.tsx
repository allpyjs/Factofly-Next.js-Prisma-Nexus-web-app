import classNames from 'classnames';
import { useContext } from 'react';
import { FormSectionContext } from './FormSection';

type FormSectionContentProps = {};

function FormSectionContent({ children }: React.PropsWithChildren<FormSectionContentProps>) {
  const { visible } = useContext(FormSectionContext);

  return <div className={classNames('form-section-content', { hidden: !visible })}>{children}</div>;
}

export default FormSectionContent;
