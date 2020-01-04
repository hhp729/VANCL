import {ajax} from './ajax.js'

function request(path,data,type = 'get'){
    return new Promise(function(resolve,reject
        ){
            ajax({
                path,
                data,
                type,
                successCB:function(data){
                    resolve(data);
                }
            })
        })
}

var base = 'http://127.0.0.1/1912';

//用户注册
var APIuserRegister = params =>request(`${base}/resgiter.php`,params);

//用户登录
var APIuserLogin = params =>request(`${base}/login.php`,params);

//商品列表
var APIgoodsList = params =>request(`${base}/goodslist.php`,params);

//商品详情
var APIgoodsDetail = params =>request(`${base}/page.php`,params);


export{
    APIuserRegister,
    APIuserLogin,
    APIgoodsList,
    APIgoodsDetail
}

