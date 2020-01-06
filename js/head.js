import { getCookie, removeCookie } from './cookie.js'

   $('#login').click(function(){
       sessionStorage.setItem('login-url',location.href)
       console.log(666)
   })
   
   var username = getCookie('login_user');
   console.log(username);

   console.log($('#username'))

   if(username){
    $('#username').html(username);
       $('#tt').show()
       $('.no').hide()
   }else{
       $('.no').show();
       $('#tt').hide()
   }

   $('#tt').click(function(){
       removeCookie('login_user');
       location.reload()
   })

