
var workerProcess = child_process.exec('node test.js',function 
  (error, stdout, stderr) {
  
  if (error) {
	 console.log(error.stack);
	 console.log('Error code: '+error.code);
	 console.log('Signal received: '+error.signal);
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
});

workerProcess.on('exit', function (code) {
  console.log('Child process exited with exit code '+code);
});
