function run() {
  console.log("3초후 실행");
}

console.log("시작");

setTimeout(run, 3000); //3000 밀리세컨즈 : 3초 실행하고 다음함수 실행

console.log("끝");

//non - blocking I/O 라고 한다
