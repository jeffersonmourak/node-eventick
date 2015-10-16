var expect = require('expect.js');

var Eventick = require('./index');

var eventick = new Eventick('your-email@domain.com', 'password'); //change your-email@domain.com to your email and password to your password
var eventId = false; //put here a valid event ID
var userId = false; //put here a valid user ID

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