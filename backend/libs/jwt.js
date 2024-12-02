const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    const api = process.env.API_ROUTE;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS', 'POST', 'PATCH'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/login`,
            `${api}/register`,
            `${api}/upload_image`,
            { url: new RegExp(`${api}/.*`), methods: ['GET'] },
            `${api}/orders`,
            { url: /\/api\/v1\/coupons(.*)/, methods: ['GET', 'OPTIONS', 'POST', 'PUT'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS', 'POST', 'PUT'] }
        ]
    })
}

async function isRevoked(req, token){
    //console.log(token)
    //console.log(req.auth)
    if(!token.payload.isAdmin) {
       return true;
    }
}

module.exports = authJwt