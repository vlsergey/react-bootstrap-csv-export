import csvEscape from './csvEscape';
import Options from './Options';
import Page from './Page';

type ValueToPlain<T> = (item: T) => null | number | string;

export default async function generateContent<T> (
    options: Options<T>,
    onContent: (index: number, line: string) => unknown
): Promise< void > {

  const getters = [] as ValueToPlain<T>[];
  options.fields.forEach(field => {
    const {getter, key, toPlain} = field;
    const actualGetter = getter || ((item: T) => (item as Record<string, unknown>)[ key ]);
    const actualToPlain = toPlain || ((value: unknown): null | number | string => {
      if (value === null || value === undefined) {
        return null;
      }

      const t = typeof value;
      switch (t) {
      case 'string':
      case 'number':
        return value as (number | string);
      case 'undefined':
        return null;
      default:
        return JSON.stringify(value);
      }
    });
    const resultGetter = (item: T) => actualToPlain(actualGetter(item), item);
    getters.push(resultGetter);
  });

  let lastPage = false;
  let pageNumber = -1;
  let totalLines = 0;
  do {
    pageNumber++;

    const page: Page<T> = await options.fetchPage(pageNumber);
    lastPage = page.number >= page.totalPages;

    const items: T[] = page.content;
    const lines: string[] = items.map((item: T) =>
      getters.map(getter => getter(item)).map(csvEscape).join(options.separator)
    );

    for (const line of lines) {
      await onContent(page.totalElements, line + options.newline);
    }

    totalLines += items.length;
    if (options.limit && totalLines >= options.limit) break;
  } while (!lastPage);
}
