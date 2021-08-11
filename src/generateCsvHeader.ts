import Options from './Options';

export default function generateCsvHeader<T> (options: Options<T>): string {
  return options.fields.map(({key}) => key).join(options.separator) + options.newline;
}
