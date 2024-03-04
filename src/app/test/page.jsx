"use client";

export default function Test() {
  return (
    <button
      onClick={() => {
        const data = fetch("http://localhost:3030/seecon", {
          method: "POST", // Dont enable CORS
          headers: {
            accept: "application/json",
          },
          body: JSON.stringify({ id: "Organizations" }),
        }).catch(function (error) {
          console.log(
            "There was a problem with the fetch operation: " + error.message
          );
        });
        data.then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data, response.status, response.statusText);
            });
          } else {
            console.error(response.status, response.statusText);
          }
        });
      }}
    >
      GET SEECON
    </button>
  );
}
