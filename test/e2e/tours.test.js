const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected Error 200');
    return res;
};

describe('Tours tests', () => {
    beforeEach(() => dropCollection('tours'));
    
    //defining data sets for tests
    let circusWalrus;
    let walrusWorld;

    const circusWalrusData = {
        title: 'Circus Walrus 2018 Tour',
        activities: ['trained walruses', 'fire eaters'],
        launchDate: new Date(2018, 7, 18),
        stops: [
            {
                location: {
                    city: 'Black Betsy',
                    state: 'WV',
                    zip: 25159
                },
                weather: {
                    temperature: 80,
                    conditions: 'sunny and humid'
                },
                attendance: 400
            }, {
                location: {
                    city: 'Big Ugly Creek',
                    state: 'WV',
                    zip: 25524
                },
                weather: {
                    temperature: 84,
                    conditions: 'sunny and hot'
                },
                attendance: 310
            }]
    };

    beforeEach(() => {
        
        return request 
            .post('/api/tours')
            .send(circusWalrusData)
            .then(checkOk)
            .then(({ body }) => circusWalrus = body);
            });

    const walrusWorldData = {
        title: 'Wonderful World of Walruses 2018',
        activities: ['trained walruses', 'fire eaters', 'Clam eating contest'],
        launchDate: new Date(2018, 7, 18),
        stops: [
            {
                location: {
                    city: 'Burnt Corn',
                    state: 'AL',
                    zip: 36401
                },
                weather: {
                    temperature: 88,
                    conditions: 'cloudy and humid'
                },
                attendance: 292
            }, {
                location: {
                    city: 'Blue Eye',
                    state: 'AL',
                    zip: 35096
                },
                weather: {
                    temperature: 84,
                    conditions: 'sunny and hot'
                },
                attendance: 501
            }]
    };

    beforeEach(() => {
        
        return request 
            .post('/api/tours')
            .send(walrusWorldData)
            .then(checkOk)
            .then(({ body }) => walrusWorld = body);
            });
    });

    it('returns ALL tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body[0].title, walrusWorld.title);
                assert.deepEqual(body[1].title, circusWalrus.title);
            });
    });

    it('GET tour by Id', () => {
        return request
            .get(`/api/tours/${walrusWorld._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, walrusWorld);
            });
    });

    it('saves a tour', () => {
        assert.isOk(walrusWorld._id);
    });



});
