import React, {useCallback} from 'react';
import Form from 'react-bootstrap/Form';

import UserOptions from './UserOptions';

interface PropsType {
  disabled?: boolean;
  idPrefix: string;
  onChange: (newOptions: UserOptions) => unknown;
  value: UserOptions;
}

const html_value_to_value = {
  n: '\n',
  r: '\r',
  rn: '\r\n',
  t: '\t',
} as Record<string, string>;

const value_to_html_value = {
  '\n': 'n',
  '\r': 'r',
  '\r\n': 'rn',
  '\t': 't',
} as Record<string, string>;

function UserOptionsFormPart ({
  disabled = false,
  idPrefix = '',
  onChange,
  value
}: PropsType): JSX.Element {

  const handleChange = useCallback(({currentTarget}: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [currentTarget.name]: html_value_to_value[currentTarget.value] || currentTarget.value,
    } as unknown as UserOptions);
  }, [onChange, value]);

  const handleTrigger = useCallback(({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name as 'header';
    onChange({
      ...value,
      [fieldName]: checked
    });
  }, [onChange, value]);

  return <>
    <Form.Group>
      <Form.Check
        checked={value.header}
        disabled={disabled}
        id={`${idPrefix}header`}
        label="Include header line (with column names) to CSV"
        name="header"
        onChange={handleTrigger} />
    </Form.Group>
    <Form.Group>
      <Form.Label>Values separator</Form.Label>
      <Form.Control
        as="select"
        disabled={disabled}
        id={`${idPrefix}separator`}
        name="separator"
        onChange={handleChange}
        value={value_to_html_value[value.separator] || value.separator}>
        <option value=",">Colon “,”</option>
        <option value="t">Tab “\t”</option>
        <option value=";">Semicolon “;”</option>
      </Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Label>Line break character</Form.Label>
      <Form.Control
        as="select"
        disabled={disabled}
        id={`${idPrefix}newline`}
        name="newline"
        onChange={handleChange}
        value={value_to_html_value[value.newline] || value.newline}>
        <option value={'rn'}>Windows-style “\r\n”</option>
        <option value={'n'}>*nix-style “\n”</option>
        <option value={'r'}>Mac-style “\r”</option>
      </Form.Control>
    </Form.Group>
  </>;
}

export default React.memo(UserOptionsFormPart);
