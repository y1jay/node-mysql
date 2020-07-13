// 파일 하나 만들기 
// 오리지날 자바스크립트 문법
// (fs) 라이브러리는 항상 통일시켜줘야한다 

const fs = require('fs')
// validator 패키지 가져다 쓰기 
const validator = require('validator')

let ret = validator.isEmail('acdsf@naver.com')
ret = validator.isURL('http://naver.com')
console.log(ret)


// 1. chalk 라는 패키지를 설치하세요 
// 2. app.js파일에서 로딩하세요.
// 3. 문자열로 "Success!"라고 출력할건데, 녹색으로 출력하세요
// 4. 3번의 문제에 추가하여 bold체로 출력해보세요
const chalk = require('chalk')
let suc = chalk.green.bold.inverse('Success')

console.log(suc)

// console.log(chalk.bold.green("Success!"))















// 새로운 내용 추가
fs.writeFileSync('notes.txt','안냐세염')


// 1. appendFileSyne 라는 함수를 이용해서 
// 2. notes.txt 파일에, 새로운 내용을 추가하세요
// 3. 실행하여 결과를 확인합니다.

// 내용을 덧붙이기 
fs.appendFileSync('notes.txt', '\n딜릴리리')



