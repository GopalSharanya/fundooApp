let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();


let server = require('../server');
let fs = require('fs');
function readf() {
    let data = fs.readFileSync('/home/admin1/Desktop/sharanya/fundooApp/test/test.json');
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

describe('addNote', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/addNote').send(data.addNote).end((err, data) => {
            console.log(data.addNote)
            data.should.have.status(200);

            done();
        })
    })
})

describe('addNoteWrong', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/addNote').send(data.addNotesWrong).end((err, data) => {

            data.should.have.status(404);

            done();
        })
    })
})

describe('updateNotes', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/updateNotes').send(data.updateNotes).end((err, data) => {

            data.should.have.status(200);

            done();
        })
    })
})

describe('updateNotesWrong', function () {
    let data = readf();
    it('status', function (done) {
        chai.request(server).post('/updateNotes').send(data.updateNotesWrong).end((err, data) => {

            data.should.have.status(404);

            done();
        })
    })
})



