import { useQuery } from '@apollo/client';
import CountrySelectFieldQuery from './graphql/CountrySelectFieldQuery.gql';
import { CountrySelectFieldQuery as CountrySelectFieldQueryType } from './graphql/.generated/CountrySelectFieldQuery';
import SelectField, { SelectFieldOption } from '../SelectField';
import FieldLoading from '../FieldLoading';
import languages from '~/constants/languages';
import useUser from '~/contexts/User/useUser';

type CountrySelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

function CountrySelectField({
  name,
  label,
  description = undefined,
  required = false
}: CountrySelectFieldProps) {
  const { loading, error: loadError, data } = useQuery<CountrySelectFieldQueryType>(CountrySelectFieldQuery);
  const { language } = useUser();

  let options: SelectFieldOption[] =
    data?.countries.map((country) => ({
      value: country.id,
      label: language === languages.DA ? country.name_da : country.name_en
    })) ?? [];

  if (options.length > 0) {
    // make sure common country options are at the top
    options = [...options.filter((x) => x.value === 60), ...options];
  }

  if (loading) return <FieldLoading />;
  if (loadError) throw Error('There was an error loading this component');

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default CountrySelectField;
