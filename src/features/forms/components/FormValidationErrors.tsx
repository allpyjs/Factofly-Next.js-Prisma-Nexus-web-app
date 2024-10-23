import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';

function FormValidationErrors() {
  const {
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation('common');

  const renderChildErrors = (childErrors: any, i: number) =>
    childErrors && (
      <ul>
        {Object.keys(childErrors).map((key) => (
          <li>
            {t('messages.row')} {i + 1} - {childErrors[key]?.message}
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="text-danger list-unstyled">
      {Object.keys(errors).map((key) => (
        <li>
          {errors[key].message}
          {Array.isArray(errors[key]) && errors[key].map(renderChildErrors)}
        </li>
      ))}
    </ul>
  );
}

export default FormValidationErrors;
