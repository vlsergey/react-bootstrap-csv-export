import React from 'react';
import Container from 'react-bootstrap/Container';
import SyntaxHighlighter from 'react-syntax-highlighter';

import {ExportToCsvForm} from '../../src';
import {ExampleFields, fetchPageImpl} from './ExampleData';

export default function FormDemo (): JSX.Element {

  return <Container>
    <p>Please note that there is an artificial pause in 300ms per row so one can see export progress change in UI. It is not a perfomance issue but for demo convenience.</p>
    <SyntaxHighlighter language="typescript">
      {`import {ExportToCsvForm} from '../../src';

/* ... */

<ExportToCsvForm
  fetchPage={fetchPageImpl}
  fields={ExampleFields}
  fileName="test.csv" />;
`}
    </SyntaxHighlighter>
    <ExportToCsvForm
      fetchPage={fetchPageImpl}
      fields={ExampleFields}
      fileName="test.csv" />
  </Container>;
}
