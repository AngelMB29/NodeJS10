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
        document.querySelector('.btn-primary').addEventListener('click', eliminar);
     }
     else{
         window.location.href="eliminar.html";
     }
};

function eliminar(id) {
    var id = document.getElementById('input-id').value;

    axios.delete(url + `/employees/${id}`, headers).then(function(res) {
        console.log(res);
        alert("Empleado borrado con exitoso")
        window.location.href = "registros.html";
    }).catch(function(err) {
        console.log(err);
    })
}
