import axios from 'axios'
import Qs from 'qs'

var http = axios.create({
    // baseURL: 'http://www.ciservermanager.tt',
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }]
})

export function deleteServer(id){
    return http.delete('/server/',id);
}

export function getServers(){
    return http.get('/server/lists');
}

export function addServer(data){
    return http.post('/server',data);
}

export function updateServer(data){
    return http.put('/server',data);
}

export function getServer(id){
    return http.get('/server/' + id);
}