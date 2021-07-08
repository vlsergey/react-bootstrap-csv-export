import React, {useCallback} from 'react';
import Form from 'react-bootstrap/Form';

import Options from './Options';

interface PropsType<T> {
  value: Options<T>;
  onChange: (newOptions: Options<T>) => unknown;
}

function OptionsFormPart<T> ({
  value, onChange
}: PropsType<T>): JSX.Element {

  const handleTrigger = useCallback(({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name as 'header';
    onChange({
      ...value,
      [ fieldName ]: checked
    });
  }, [ onChange, value ]);

  return <>
    <Form.Check
      checked={value.header}
      label="Include header line (with column names) to CSV"
      onChange={handleTrigger} />
  </>;
}

export default React.memo(OptionsFormPart);
