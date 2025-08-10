const express=require('express')
const router=express.Router()

const {
    addstudent,
    addcourse,
    enroll,
    isdelete,
    isdeletecourse,
    getcourse,
    getstudents
}=require('../controllers/lms.controller')


//student
router.post('/add-student',addstudent)

//course
router.post('/add-course',addcourse)

//enroll
router.post('/enroll',enroll)


//soft delete
router.delete('/delete/:id',isdelete)

router.delete('/course/:id',isdeletecourse)

//get-students

router.get('/student/:id/course',getcourse)

router.get('/courses/:id/students',getstudents)


module.exports=router