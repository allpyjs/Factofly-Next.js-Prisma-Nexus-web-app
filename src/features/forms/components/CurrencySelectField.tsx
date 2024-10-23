import SelectField, { SelectFieldOption } from './SelectField';

type CurrencySelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

function CurrencySelectField({
  name,
  label,
  description = undefined,
  required = false
}: CurrencySelectFieldProps) {
  const options: SelectFieldOption[] = [
    {
      value: 'DKK',
      label: 'DKK'
    },
    {
      value: 'EUR',
      label: 'EUR'
    },
    {
      value: 'GBP',
      label: 'GBP'
    },
    {
      value: 'NOK',
      label: 'NOK'
    },
    {
      value: 'SEK',
      label: 'SEK'
    },
    {
      value: 'USD',
      label: 'USD'
    }
  ];

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default CurrencySelectField;
