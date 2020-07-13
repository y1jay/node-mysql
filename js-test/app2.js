// 다른 파일에 있는 정보를 가져오는 방법
const utils = require('./utils.js')
const getNotes = require('./notes.js')
// const name = require('./utils.js')
// ./라는 뜻은, 현재의 파일인 app2.js가 있는 디렉토리.
let sum = utils.add(4,-2)
console.log(sum)
// utils.js 파일 안에 있는, name 값을 사용하려 한다.
console.log(utils.name)

console.log(utils.minus(59433153,561861))
//notes.js 파일 안에 있는 값을  사용
let call = getNotes()
console.log(call)

