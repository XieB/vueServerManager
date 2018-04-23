let Mock = require('mockjs');

Mock.mock('/server/lists','get',()=>{
    return Mock.mock({
        'list|10' : [{
            'ip' : '@IP',
            'area': '@natural(1,2)',
            'exptime': '@datetime',
            'opentime': '@datetime',
            'marsk' : '@csentence(1,3)',
        }]
    }).list;
})