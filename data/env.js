const Host = {
    Dev: {
        User: 'https://reqres.in/api',
    },
}

const ENV = {
    Development: {
        ListUser: {
            Users: `${Host.Dev.User}/users`,
        },
        SingleUser : (id) => {
            return `${Host.Dev.User}/users/${id}`
        },
    },
}

const DEV = 'dev'

export const config = () => {
    switch (__ENV.STAGE) {
        case DEV:
            return ENV.Development
        default:
            throw `Stage ${__ENV.STAGE} not found`
    }
}