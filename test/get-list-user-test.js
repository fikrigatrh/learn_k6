import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import * as TEST_DATA from '../data/user-data.js';
import { listUser } from '../step/get-list-user-step.js';
import { sleep } from "k6";

export const options = {
    scenarios: {
        stress: {
            executor: "ramping-arrival-rate",
            preAllocatedVUs: 200,
            timeUnit: "1s",
            stages: [
                { duration: "1m", target: 10 }, // below normal load
                { duration: "2m", target: 10 },
                { duration: "2m", target: 20 }, // normal load
                { duration: "2m", target: 20 },
                { duration: "2m", target: 30 }, // around the breaking point
                { duration: "1m", target: 30 },
                { duration: "1m", target: 40 }, // beyond the breaking point
                { duration: "2m", target: 40 },
                { duration: "3m", target: 0 }, // scale down. Recovery stage.
            ],
        },
    },
};

export default function () {

    describe('User: List User', () => {
        const response = listUser(TEST_DATA.GET_LIST_USER)
        if (response.status === 200) {
            console.log(response.body)
        }

        //assertion
        expect(response.status, 'API status code').to.equal(200)
        expect(response).to.have.validJsonBody()
        expect(response.json()['data'][0]['id'], 'ID User').to.equal(7)
    })
}