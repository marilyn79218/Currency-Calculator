# Large App Starter Kit

## Develop
```sh
VIS_API_HOST={} yarn start
```

## commit checking
* flowtype
* eslint for staged files

## build checking
* flowtype
* eslint

## Fetch
this project use `whatwg-fetch` as fetch polyfill

### How
```js
import fetchUtil from 'shared/utils/fetchUtil';

const endpoint = '/books';
const fetchBooks = fetchUtil(endpoint);

fetchBooks.get()
  .then(console.log); // GET /books response

fetchBooks.post({
  body: {
    ids: [1, 2, 3],
  },
  headers: {
    user: 1,
  },
  token,
})
  .then(console.log);

```
