import classNames from 'classnames';
import { useContext } from 'react';
import { FormSectionContext } from './FormSection';

type SectionHeaderProps = {
  title: string;
  button?: JSX.Element;
  showToggle?: boolean;
};

function SectionHeader({ title, showToggle = false, button = undefined }: SectionHeaderProps) {
  const { toggle, visible } = useContext(FormSectionContext);

  const content = (
    <h4 className="section-header">
      {title} {button}{' '}
      {showToggle && (
        <i className={classNames('float-end', { 'uil-angle-up ': visible, 'uil-angle-down': !visible })} />
      )}
      <style jsx>{`
        h4.section-header {
          background: #234b9b;
          padding: 0.5rem;
          margin: 0 0 1rem 0;
          color: white;
        }
      `}</style>
    </h4>
  );

  return (
    <>
      {showToggle ? (
        <button type="button" className="btn w-100 p-0 m-0 text-start" onClick={() => toggle()}>
          {content}
        </button>
      ) : (
        content
      )}
      <style jsx>{`
        .btn:focus {
          box-shadow: none;
        }
      `}</style>
    </>
  );
}

export default SectionHeader;
