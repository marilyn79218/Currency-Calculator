import React, { Fragment } from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import styles from './CoinBlock.m.css';

type Props = {
  isDesktop: boolean,
  inputAmount: number,
  currency: {
    title: string,
    abbName: string,
    imgSrc: string,
    rate: string,
  },
};

const CoinBlock = ({
  isDesktop,
  inputAmount,
  currency: {
    title,
    abbName,
    imgSrc,
    rate,
  },
}: Props) => (
  <Fragment>
    {
      isDesktop ? (
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
      ) : (
        <div
          className={styles['mobile-coin-block']}
        >
          <img
            className={styles['mobile-coin-icon']}
            src={imgSrc}
            alt="pic"
          />
          <div
            className={styles.row}
          >
            <p
              className={styles['mobile-coin-names']}
            >
              <span>{title}</span>
              <span>({abbName})</span>
            </p>
          </div>
          <div
            className={styles['mobile-coin-rate']}
          >
            <p>{rate * inputAmount}</p>
          </div>
        </div>
      )
    }
  </Fragment>
);

const hoc = compose(
  withProps(({ inputAmount }) => ({
    inputAmount: inputAmount < 0 ? 0 : inputAmount,
  })),
);

export default hoc(CoinBlock);
