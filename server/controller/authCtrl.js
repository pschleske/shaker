import { User } from '../model.js';
import bcrypt from "bcryptjs";

export default {
    allUsers: async (req, res) => {
        try {
            console.log("hit getAllUsers")
            const users = await User.findAll()
            res.status(200).send(users)
        } catch (err) {
            console.log(err)
            res.status(500).send("Something went wrong!")
        }
    },

    register: async (req, res) => {
        console.log('hit Register')
        try {
            const { username, imgUrl, email, password } = req.body;

            const foundUser = await User.findOne({ where: { email } })

            if (foundUser) {
                res.status(400).send('This username is already taken!')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({ username, imgUrl, email, hashedPass: hash })

                req.session.user = {
                    userId: newUser.id,
                    username: newUser.username,
                    imgUrl: newUser.imgUrl,
                    email: newUser.email
                }
                res.status(200).send(req.session.user)
            }
        } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong trying to register')
        }
    },

    login: async (req, res) => {
        console.log('hit Login')
        try {
            const { username, password } = req.body;

            const foundUser = await User.findOne({
                where: { username }
            });
            if (!foundUser) {
                res.status(400).send("Couldn't find user with that email")
            } else {
                const isAuthenticated = await bcrypt.compareSync(password, foundUser.hashedPass)
                if (isAuthenticated) {
                    req.session.user = {
                        userId: foundUser.userId,
                        username: foundUser.username,
                        email: foundUser.email,
                    }
                    console.log(req.session.user)
                    req.session.save((error) => {
                        if (error) {
                            console.error('Error saving session', error)
                        } else {
                            res.status(200).send(req.session.user)
                        }
                    })
                    // res.status(200).send(req.session.user)
                } else {
                    res.status(401).send('Invalid password')
                }
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    },

    logout: async (req, res) => {
        console.log('hit logout')
        req.session.destroy();
        res.sendStatus(200);
    },
}