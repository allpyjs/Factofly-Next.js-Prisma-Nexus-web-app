import { VoidResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const Void = asNexusMethod(VoidResolver, 'Void');

export default Void;
