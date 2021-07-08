export default function escape (obj: unknown): string {
  if (obj === null || obj === undefined) {
    return '';
  }

  const str: string = obj.toString();
  const escaped: string = str.replace(/"/g, '""');
  return `"${escaped}"`;
}
