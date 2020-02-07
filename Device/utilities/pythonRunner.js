const {PythonShell} = require('python-shell')
module.exports = (filename,socket,args=[],castTo=null) => {
    let options = {
        mode: 'text',
        args: args.map(arg => arg)
      };
    PythonShell.run(`python/${filename}`,options,(err)=> {
        if(err)console.log(err)
        if(castTo){
            const {streamTitle,deviceIds} = castTo
            socket.emit('startCasting',{streamTitle,deviceIds})
        }
    })
}