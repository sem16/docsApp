import React, { useEffect, useState } from 'react';
import { Message } from '@app/api-interfaces';
import {DocList} from './docList';
export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
      </div>
      <DocList/>
      <div>{m.message}</div>
    </>
  );
};

export default App;
