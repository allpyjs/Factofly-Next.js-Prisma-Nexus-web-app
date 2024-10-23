import React from 'react';

import LogoImage from 'public/images/logo.svg';

type LogoProps = {
  width?: string;
  height?: string;
};

function Logo({ height = '100%', width = '100%' }: LogoProps): JSX.Element {
  return (
    <div className="logo logo-lg">
      <LogoImage height={height} width={width} />
      <style jsx>
        {`
          P .logo {
            display: inline-block;
            line-height: 70px;
            width: 260px;
          }
        `}
      </style>
    </div>
  );
}

export default Logo;
