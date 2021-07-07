import Page from "./Page";

export interface Options<T> {
  fetchPage: ({
    page: number,
    size: number
  }) => Promise<Page<T>>;
  header: boolean;
  limit?: number;
  newline: '\n' | '\r\n';
  separator: ';' | ',' | '\t';
}
