const bodyParser = require('body-parser')
const morgan =  requiere("morgan"); 
const express = require('express');
const app = express();
const pokemon = require('./route/pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => { 
    return res.status(200).send("Bienvenido al Pokedex");
});

app.use("/pokemon", pokemon);

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