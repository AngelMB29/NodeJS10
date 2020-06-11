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
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = 'registros.html';
        });
        document.querySelector('.btn-primary').addEventListener('click', agregar);
     }
     else{
         window.location.href="agregar.html";
     }
};

function agregar() {
    var name = document.getElementById('input-name').value;
    var last = document.getElementById('input-lastN').value;
    var phone = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;


    axios.post('http://localhost:3000/employees/' ,{
            emp_name: name,
            emp_last_name: last,
            emp_phone: phone,
            emp_mail: mail,
            emp_address: address

    },headers).then(function(res) {
        console.log(res);
        alert("Empleado agregado con exitoso");
        window.location.href = "registros.html";
    }).catch(function(err) {
        console.log(err);
    })
}
