type TopActionsProps = {
  children?: React.ReactNode;
};

function TopActions({ children = undefined }: TopActionsProps): JSX.Element {
  return (
    <div className="actions py-1 float-end">
      {children}
      <style jsx>{`
        .actions {
          text-align: right;
        }
        .actions > :global(button),
        .actions > :global(a) {
          margin-bottom: 0.5rem;
        }
        .actions :global(.btn) {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default TopActions;
