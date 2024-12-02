console.log("Program Started ");

const myPromise = new Promise((resolve)=>{
    setTimeout(()=> {
        resolve("promise c");
    },3000);
});
console.log("Promise is pending");

myPromise.then((message)=> {
    console.log(message);
});
console.log("Program in progress...");