import { JSONResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const JSON = asNexusMethod(JSONResolver, 'JSON');

export default JSON;
