/**
 * Created by weiguangsun on 2016/6/12.
 */
var newUrl = location.href;
//newUrl = newUrl.replace('localhost', '10.0.69.136');
if(newUrl.indexOf('NodeProject/src/page') !== -1){
  // newUrl = newUrl.replace('/src/page/.?/', '/dev');
  newUrl = location.href.replace(/src\/page\/.{1,}\//, 'dev/')
  location.href = newUrl;
}
