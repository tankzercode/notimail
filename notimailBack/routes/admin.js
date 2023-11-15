var express = require('express');
const adminModal = require('../database/adminModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = adminModal

const userModel = require('../database/userModel');
const user = userModel

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});




router.post('/register', async function (req, res) {
    console.log(req.body)
    if (!req.body) {
        res.status(401).send({ message: "missing informations" })

    }
    if (req.body === undefined) {
        res.status(401).send({ message: "missing informations" })
    }
    else {
        const exist = await admin.findOne({ email: req.body.email })
        if (exist) {
            res.status(401).send({ message: "user already exist" })
        } else if (req.body.password === "" || req.body.email === "" || req.body.name === "" || req.body.surName === "") {
            res.status(401).send({ message: "missing informations" })
        }
        else if (req.body.password === null || req.body.email === null || req.body.name === null || req.body.surName === null) {
            res.status(401).send({ message: "missing informations" })
        }
        else {
            const data = {
                name: req.body.name,
                userName: req.body.surName,
                email: req.body.email,
                code: "",
                access_token: "",
                role: "admin"

            }

            const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1500s' });
            data.access_token = token;
            // generate salt to hash password
            // now we set user password to hashed password
            const salt = await bcrypt.genSalt(10);
            data.code = await bcrypt.hash(req.body.code, salt);
            console.log(data)
            const User = new admin(data)
            await User.save().then((doc) => console.log("df")).catch((error) => res.status(401).send({ message: "une erreur est survenue" }));
            User.code = null
            res.cookie("token", data.access_token, {
                httpOnly: true,
            })
            res.status(200).send({ message: "user created", token: data.access_token, user: User });

        }
    }

});



router.post('/users', async function (req, res) {
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
                phone_number : req.body.phone_number,
                has_mail: false,
                is_admin : true,
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
    
            res.status(200).send({ message: "user created"});

        }
    }

});






router.post('/login', async function (req, res) {
    const look = await admin.findOne({ email: req.body.email })
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
                    email: req.body.email,
                    access_token: "",
                    // mail: "TOKEN" 
                }


                const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '500s' });
                console.log("\n tocken sign : \n" + token)
                data.access_token = token;
                const filter = { email: req.body.email }
                const update = { access_token: token }
                async function update_user() {
                    let doc = await admin.findOneAndUpdate(filter, update);
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
        res.status(403).send({ message: "no user with this email" })
    }

})





module.exports = router;