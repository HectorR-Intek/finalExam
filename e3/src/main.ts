import { cancellableFetch } from "./cancellableFetch";

const result = cancellableFetch("http://localhost:3000/api/traffic/2");

result.promise
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Fetch was cancelled");
    } else {
      console.log("Error:", err);
    }
  });

result.cancel();
