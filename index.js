//Dependencies
const morgan =  require("morgan"); 
const express = require('express');
const app = express();
//Routers
const employees = require('./routes/employees');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/employees", employees);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running..."); 
});


// condicion ? valor si verdadero : valor si falso

/*
Get - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/