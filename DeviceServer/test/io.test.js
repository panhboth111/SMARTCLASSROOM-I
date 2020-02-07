let Client = require('socket.io-client')('http://localhost:3001')
const {io} = require('../loaders/io')
const {serverData,clientData} = require('./testData/deviceData')
const {testEvent1,testEvent2,device_info} = require('./testData/socketData')
const expect = require('chai').expect
describe('socket io tests',()=>{
    it('should detect connection correctly',(done)=>{
        io.on('connection',(client)=>{
           expect(client).to.exist 
        })
        done()
    })
    it('should emit events correctly',(done)=>{
        io.on('connection',(client)=>{
            client.emit(testEvent1.event,testEvent1.data)
            client.on(testEvent1.event,(msg)=> expect(msg).to.equal(testEvent2.data))
        })
        io.emit(testEvent2.event,testEvent2.data)
        io.on(testEvent2.event,(msg)=> expect(msg).to.equal(testEvent2.data))
        done()
    })
    it('should receive event correctly',(done)=>{
        Client.emit(testEvent1.event,testEvent1.data)
        io.on(testEvent1.event,(client)=>{
            client.on('client_event',(msg) => expect(msg).to.equal(testEvent1.data))
        })
        Client.emit(testEvent2.event,testEvent2.data)
        io.on(testEvent2.event,(msg)=> expect(msg).to.equal(testEvent2.data))
        done()
    })
    it('should receive device_info and save correctly',(done)=>{
        Client.emit(device_info,clientData)
        io.on('connection',(client)=>{
            client.on(device_info,(info)=>{
                
            })
        })
    })
})