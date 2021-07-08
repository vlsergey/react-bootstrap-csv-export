import Field from './Field';
import Page from './Page';

interface Options<T> {
  fetchPage: (page: number) => Promise<Page<T>>;
  fields: Field<T, unknown>[];
  fileName: string;
  header: boolean;
  limit?: number;
  newline: '\n' | '\r\n';
  separator: ';' | ',' | '\t';
}

export default Options;
