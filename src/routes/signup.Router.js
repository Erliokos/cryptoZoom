const router = require('express').Router()
const {User} = require('../../db/models')
const bcrypt = require('bcrypt')

router.
route('/')
.get((req, res) => {
res.render('signup')
})
.post( async (req, res) => {
const {name, email, password} = req.body
try {
  if(name && email && password) {
    const cryptPas = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password:cryptPas,
    })
    req.session.user = {id: newUser.id, email: newUser.email, password: newUser.password, name: newUser.name}//создаем сессию
    res.sendStatus(200)
    console.log(req.session.user);
  } else {
    res.sendStatus(400)
  }
  
} catch (error) {
  res.sendStatus(500)
}
})
module.exports = router
