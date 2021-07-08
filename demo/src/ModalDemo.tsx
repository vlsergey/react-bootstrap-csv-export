import React, {useCallback, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import SyntaxHighlighter from 'react-syntax-highlighter';

import {ExportToCsvModal} from '../../src';
import {ExampleFields, fetchPageImpl} from './ExampleData';

export default function FormDemo (): JSX.Element {

  const [ show, setShow ] = useState<boolean>(false);
  const handleShow = useCallback(() => setShow(true), [ setShow ]);
  const handleHide = useCallback(() => setShow(false), [ setShow ]);

  return <Container>
    <p>Please note that there is an artificial pause in 300ms per row so one can see export progress change in UI. It is not a perfomance issue but for demo convenience.</p>
    <SyntaxHighlighter language="typescript">
      {`import React, {useCallback, useState} from 'react';
import {ExportToCsvForm} from '../../src';

/* ... */

const [show, setShow] = useState<boolean>(false);
const handleShow = useCallback( () => setShow(true), [setShow] );
const handleHide = useCallback( () => setShow(false), [setShow] );

/* ... */

<ExportToCsvModal
  show={show}
  onHide={handleHide}
  fetchPage={fetchPageImpl}
  fields={ExampleFields}
  fileName="test.csv" />
<Button onClick={handleShow}>Export to CSV</Button>
`}
    </SyntaxHighlighter>

    <ExportToCsvModal
      fetchPage={fetchPageImpl}
      fields={ExampleFields}
      fileName="test.csv"
      onHide={handleHide}
      show={show} />
    <Button onClick={handleShow}>Export to CSV</Button>
  </Container>;
}
