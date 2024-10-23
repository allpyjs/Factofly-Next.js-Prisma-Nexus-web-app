type PageErrorProps = {
  message: string;
};

function PageError({ message }: PageErrorProps) {
  return <div className="alert alert-danger">{message}</div>;
}

export default PageError;
