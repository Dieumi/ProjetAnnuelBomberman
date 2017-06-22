if( ENV['NODE_ENV']!=null){
  process.env.NODE_ENV = ENV['NODE_ENV']

}else{
  process.env.NODE_ENV ="test"

}
