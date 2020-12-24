const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    user_email: {
        type: String
    },
    user_password: {
        type: String

    }, 
    user_firstname: {
        type: String
    },
	user_lastname: {
        type: String
    },
	user_type: {
        type: String
    },
    user_phone: {
        type: String
    },
    user_emp_id: {
        type: String
    },
    user_location: {
        type: String
    },
    user_image: 
    { 
        type: String 
    },
    user_dob: 
    { 
        type: String 
    },
    user_manager_id: 
    { 
        type: String 
    },
    user_team_id: 
    { 
        type: String 
    },
    user_project_id: 
    { 
        type: String 
    },
    user_primary_skill: 
    { 
        type: String 
    },
    user_secondary_skill: 
    { 
        type: String 
    },
    user_primary_skil_level: 
    { 
        type: String 
    },
    user_secondary_skill_level: 
    { 
        type: String 
    },
    user_training_completed: 
    { 
        type: String 
    },
    user_training_ongoing: 
    { 
        type: String 
    }	
    },{ collection : 'user' })

module.exports = mongoose.model('user',userSchema)