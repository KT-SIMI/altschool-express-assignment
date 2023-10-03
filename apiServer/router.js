const express = require('express');
const middleware = require('./middleware')
const controller = require('./controller')

const router = express.Router();

//students
router.get('/get/students', controller.GetStudents)

router.post('/create/student', middleware.CheckProgram, controller.CreateStudents)

router.get('/:id', controller.getOneStudent)

router.patch("/:id", controller.updateStudent)
    
router.delete("/:id", controller.deleteStudent )


module.exports = router