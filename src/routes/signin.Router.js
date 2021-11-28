const router = require('express').Router()
const {User} = require('../../db/models')
const bcrypt = require('bcrypt')

router.
route('/')
.get((req, res) => {
res.render('signin')
})
.post( async (req, res) => {
  try {
  const {email, password} = req.body
  if (email.trim()&&password.trim()) {
    const findUser = await User.findOne({where: {email:email.trim()}})
    if(await bcrypt.compare(password.trim(), findUser.password)){
      req.session.user = { id: findUser.id, name: findUser.name };
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  }
  
} catch (error) {
  res.sendStatus(400)
}
})
module.exports = router
