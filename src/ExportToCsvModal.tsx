import Button from '@vlsergey/react-bootstrap-button-with-spinner';
import React, {ReactNode, useCallback, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';

import DefaultUserOptions from './DefaultUserOptions';
import Field from './Field';
import generateCsv from './generateCsv';
import Page from './Page';
import UserOptions from './UserOptions';
import UserOptionsFormPart from './UserOptionsFormPart';

interface PropsType<T> {
  fileName: string;
  fields: Field<T, unknown>[];
  fetchPage: (page: number) => Promise<Page<T>>;
  idPrefix?: string;
  modalHeader?: ReactNode;
  onHide: () => unknown;
  show: boolean;
}

function ExportToCsvModal<T> ({
  fileName,
  fields,
  fetchPage,
  idPrefix = 'csvExport',
  modalHeader = 'Export to CSV',
  onHide,
  show,
}: PropsType<T>) {
  const [userOptions, setUserOptions] = useState<UserOptions>(DefaultUserOptions);

  const [retry, setRetry] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [progressMax, setProgressMax] = useState(100);

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
  }, [fetchPage, fields, fileName, setProgress, setProgressMax, userOptions]);

  return <Modal onHide={onHide} show={show}>
    <Modal.Header closeButton>
      {modalHeader}
    </Modal.Header>
    <Modal.Body>
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
      {!inProgress && !error && progress == progressMax && <Row><Col>
        <Alert variant="info">
          {'CSV export completed'}
        </Alert>
      </Col></Row>}
      <Row><Col>
        <div style={{marginBottom: 12}}>
          <ProgressBar animated={inProgress} max={progressMax} now={progress} />
        </div>
      </Col></Row>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={inProgress} onClick={doGenerate} variant="primary">{
        retry ? 'Retry export to CSV' : 'Export to CSV'
      }</Button>
      <Button onClick={onHide} variant="secondary">Close</Button>
    </Modal.Footer>
  </Modal>;
}

export default React.memo(ExportToCsvModal);
