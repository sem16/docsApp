import React, { useEffect, useState } from 'react';
import { Message } from '@app/api-interfaces';
import {DocList} from './docList';
import './app.scss';
export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <div style={{ height: '100%'}}>
      <div className="del">
      </div>
      <DocList/>
      <div className="del2">
      </div>
    </div>
  );
};

export default App;
