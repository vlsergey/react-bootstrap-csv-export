import Options from './Options';

export default function generateCsvHeader (options: Options<unknown>): string {
  return options.fields.map(({key}) => key).join(options.separator) + options.newline;
}
