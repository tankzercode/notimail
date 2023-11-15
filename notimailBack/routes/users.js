var express = require('express');
var router = express.Router();
const userModel = require('../database/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = userModel
/* GET users listing. */



function auth(req, res, next) {
  console.log("\n\n\n");

  console.log(req.cookies.token);
  console.log("\n\n\n");
  if (req.cookies.token) {
    const token = req.cookies.token
    console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, checkuser) => {

      if (err) {
        if (err) {
          console.log(err)
          return res.status(401).send("invalid token")
        }
        console.log(err)
        return res.status(401).send("token doesn't match")
      }

      var result = await user.findOne({ firm_name: checkuser.firm_name })
      if (!result) {
        return res.status(401).send("no user found")
      }

      result.code = ""
      res.result = result
      req.user = result
      next()
    })
  }
  else {
    return res.status(401).send("No token Provide")

  }
}


router.get('/isAuth', auth, (req, res) => {

  res.status(200).send(res.result)

})

router.delete("/:firm_name", auth, async function (req, res) {

  try {
    const users = await user.deleteOne({ firm_name: req.params.firm_name })
    res.status(200).send("users deleted")

  } catch (error) {
    res.status(403).send("error")

  }

})


router.patch("/users/:firm_name", auth, async function (req, res) {
  console.log("sklfjmsdklfj")
  try {
    const users = await user.findOneAndUpdate({ firm_name: req.params.firm_name }, {
      has_mail: false,
      last_picked_up: new Date()

    })
    const renew = await user.find({ firm_name: req.params.firm_name })
    res.status(200).send(renew)
  } catch (error) {
    res.status(403).send(error)
  }
})

router.get("/users", auth, async function (req, res) {

  const users = await user.find({ is_admin: false })

  res.status(200).send(users)
})
router.get("/all", async function (req, res) {

  const users = await user.find({})

  res.status(200).send(users)
})

router.put('/:firm_name', auth, async (req, res) => {

  console.log(req.params)
  const salt = await bcrypt.genSalt(10);

  const pass = await bcrypt.hash(req.body.code, salt);

  try {
    user.findOneAndUpdate({ firm_name: req.params.firm_name }, {
      firm_name: req.body.firm_name,
      first_name: req.body.firm_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      code: pass
    })

    res.status(200).send("donnée modifié")

  } catch (error) {
    console.log(error)
    res.status(403).send("erreur")

  }



})

router.get('/:firm_name', auth, async (req, res) => {
  console.log(req.params.firm_name)
  const users = await user.find({ firm_name: req.params.firm_name })

  res.status(200).send(users[0])
})


router.patch("/", auth, async function (req, res) {

  console.log(req.body)

  for (let index = 0; index < req.body.length; index++) {

    try {
      await user.findOneAndUpdate({ firm_name: req.body[index].firm_name }, { has_mail: true, last_received_mail: new Date() })

    } catch (error) {
      res.status(403).send("erreur")

    }

  }
  // const users = await user.find({ is_admin: false })

  res.status(200).send("users")



})

router.post('/login', async function (req, res) {
  const look = await user.findOne({ firm_name: req.body.firm_name })

  console.log(look)
  if (look) {
    bcrypt.compare(req.body.code, look.code, function (err, bool) {
      if (err) {
        res.status(403).send("invalid cred")
      }
      else if (bool === false) {
        res.status(401).send("invalid password")
      }
      else {
        // refresh tocken
        const role = "user";
        const data = {
          firm_name: req.body.firm_name,
          access_token: "",
          // mail: "TOKEN" 
        }


        const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '500s' });
        console.log("\n tocken sign : \n" + token)
        data.access_token = token;
        const filter = { email: req.body.firm_name }
        const update = { access_token: token }
        async function update_user() {
          let doc = await user.findOneAndUpdate(filter, update);
        }
        update_user()


        res.cookie("token", data.access_token, {
          httpOnly: true,
        })

        look.code = null
        res.status(200).send({ message: "user logged in", token: data.access_token, user: look });
      }
    })
  }
  else {
    res.status(403).send({ message: "no user with this firm name" })
  }

})





router.post('/users', auth, async function (req, res) {
  console.log(req.body)
  if (!req.body) {
    res.status(401).send({ message: "missing informations" })

  }
  if (req.body === undefined) {
    res.status(401).send({ message: "missing informations" })
  }
  else {
    const exist = await user.findOne({ email: req.body.firm_name })
    if (exist) {
      res.status(401).send({ message: "user already exist" })
    }
    else {
      const data = {
        firm_name: req.body.firm_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        has_mail: false,
        is_admin: false,
        code: "",
        access_token: "",

      }
      // generate salt to hash password
      // now we set user password to hashed password
      const salt = await bcrypt.genSalt(10);
      data.code = await bcrypt.hash(req.body.code, salt);
      console.log(data)
      const User = new user(data)
      await User.save().then((doc) => console.log("df")).catch((error) => res.status(401).send({ message: "une erreur est survenue" }));
      User.code = null

      res.status(200).send({ message: "user created" });

    }
  }

});


module.exports = router;
