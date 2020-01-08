
import { APIgoodsList } from '../fetch.js';

layui.use(['laypage'], function () {
    var laypage = layui.laypage;

var key = '';
var order = 'price';
var sort = 'asc';
var page = 1;
var pageSize = 20;

rederlist(true)

$('#but').click(function(){
    key = $('#inp').val();
    rederlist(true)
})
$('#name-up').click(function(){
    order = 'name';
    sort = 'asc';
    rederlist(true)
})
$('#name-down').click(function(){
    order='name';
    sort = 'desc';
    rederlist(true)
})
$('#price-up').click(function(){
    order = 'price';
    sort = 'asc';
    rederlist(true)
})
$('#price-down').click(function(){
    order = 'price';
    sort = 'desc';
    rederlist(true)
})

function rederlist(tag) {
    APIgoodsList({
        key,
        sort,
        order,
        page,
        pageSize
    }).then(data => {
        var { code, data,count } = data;
        console.log(data)
        if (code) {
            var html = ''
            data.forEach(({ name, price, img, id }) => {
                html += `
                <li id="watch">
                    <a href="./listpage.html?id=${id}" target="_blank">
                    <img id="image" src="${img}" alt="">
                    <p id="name" href="">${name}</p>
                    <span id="price">售价￥${price}</span>
                    </a>
                </li>
                `
            })
            $('#ul').html(html);

            if (tag) {
                laypage.render({
                  elem: 'pagation'
                  , count: count * 1 // 数据总数，从服务端得到
                  // , page
                  , limit: pageSize
                  , jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
      
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
      
                    //首次不执行
                    if (!first) {
      
                      page = obj.curr;
      
                      // page++;
                      //do something
                      rederlist(false); // 不重新渲染分页插件
                    }
                  }
                });
              }
        }
    })
}
})