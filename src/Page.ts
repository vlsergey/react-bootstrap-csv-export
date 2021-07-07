interface Page<T> {
  content: T[];
  /* The number of the current page. Is always non-negative. */
  number: number;
  totalElements: number;
  totalPages: number;
}

export default Page;
