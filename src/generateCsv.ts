import streamsaver from 'streamsaver';

import generateCsvBody from './generateCsvBody';
import generateCsvHeader from './generateCsvHeader';
import Options from './Options';

export default async function generateCsv<T> (
    options: Options<T>,
    onProgress: (progress: number, progressMax: number) => unknown
): Promise<void> {
  onProgress(0, 100);
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
  const encode: (input: string) => Uint8Array = TextEncoder.prototype.encode.bind(new TextEncoder());

  const progressMax = 104;
  onProgress(1, progressMax);

  const fileName = options.fileName;
  const csvStream = streamsaver.createWriteStream(fileName);
  const csvWriter = csvStream.getWriter();

  // UTF-8 BOM (byte order mark)
  await csvWriter.write(Uint8Array.of(0xEF, 0xBB, 0xBF));

  if (options.header) {
    const header = generateCsvHeader(options);
    await csvWriter.write(encode(header));
  }
  onProgress(2, progressMax);

  let done = 0;
  await generateCsvBody(options, async (totalElements: number, line: string) => {
    await csvWriter.write(encode(line));
    onProgress(3 + done++, 4 + totalElements);
  });
  await csvWriter.close();

  onProgress(progressMax, progressMax);
}
