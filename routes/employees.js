const express =  require("express");
const employees = express.Router();
const db = require('../config/database');

employees.post("/", async (req, res, next)=>{
    const {emp_name, emp_last_name, emp_phone, emp_mail, emp_address} = req.body;

    if(emp_name && emp_last_name && emp_phone && emp_mail && emp_address){
        let query = "INSERT INTO employees (emp_name, emp_last_name, emp_phone, emp_mail, emp_address) ";
        query += `VALUES ('${emp_name}', '${emp_last_name}', ${emp_phone}, '${emp_mail}', '${emp_address}')`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Empleado registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employees.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE emp_id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).jason({ code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).jason({ code: 404, message: "Empleado no encontrado"});
});

employees.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { emp_name, emp_last_name, emp_phone, emp_mail, emp_address} = req.body;

    if(emp_name && emp_last_name && emp_phone && emp_mail, emp_address){
        let query = `UPDATE employees SET emp_name='${emp_name}', emp_last_name='${emp_last_name}',`;
        query += `emp_phone=${emp_phone}, emp_mail='${emp_mail}', emp_address='${emp_address}' WHERE emp_id=${req.params.id}`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Empleado actualizado Correctamente"});
        }
        
        return res.status(500).json({ code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

employees.patch("/:id([0-9]{1,3})", async (req, res, next) => {

    if (req.body.emp_name) {
        let query = `UPDATE employees SET emp_name='${req.body.emp_name}' WHERE emp_id=${req.params.id}`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Empleado actualizado Correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error "});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employees.get('/', async (req, res, next) => {
    const emps = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 200, message: emps });
});

employees.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 1 && id <= 722) {
        const emps = await db.query("SELECT * FROM employees WHERE emp_id=" + id + ";");
        return res.status(200).jason({code: 200, message: emps });
    }
    return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
});
 
employees.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const emps = await db.query("SELECT * FROM employees WHERE emp_name=" + name + ";");
    if(emps.lenght > 0) {
        return res.status(200).json({ code: 200, message: emps });
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado"});
});

module.exports = employees;