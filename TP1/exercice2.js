console.log("Program Started");

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Program complete"); // Résolution après 3 secondes
  }, 3000);

  setTimeout(() => {
    reject("Program failed"); // Rejet après 2 secondes
  }, 2000);
});

console.log("Promise is pending...");

myPromise
  .then((message) => {
    console.log(message); 
  })
  .catch((error) => {
    console.log(error); 
  });

console.log("Program in progress...");
