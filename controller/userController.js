const connection = require('../config/database/db');
const { check, validationResult } = require('express-validator');

const userController = {};

userController.validate = (method) => {
  switch (method) {
    case 'insertUser': {
     return [     
        check('name', 'name empty').not().isEmpty()
    ]   
    }
  }
}

userController.form = (req, res) => {
  res.render('ragister');
}

userController.insertUser = (req, res) => { 
   const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
    const user = req.body;
    sql = 'INSERT INTO users set ?';
    connection.query(sql,user,function(err,result){
    if (err) throw err;
      res.redirect('/users');                                
   });   
}

userController.getUsers = (req, res) => {
    sql = "SELECT * FROM users";
    connection.query(sql,function(err,result){
    if (err) throw err;
      res.render('user-list',{data:result});                                
   });   
}

userController.editUser = (req, res) => {
     const { id } = req.params;
    sql = 'SELECT * FROM users WHERE ID =?';
    connection.query(sql,[id],function(err,row){
    if (err) throw err;
      res.render('user-edit',{data:row[0]});                                
   });   
}
userController.updateUser = (req, res) => {
     const { id } = req.params;
     const updateCustomer = req.body;
    sql = 'UPDATE users set ? where id = ?';
    connection.query(sql,[updateCustomer,id],function(err,row){
    if (err) throw err;
      res.redirect('/users');                                
   });   
}


userController.deleteUser = (req, res) => {
     const { id } = req.params;
    sql = 'DELETE FROM users WHERE ID =?';
    connection.query(sql,[id],function(err,result){
    if (err) throw err;
      res.send('user deleted');                                
   });   
}

module.exports = userController;