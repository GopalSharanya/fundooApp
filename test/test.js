let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();


let server = require('../server')
let fs = require('fs');
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE1ODk2NzIsImV4cCI6MTU4MTU5MzI3Mn0.rz_ZLGZrHzCw9FEOEx_dzimyQ7W3xwdAGRkJFTFrEEI"
function readf() {
    let data = fs.readFileSync('/home/admin1/Desktop/sharanya/fundooNotes/test/test.json');
    let pData = JSON.parse(data);
    return pData;
}

describe('register', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/register').send(data.register).end((err, data) => {

            data.should.have.status(200);

            done();
        })
    })
})

describe('login', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/login').send(data.login).end((err, data) => {
            data.should.have.status(200);

            done();
        })
    })
})

describe('forgotPassword', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/forgotPassword').send(data.forgotPassword).end((err, data) => {
            data.should.have.status(200)
            done();
        })
    })
})


describe('forgotPasswordwrong', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/forgotPassword').send(data.forgotpasswordwrong).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
})


describe('registerwrong', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/register').send(data.registerwrong).end((err, data) => {
            data.should.have.status(422)
            done();
        })
    })
})




