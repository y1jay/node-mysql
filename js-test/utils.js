console.log('utils.js called')

module.exports ={
name : 'Mike',

 add : (a,b)=>{
    return a+b
},

minus : (a,b)=>{
    return a-b
}
}
// utils파일은 이 (name)을 외부로 노출시켜준다는 코드
// name을 노출시켜줘야 다른파일에서 받을 수있다
// module.exports = {name,add,minus}
// module.exports = name 
