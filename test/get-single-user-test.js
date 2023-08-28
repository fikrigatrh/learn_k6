import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import * as TEST_DATA from '../data/user-data.js';
import {singleUser} from '../step/get-single-user-step.js';
import { sleep } from "k6";

export const options = {
    scenarios: {
        spike: {
            executor: "ramping-arrival-rate",
            preAllocatedVUs: 1000,
            timeUnit: "1s",
            stages: [
                { duration: "10s", target: 10 }, // below normal load
                { duration: "1m", target: 10 },
                { duration: "10s", target: 140 }, // spike to 140 iterations
                { duration: "3m", target: 140 }, // stay at 140 for 3 minutes
                { duration: "10s", target: 10 }, // scale down. Recovery stage.
                { duration: "3m", target: 10 },
                { duration: "10s", target: 0 },
            ],
            gracefulStop: "2m",
        },
    },
};
export default function () {

    describe('User: Single User', () => {
        const response = singleUser(TEST_DATA.GET_SINGLE_USER_ONE.id, TEST_DATA.GET_SINGLE_USER_TWO.id)
        if (response.status !== 200) {
            console.log(response.body)
        } else {
            console.log(response.body)
        }

        //assertion
        expect(response.status, 'API status code').to.equal(200)
        expect(response).to.have.validJsonBody()
    })
}