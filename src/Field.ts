interface Field<I, V> {
  key: string;
  getter?: (item: I) => V;
  toPlain?: (value: V, item: I) => number | string | null;
}

export default Field;
