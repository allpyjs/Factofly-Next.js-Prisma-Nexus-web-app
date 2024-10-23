import clientConfig from '~/clientConfig';

type TableErrorProps = {
  error?: string;
};

function TableError({ error = undefined }: TableErrorProps) {
  return (
    <div className="alert alert-danger error error-alert mt-2" role="alert">
      There was an error while loading the table. Please contact support at&nbsp;
      <a href={clientConfig.supportEmail} rel="noopener noreferrer" target="_blank">
        {clientConfig.supportEmail}
      </a>
      {error && <span>{error}</span>}
    </div>
  );
}

export default TableError;
