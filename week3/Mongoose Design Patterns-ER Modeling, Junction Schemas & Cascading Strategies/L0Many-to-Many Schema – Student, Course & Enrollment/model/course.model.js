const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
  title: String,
  description: String,
  isActive: { type: Boolean, default: true }
})

const Course=mongoose.model("Many-to-many-course",courseSchema)

module.exports=Course
