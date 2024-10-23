import React from 'react';
import ReactDOM from 'react-dom';

type PortalState = {
  render: Function;
  remove: Function;
};

// From https://www.30secondsofcode.org/react/s/use-portal
export default function usePortal(el: HTMLElement) {
  const [portal, setPortal] = React.useState<PortalState>({
    render: () => null,
    remove: () => null
  });

  const createPortal = React.useCallback((portalElement: HTMLElement): PortalState => {
    const portalRenderer = ({ children }: any) => ReactDOM.createPortal(children, portalElement);
    const remove = () => ReactDOM.unmountComponentAtNode(portalElement);
    return { render: portalRenderer, remove };
  }, []);

  React.useEffect(() => {
    if (el) portal.remove();
    const newPortal = createPortal(el);
    setPortal(newPortal);
    return () => {
      newPortal.remove();
    };
  }, [el, createPortal, portal]);

  return portal.render;
}
