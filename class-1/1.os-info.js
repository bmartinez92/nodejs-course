const os = require('node:os')

console.log('Info System:')
console.log('------------------------')

console.log('Name System Operative: ' + os.platform())
console.log('Version System Operative: ' + os.release())
console.log('Arquitecture: ' + os.arch())
console.log('CPUs: ' + os.cpus().length)
console.log('Memory free: ' + os.freemem() / 1024 / 1024)
console.log('Memory total: ' + os.totalmem() / 1024 / 1024)
