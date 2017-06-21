const _exec = require('child_process').exec
var _execution, _executable = null 

function Moove(source,destination){
  return new Promise( (resolve,reject) => {
    _execution  = `move /Y ${source} ${destination}`
    _executable = _exec(_execution, ["bash"])
    
    _executable.stdout.on('data', (data) => { console.log(data) })
    _executable.stderr.on('data', (data) => { reject(data) })
    _executable.on('exit', (data) => { resolve(data) })
  })
}

module.exports.Moove = Moove