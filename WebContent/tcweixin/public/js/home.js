/**
 * Created by liqiang on 2017/2/6.
 */
function logout(){
    if(confirm('您确定退出吗？')){
        $.get("http://localhost:3000/logout", function (data) {
            if(data.isSuccess!='0'){
                alert(data.errorMsg)
            }else{
                location.href='http://localhost:3000';
            }
        })
    }


}
function addUser(){
    if(confirm('您确定添加用户吗？')){
        $.get("http://localhost:3000/addUser", function (data) {
            if(data.isSuccess!='0'){
                alert(data.errorMsg)
            }else{
                location.reload()
            }
        })
    }


}
function updateUser(){
    if(confirm('您确定修改用户吗？')){
        $.get("http://localhost:3000/updateUser", function (data) {
            if(data.isSuccess!='0'){
                alert(data.errorMsg)
            }else{
                location.reload()
            }
        })
    }


}
function deleteUser(){
    if(confirm('您确定删除用户吗？')){
        $.get("http://localhost:3000/deleteUser", function (data) {
            if(data.isSuccess!='0'){
                alert(data.errorMsg)
            }else{
                location.reload()
            }
        })
    }


}

function findCars(){
    $.get("http://localhost:3000/findCars", function (data) {
        if(data.isSuccess!='0'){
            alert(data.errorMsg)
        }else{
            var cars=data.cars;
            cars.forEach(function (item) {
                $(".cars").append("<div class='car'>"+item.CAR_NUM+"</div>");
            })



            //$(".cars").html();
            //location.href='http://localhost:3000';
        }
    })
}

findCars();