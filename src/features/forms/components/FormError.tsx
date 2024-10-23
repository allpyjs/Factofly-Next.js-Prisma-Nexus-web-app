type FormErrorProps = {
  message: string;
};

function FormError({ message }: FormErrorProps) {
  return (
    <div className="alert alert-danger">
      <pre>{message}</pre>
    </div>
  );
}

export default FormError;
