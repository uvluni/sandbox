const server = require('../../../index');
const test = require('ava');
const http = require('ava-http');
const locationsApi = 'http://localhost:9000/api/locations';

test('It should get XXXXXXXXXX', async t => {
    const res = await http.get(locationsApi);
    t.true(typeof res === 'object');

    // t.true(typeof res.body, 'array');
});

test('It should  XXXXXXX', async t => {
    const body = {
        imageUrl:
            'https://a0.muscache.com/im/pictures/09fbbef3-7872-4747-a1b9-257eb07ad1d9.jpg?aki_policy=xx_large',
        title: 'Best apartment ever',
        address: [
            {
                city: 'Jerusalem',
                country: 'Israel'
            }
        ]
    };

    const res = await http.post(locationsApi, body);

    t.true(typeof res === 'object');
});
