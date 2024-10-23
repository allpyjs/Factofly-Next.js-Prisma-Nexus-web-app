import classNames from 'classnames';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type InfoTooltipProps = {
  text: string;
  className?: string;
};
export default function InfoTooltip({ text, className = undefined }: InfoTooltipProps) {
  const renderTooltip = (props: any) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tooltip id="button-tooltip" {...props}>
      {text.split('\n').map((line) => (
        <>
          {line}
          <br />
        </>
      ))}
    </Tooltip>
  );
  return (
    <>
      <OverlayTrigger placement="right" delay={{ show: 150, hide: 400 }} overlay={renderTooltip}>
        <i className={classNames('fs-4 text-muted ms-1 mdi mdi-information', className)} />
      </OverlayTrigger>
      <style jsx>{`
        i {
          position: absolute;
          margin-top: -4px;
        }
      `}</style>
    </>
  );
}
