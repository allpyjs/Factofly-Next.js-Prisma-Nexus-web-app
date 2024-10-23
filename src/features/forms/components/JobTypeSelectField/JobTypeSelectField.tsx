import { useQuery } from '@apollo/client';
import JobTypeSelectFieldQuery from './graphql/JobTypeSelectFieldQuery.gql';
import { JobTypeSelectFieldQuery as JobTypeSelectFieldQueryType } from './graphql/.generated/JobTypeSelectFieldQuery';
import SelectField, { SelectFieldOption } from '../SelectField';
import FieldLoading from '../FieldLoading';
import useUser from '~/contexts/User/useUser';
import languages from '~/constants/languages';

type JobTypeSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
  readOnly?: boolean;
};

function JobTypeSelectField({
  name,
  label,
  description = undefined,
  tooltip = undefined,
  required = false,
  readOnly = false
}: JobTypeSelectFieldProps) {
  const { loading, error: loadError, data } = useQuery<JobTypeSelectFieldQueryType>(JobTypeSelectFieldQuery);
  const { language } = useUser();

  const options: SelectFieldOption[] =
    data?.jobTypes.map((jobType) => ({
      value: jobType.id,
      label: language === languages.DA ? jobType.name_da : jobType.name_en
    })) ?? [];

  if (loading) return <FieldLoading />;
  if (loadError) throw Error('There was an error loading this component');

  return (
    <SelectField
      name={name}
      label={label}
      description={description}
      required={required}
      options={options}
      readOnly={readOnly}
      tooltip={tooltip}
    />
  );
}

export default JobTypeSelectField;
