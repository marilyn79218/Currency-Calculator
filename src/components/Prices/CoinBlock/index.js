import React from 'react';

import styles from './CoinBlock.m.css';

type Props = {
  coinCurrency: {
    title: string,
    abbName: string,
    imgSrc: string,
    rate: string,
  },
};

const CoinBlock = ({
  coinCurrency: {
    title,
    abbName,
    imgSrc,
    rate,
  },
}: Props) => {
  console.log('CoinBlock');

  return (
    <div
      className={styles['coin-block']}
    >
      <span>{title}</span>
      <span>{abbName}</span>
      <span>{imgSrc}</span>
      <span>{rate}</span>
    </div>
  );
};

// const hoc = compose(
// );

export default CoinBlock;
