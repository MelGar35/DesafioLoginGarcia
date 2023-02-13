import {Router} from "express"
import { userModel} from "../models/users.models.js"

const router = Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
  
  
    try {
      const user = await userModel.findOne({ email, password })
      if (!user) return res.status(400).json({ message: 'User not found' })
  
      user["password"] = undefined;//no guarda la contraseña.
      req.session.user = user;
  
      res.status(200).redirect("/profile");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  
  router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    try {
      const registeredUser = await userModel.findOne({ email, password });
      if (registeredUser) return res.status(400).json({ message: 'this User already exists' })
      let isAdmin;
      role === 'admin' ? isAdmin = true : null
      const user = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password,
        role,
        isAdmin
      })
      res.status(200).redirect('/login')
    } catch (error) {
      res.status(400).json({ error })
    }
  })
  
  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })
  
  export default router;