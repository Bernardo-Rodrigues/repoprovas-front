import { useState, useEffect } from 'react';

import Input from './Input';

export default function Editable ({ value, onChange, children, ...props }) {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState(value);

  useEffect(() => {
    if (!editing) {
      setState(value);
    }
  });

  function onKeyPress (event) {
    if (event.key === 'Enter') {
      onChange(state);
      setEditing(false);
    }
  }

  return (
    editing
    ? <Input {...props} value={state} onChange={e => setState(e.target.value)} onKeyPress={onKeyPress} />
    : <span style={{ cursor: 'pointer' }} onClick={() => setEditing(true)}>{state}</span>
  );
}
