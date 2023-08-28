import http from 'k6/http'
import {URL} from 'https://jslib.k6.io/url/1.0.0/index.js';
import {config} from '../data/env.js'


export function singleUser(userId1, userId2) {

    const url1 = new URL(`${config().SingleUser(userId1)}`)
    const url2 = new URL(`${config().SingleUser(userId2)}`)

    console.log(url1 + " <<<<<<")
    console.log(url2 + " <<<<<<")
    const params = {
        headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${authorization}`
        }
    }

    // const response = http.get(url.toString(), params)

    return http.batch([
        ["GET", url1.toString(), params],
        ["GET", url2.toString(), params],
    ])
}