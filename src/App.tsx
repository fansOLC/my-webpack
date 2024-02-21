import React, { useEffect } from 'react';
import { add } from './utils';
// import style from './index.css';
import style from './style.scss';
import smallImage from '@/assets/12kb.png';
import largeImage from '@/assets/57kb.png';
import Demo1 from './components/Demo1';

console.log('style', style);

const InputCom = () => {
  useEffect(() => {
    const sum = add(3, 12);
    console.log('sum', sum);
  }, []);
  return (
    <div>
      <span className={style.red}>姓名1：</span>
      <input type="text" placeholder="123" />
      <img src={smallImage} alt="" />
      <img src={largeImage} alt="" />
      <Demo1 />
    </div>
  );
};

export default InputCom;
