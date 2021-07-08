import Field from './Field';
import Page from './Page';
import UserOptions from './UserOptions';

interface Options<T> extends UserOptions {
  fetchPage: (page: number) => Promise<Page<T>>;
  fields: Field<T, unknown>[];
  fileName: string;
  limit?: number;
}

export default Options;
