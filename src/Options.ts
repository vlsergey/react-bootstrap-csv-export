import Field from './Field';
import Page from './Page';
import UserOptions from './UserOptions';

interface Options<T> extends UserOptions {
  fetchPage: (page: number) => Promise<Page<T>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Field<T, any>[];
  fileName: string;
  limit?: number;
}

export default Options;
