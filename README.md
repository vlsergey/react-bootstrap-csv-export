# @vlsergey/react-bootstrap-csv-export
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

Ready-to-use components to export data as CSV. Provides not only core TypeScript functions, but also react-bootstrap form components that can be directly used in application.

Main features:
* [x] Generated CSV is downloaded to user browser with [streamsaver](https://github.com/jimmywarting/StreamSaver.js) library
* [x] Supports async fetching with pagination
* [x] Indicates export progress


Online demo: [HERE](https://vlsergey.github.io/react-bootstrap-csv-export/)

## Installation:
```
npm install --save @vlsergey/react-bootstrap-csv-export
```
or
```
npm install --save-dev @vlsergey/react-bootstrap-csv-export
```

## Usage
To include export-to-csv form to modal window or distinct page:

```jsx
import Container from 'react-bootstrap/Container';
import {ExportToCsvForm, Page} from '@vlsergey/react-bootstrap-csv-export';

async function fetchPageImpl( page: number ) : Promise<Page<MyType>> {
  /* define how to fetch page of MyType */
  return {
    content: /*...*/ as MyType[],
    number: page,
    totalElements: /*...*/,
    totalPages: /*...*/,
  };
}

/* ... */

export default function Demo (): JSX.Element {
  const fields = [{key: 'id'}, {key: 'name'}, {key: 'birthday'},];

  return <Container>
    <ExportToCsvForm
      fetchPage={fetchPageImpl}
      fields={fields}
      fileName="test.csv" />
  </Container>;
}
```

[npm-image]: https://img.shields.io/npm/v/@vlsergey/react-bootstrap-csv-export.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-csv-export
[travis-image]: https://travis-ci.com/vlsergey/react-bootstrap-csv-export.svg?branch=master
[travis-url]: https://travis-ci.com/vlsergey/react-bootstrap-csv-export
[downloads-image]: http://img.shields.io/npm/dm/@vlsergey/react-bootstrap-csv-export.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-csv-export
