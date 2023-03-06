const { check } = require('express-validator');
 
exports.signupValidation = [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should be 6 characters long").isLength({
      min: 6,
    }),
  ]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
]