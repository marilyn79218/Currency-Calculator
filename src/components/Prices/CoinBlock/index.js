import React from 'react';

import styles from './CoinBlock.m.css';

type Props = {
  inputAmount: number,
  coinCurrency: {
    title: string,
    abbName: string,
    imgSrc: string,
    rate: string,
  },
};

const CoinBlock = ({
  inputAmount,
  coinCurrency: {
    title,
    abbName,
    imgSrc,
    rate,
  },
}: Props) => (
  <div
    className={styles['coin-block']}
  >
    <div
      className={styles.row}
    >
      <p
        className={styles['coin-names']}
      >
        <span>{title}</span>
        <span>({abbName})</span>
      </p>
      <img
        className={styles['coin-icon']}
        src={imgSrc}
        alt="pic"
      />
    </div>
    <div
      className={styles['coin-rate']}
    >
      {rate * inputAmount}
    </div>
  </div>
);

export default CoinBlock;
