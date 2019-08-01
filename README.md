# Siteminder Front End Tech Challenge

A single page application to filter movies from the OMDB API, using `react`, `redux`, `redux-thunk`, `reselect`, `scss-modules`, `react-spinkit`, `sass-mq` `lodash.debounce` and `axios`. Bootstrapped with `create-react-app` cli, which provided the `react-scripts` package.

## Installing

The env is loaded through `create-react-app`'s build in `dotenv`, and has been provided in this zip. the `.env` file contains the api key for the OMDB API.

## Running the application

```
npm run start
```
To run in dev mode, the process will open a new browser tab/window at `localhost:3000`.
with dev mode you can observe the redux state with redux dev tools.

```
npm run build
```

Will generate a build folder which can be served withwith a static server like [http-server](https://www.npmjs.com/package/http-server).

## Running the tests

Tests were written using mocha as a test framework instead of the provided `jest` setup, due to `jest` not playing nice with `proxyquire`.

```
npm run test
```

or with watch mode

```
npm run test:watch
```
