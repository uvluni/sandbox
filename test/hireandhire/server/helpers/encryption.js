// const bcrypt = require('bcryptjs');

// module.exports = {
//   hashPassword: async (req, res, next) =>{
//     try {

//       if(!req.body.password){
//         return res.status(403).json({ error: 'fuck off need password' });
//       }
//       // Generate a salt
//       const salt = await bcrypt.genSalt(10);
//       // Generate a password hash (salt + hash)
//       const passwordHash = await bcrypt.hash(req.body.password, salt);
//       // Re-assign hashed version over original, plain text password
//       req.body.password = passwordHash;
//       next();
//     } catch(error) {
//       next(error);
//     }
//   },

//   // use this for login to find if the user send you a good password
//   isValidPassword: async (newPassword, userPassword) => {
//     try {
//       return await bcrypt.compare(newPassword, userPassword);
//     } catch(error) {
//       throw new Error(error);
//     }
//   }
// }
