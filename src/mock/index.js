let Mock = require('mockjs');


let serverList = {
    'id|+1' : 1,
    'ip' : '@IP',
    'area': ()=>{return Mock.Random.natural(1,2).toString();},
    'exptime': '@datetime',
    'opentime': '@datetime',
    'marsk' : '@csentence(1,3)',
}

Mock.mock('/server/lists','get',()=>{
    return Mock.mock({
        'list|10' : [serverList]
    }).list;
})

// Mock.mock('/server/','delete',()=>{
//     return {
//         status : 1,
//     }
// })

Mock.mock('/server','delete',{
    'status' : '@natural(0,1)',
})

Mock.mock(/^\/server\/\d*$/,'get',serverList);

Mock.mock('/server','post',{
    'status' : '@natural(0,1)'
})

Mock.mock('/server','put',{
    'status' : '@natural(0,1)'
})