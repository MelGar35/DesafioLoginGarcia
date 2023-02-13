import {Router} from 'express'

const router = Router()

const loggedIn = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }

  next()
}

router.get('/login', loggedIn, (req,res) => {
    res.render('login')
  })
  
router.get('/', (req,res) => {
    res.render('index')
  })
  
  
router.get('/register', loggedIn, (req,res) => {
    res.render('register')
  })
  
router.get('/profile', (req,res) => {
    if (!req.session.user) 
    return res.redirect('/login') 
    res.render('profile', {user:req.session.user})
  })
  
  
export default router;