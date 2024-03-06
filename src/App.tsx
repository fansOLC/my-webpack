import React from 'react';
import style from './style.scss';
import { add } from './utils';

export default function App() {
  return (
    <div className={style.container}>
      <div className={style.left}>{add(2, 5)}</div>
      <div className={style.right}>2</div>
    </div>
  );
}
