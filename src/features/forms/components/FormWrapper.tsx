import { FormProvider } from 'react-hook-form';

type FormWrapperProps = {
  children: React.ReactNode | Function;
  onSubmit: any;
  form: any;
};

function FormWrapper({ children, form, onSubmit }: FormWrapperProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormProvider>
  );
}

export default FormWrapper;
