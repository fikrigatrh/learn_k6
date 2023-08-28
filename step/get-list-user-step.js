import http from 'k6/http'
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { config } from '../data/env.js'


export function listUser(requestData) {

    const url = new URL(`${config().ListUser.Users}`)

    url.searchParams.append('page', requestData.page)

    console.log(url + " <<<<<<")
    const params = {
        headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${authorization}`
        }
    }

    const response = http.get(url.toString(), params)

    return response
}