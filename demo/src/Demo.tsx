import React from 'react';
import Container from 'react-bootstrap/Container';

import {ExportToCsvForm, Page} from '../../src';

function sleep (ms: number): Promise< unknown > {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface ExampleItemType {
  id: string;
  name: string;
  birthday: string;
}

const ExampleData: ExampleItemType[] = [
  {id: '1', name: 'Alice', birthday: '2001-02-03'},
  {id: '2', name: 'Bob', birthday: '2002-03-04'},
  {id: '3', name: 'Carl', birthday: '2003-04-05'},
  {id: '4', name: 'David', birthday: '2004-05-06'},
  {id: '5', name: 'Eva', birthday: '2005-06-07'},
  {id: '6', name: 'Fiona', birthday: '2006-07-08'},
  {id: '7', name: 'Helen', birthday: '2007-08-09'}
];

async function fetchPageImpl (page: number): Promise<Page<ExampleItemType>> {

  // so we can see progress un UI
  await sleep(300);

  if (page < ExampleData.length) {
    return Promise.resolve({
      content: [ ExampleData[ page ] ] as ExampleItemType[],
      number: 0,
      totalElements: ExampleData.length,
      totalPages: ExampleData.length
    });
  }
  return Promise.resolve({
    content: [] as ExampleItemType[],
    number: page,
    totalPages: ExampleData.length,
    totalElements: ExampleData.length
  });
}

export default function Demo (): JSX.Element {

  const fields = [
    {key: 'id'},
    {key: 'name'},
    {key: 'birthday'},
  ];

  return <Container>
    <ExportToCsvForm
      fetchPage={fetchPageImpl}
      fields={fields}
      fileName="test.csv" />
  </Container>;
}
