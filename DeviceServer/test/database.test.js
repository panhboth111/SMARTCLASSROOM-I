const database = require('../loaders/database')
const Device = require('../models/device')
const expect = require('chai').expect
const {serverData} = require('./testData/deviceData')

describe('Device database tests',()=>{
    beforeEach(async()=> await database.connect())
    afterEach(async()=> await database.close())
    it('should create device collection without errors',async()=>{
        const _D = await new Device(serverData).save()
        expect(_D.deviceId).to.equal(serverData.deviceId)
    })
    it('should return errors if any field is left empty',async()=>{
        const _D = await new Device()
        _D.validate((err)=> {
            expect(err).to.exist
        })
    })
    it('should update successfully',async()=>{
        await Device.updateOne({},{deviceName:serverData.deviceName})
        expect(await Device.findOne({deviceName:serverData.deviceName})).to.exist
    })
})