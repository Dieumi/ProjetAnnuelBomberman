if(typeof ENV !="undefined"){
  process.env.NODE_ENV = ENV['NODE_ENV']

}else{
  process.env.NODE_ENV ="test"

}
console.log("env : ",process.env.NODE_ENV )
