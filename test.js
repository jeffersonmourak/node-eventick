var expect = require('expect.js');

var Eventick = require('./index');

var eventick = new Eventick('jefinho.moura14@gmail.com', '230296s2'); //change your-email@domain.com to your email and password to your password
var eventId = 20533; //put here a valid event ID
var userId = 869946; //put here a valid user ID

function isObject(val) {
    return (typeof val === 'object');
}
function isString(val){
  return (typeof val === 'string');
}

describe('Checking Token', function() {
    it('should return a valid token', function() {
        expect(isString(eventick.token)).to.be.true;
    });
})

describe('Checking Events Data', function() {
    it('events.get() | should return a object', function() {
        expect(isObject(eventick.events.get(eventId))).to.be.true;
    });
    it('events.list() | should return a array', function() {
        expect(Array.isArray(eventick.events.list(eventId))).to.be.true;
    });

    it('events.get().attendees.list() | should return a array', function() {
        expect(Array.isArray(eventick.events.get(eventId).attendees.list())).to.be.true;
    });

    it('events.get().attendees.list(date) | should return a array', function() {
        expect(Array.isArray(eventick.events.get(eventId).attendees.list('2015-10-16 14:42:07 -0300'))).to.be.true;
    });

    it('events.get().attendees.get() | should return a object', function() {
        expect(isObject(eventick.events.get(eventId).attendees.get(userId))).to.be.true;
    });
})

describe('Checking Attendees Data', function() {
    it('attendees.get() | should return a object', function() {
        expect(isObject(eventick.attendees.get(eventId,userId))).to.be.true;
    });
    it('attendees.list() | should return a array', function() {
        expect(Array.isArray(eventick.attendees.list(eventId))).to.be.true;
    });
    it('attendees.list(date) | should return a array', function() {
        expect(Array.isArray(eventick.attendees.list(eventId,'2015-10-16 14:42:07 -0300'))).to.be.true;
    });
})

describe('Checking Checkin function Data', function() {
    it('events.get().attendees.get().checkin() | should return true', function() {
        expect(eventick.events.get(eventId).attendees.get(userId).checkin(new Date().toISOString())).to.be.true;
    });
    it('attendees.get().checkin() | should return true', function() {
        expect(Array.isArray(eventick.attendees.get(eventId,userId).checkin(new Date().toISOString()))).to.be.true;
    });

    it('events.get().attendees.get().check_all() | should return true', function() {
        expect(eventick.events.get(eventId).attendees.check_all([{id:userId, checked_at: new Date().toISOString()}])).to.be.true;
    });
    it('attendees.get().check_all() | should return true', function() {
        expect(Array.isArray(eventick.attendees.check_all(eventId,[{id:userId, checked_at: new Date().toISOString()}]))).to.be.true;
    });
})