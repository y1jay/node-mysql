//promise 함수
const condition = false;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    resolve("실패");
  }
});

promise
  .then((messeage) => {
    console.log(messeage);
  })
  .catch((error) => {
    console.log("error");
  });
