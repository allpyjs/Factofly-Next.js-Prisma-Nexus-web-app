import React from 'react';

type FadeInProps = {
  children: React.ReactNode;
};

export default function FadeIn({ children }: FadeInProps): JSX.Element {
  return (
    <div className="fade-in">
      {children}
      <style jsx>{`
        div.fade-in {
          animation: fadeIn 500ms;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
