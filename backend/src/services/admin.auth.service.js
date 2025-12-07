const Joi = require('joi');

class AdminAuth {

    registerAdmin = async (data) => {
        try {
            let rules = Joi.object({
                email: Joi.string()
                    .email({ tlds: { allow: false } })
                    .required()
                    .lowercase()
                    .label('Email Address')
            })
            return await rules.validateAsync(data)
             
        } catch (error) {
            throw (error)
        }
    }

    loginAdmin = async (data) => {
       try {
            let rules = Joi.object({
                email: Joi.string()
                    .email({ tlds: { allow: false } })
                    .required()
                    .lowercase()
                    .label('Email Address')
            })
            return await rules.validateAsync(data)
           
           


        } catch (error) {
            throw (error)
        }
        
        

    }

    verifyOtpAdmin = async (data) => {
        try{
        // 1. Validate email + otp
        let rules = Joi.object({
            email: Joi.string()
                .email({ tlds: { allow: false } })
                .required()
                .lowercase()
                .label("Email Address"),

            otp: Joi.string()
                .length(6)
                .pattern(/^[0-9]+$/)
                .required()
                .label("OTP")
        });
          return await rules.validateAsync(data);
          } catch (error) {
            throw (error)
        }
        

      
    
}}

const adminSVC = new AdminAuth()
module.exports = adminSVC
