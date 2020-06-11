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
        document.querySelector('.btn-primary').addEventListener('click', buscar);
     }
     else{
         window.location.href="buscar.html";
     }
};

function buscar(name) {
    var name = document.getElementById('input-name').value;

    axios.get(url + `/employees/${name}`, headers)
    .then(function(res) {
        console.log(res);
        displayEmployes(res.data.message);
        window.location.href = "registros.html";
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmployes(employees) {
    var body = document.querySelector("body");
    for(var i = 0; i < employees.length; i++) {
        body.innerHTML += alert(`${employees[i].emp_id}, ${employees[i].emp_name}, ${employees[i].emp_last_name}, ${employees[i].emp_phone}, ${employees[i].emp_mail}, ${employees[i].emp_address}`);
    }
}


