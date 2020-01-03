// function ajax(path, data, successCB, type = 'get') {
//   var param = '';
//   for (var key in data) {
//     param += `${key}=${data[key]}&`
//   }
//   param = param.substring(0, param.length - 1);
//   var xhr = new XMLHttpRequest();
//   if (type.toLowerCase() == 'get') {
//     xhr.open(type, `${path}?${param}`, true);
//     xhr.send();
//   } else {
//     xhr.open(type, path, true);
//     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//     xhr.send(param);
//   }
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       var data = xhr.responseText;
//       successCB(data)
//     }
//   }
// }

// ajax('http://api.yytianqi.com/citylist/id/2', function (data) {
//   console.log(data);
// })

// ajax({
//   path: 'http://api.yytianqi.com/citylist/id/2',
//   type: 'post',
//   dataType: 'text',
//   successCB: function (data) {
//     console.log(data);
//   }
// })

 export function ajax(option) {

  var { path, successCB, beforeCB, data = {}, dataType = 'json', type = 'get' } = option;

  var params = '';

  for (var key in data) {
    params += `${key}=${data[key]}&`;
  }

  params = params.substring(0, params.length - 1);

  var xhr = new XMLHttpRequest();

  if (type.toLowerCase() == 'get') {
    xhr.open(type, path + '?' + params, true);
    xhr.send();
  } else {
    xhr.open(type, path, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = xhr.responseText;
      if (dataType == 'json') data = JSON.parse(data);
      successCB && successCB(data);
    } else {
      // beforeCB && beforeCB();
      if (beforeCB) beforeCB();
    }
  }
}

