const baseURL = process.env.REACT_APP_API_URL


export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${baseURL}/${endpoint}`
    // localhost:4000/api/endopoint

    if( method === 'GET' ) {
        return fetch(url)
    }

    return fetch(url, {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify( data )
    })

}

export const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${baseURL}/${endpoint}`
    // localhost:4000/api/endopoint
    const token = localStorage.getItem('token') || ''

    if( method === 'GET' ) {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        }).catch((err)  => {
            console.log(err)
        })
    }

    return fetch(url, {
        method,
        headers: {
            'content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify( data )
    })

}