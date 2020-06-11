window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployees();
    }
    else {
        window.location.href = "index.html";
    }
}

function loadEmployees() {
    axios.get(url + "/employees", headers)
    .then(function(res) {
        console.log(res);
        displayEmployes(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmployes(employees) {
    var body = document.querySelector("body");
    for(var i = 0; i < employees.length; i++) {
        body.innerHTML += `<h3>${employees[i].emp_id}, ${employees[i].emp_name}, ${employees[i].emp_last_name}, ${employees[i].emp_phone}, ${employees[i].emp_mail}, ${employees[i].emp_address} </h3>`;
    }
}

