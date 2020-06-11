window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', modificar);
     }
     else{
         window.location.href="modificar.html";
     }
};

function modificar(id) {
    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-name').value;
    var last = document.getElementById('input-lastN').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;


    axios.put(url + `/employees/${id}` ,{
            emp_name: name,
            emp_last_name: last,
            emp_phone: phone,
            emp_mail: mail,
            emp_address: address

    },headers).then(function(res) {
        console.log(res);
        alert("Empleado actualizado con exitoso");
        window.location.href = "registros.html";
    }).catch(function(err) {
        console.log(err);
    })
}

