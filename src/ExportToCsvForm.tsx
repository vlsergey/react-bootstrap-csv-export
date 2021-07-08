import Button from '@vlsergey/react-bootstrap-button-with-spinner';
import React, {useCallback, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

import DefaultUserOptions from './DefaultUserOptions';
import Field from './Field';
import generateCsv from './generateCsv';
import Page from './Page';
import UserOptions from './UserOptions';
import UserOptionsFormPart from './UserOptionsFormPart';

interface PropsType<T> {
  idPrefix?: string;
  fileName: string;
  fields: Field<T, unknown>[];
  fetchPage: (page: number) => Promise<Page<T>>;
}

function ExportToCsvForm<T> ({
  idPrefix = 'csvExport',
  fileName,
  fields,
  fetchPage,
}: PropsType<T>) {
  const [ userOptions, setUserOptions ] = useState<UserOptions>(DefaultUserOptions);

  const [ retry, setRetry ] = useState<boolean>(false);
  const [ error, setError ] = useState<unknown>(null);
  const [ inProgress, setInProgress ] = useState<boolean>(false);
  const [ progress, setProgress ] = useState(0);
  const [ progressMax, setProgressMax ] = useState(100);

  const doGenerate = useCallback(async () => {
    setError(null);
    setInProgress(true);
    setProgress(0);

    try {
      await generateCsv({
        ...userOptions,
        fileName,
        fields,
        fetchPage,
      }, (progress: number, progressMax: number) => {
        setProgress(progress);
        setProgressMax(progressMax);
      });
    } catch (err) {
      console.warn('Unable to export to CSV: ');
      console.warn(err);

      setError(err);
    } finally {
      setInProgress(false);
      setRetry(true);
    }
  }, [ fetchPage, fields, fileName, setProgress, setProgressMax, userOptions ]);

  return <>
    <Row><Col>
      <UserOptionsFormPart
        disabled={inProgress}
        idPrefix={idPrefix + 'Options'}
        onChange={setUserOptions}
        value={userOptions} />
    </Col></Row>
    {error && <Row><Col>
      <Alert variant="danger">
        {'Error occured on CSV export: '}
        { (error as {message?: string}).message || JSON.stringify(error) }
      </Alert>
    </Col></Row>}
    <Row><Col>
      <div style={{marginBottom: 12}}>
        <ProgressBar animated={inProgress} max={progressMax} now={progress} />
      </div>
    </Col></Row>
    <Row><Col>
      <Button disabled={inProgress} onClick={doGenerate}>{
        retry ? 'Retry export to CSV' : 'Export to CSV'
      }</Button>
    </Col></Row>
  </>;
}

export default React.memo(ExportToCsvForm);
