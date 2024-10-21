console.log("Program started");

const firstPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Step 1 complete");
  }, 3000);
});

console.log("Program in progress...");

firstPromise
  .then((message) => {
    console.log(message); // Affiche "Step 1 complete"
    
    // Retourne une nouvelle promesse qui se résout après 3 secondes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Step 2 complete");
      }, 3000);
    });
  })
  .then((message) => {
    console.log(message); // Affiche "Step 2 complete"
  });
