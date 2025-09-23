import { queryRetry } from "./retry";

const urlQuery = (url: string) => () => fetch(url);

const maxRetry = 3;
const useIncrement = true;
const delay = 1500;

queryRetry(
  urlQuery("http://localhost:3100/api/traffic/5"),
  maxRetry,
  delay,
  useIncrement
)
  .then(console.log)
  .catch(console.log);
