// @flow
import BTCIconSVG from '../assets/crypto/btc/lightbg.svg';
import ETHIconSVG from '../assets/crypto/eth/lightbg.svg';
import ETCIconSVG from '../assets/crypto/etc.svg';
import LTCIconSVG from '../assets/crypto/ltc.svg';

export const BASENAME: string = process.env.PUBLIC_URL || '/';
export const DEVELOPMENT: string = 'development';
export const NODE_ENV: string = process.env.NODE_ENV || DEVELOPMENT;

export type FetchStatus = 'NOT_FETCHED' | 'FETCHING' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
export const FETCH_STATUS_MAP: {
  [key: string]: FetchStatus
} = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
};

export const TOKEN_KEY: string = 'VISION_API_TOKEN_KEY';

export const LOGIN_STATUS = {
  NOT_LOGIN: 'NOT_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
};

export const MITHRIL_API_HOST = 'https://api.coinbase.com';
export const APP_DOLLAR = 'USD';
export const HOME_PAGE = 'prices';
export const TAB_NAMES = ['prices', 'wallet', 'account'];

export const INIT_CURRENCIES = [
  {
    title: 'Bitcoin',
    abbName: 'bTC',
    imgSrc: BTCIconSVG,
    rate: 0,
  },
  {
    title: 'Ethereum',
    abbName: 'eTH',
    imgSrc: ETHIconSVG,
    rate: 0,
  },
  {
    title: 'Litecoin',
    abbName: 'lTC',
    imgSrc: LTCIconSVG,
    rate: 0,
  },
  {
    title: 'Ethereum Classic',
    abbName: 'eTC',
    imgSrc: ETCIconSVG,
    rate: 0,
  },
];
