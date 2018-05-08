import * as express from 'express';
import * as crypto from 'crypto';
import * as jsonwebtoken from 'jsonwebtoken';

import { UserService } from './user.service';

const userService = new UserService();

const controller = express.Router();

controller.post('/createUser', async (req, res) => {
    let user = req.body.newUser;
    const dbUser = await userService.getUser(user.email);
    if(dbUser) {
        res.status(409).send({message: "User creation failed: User already exists"});
    } else {
        user.salt = crypto.randomBytes(16).toString('hex');
        user.hash = crypto.pbkdf2Sync(user.password, user.salt, 1000, 64, 'sha512').toString('hex');
        const id = await userService.createUser(user);
        console.log("Created user with ID", id);
        res.send({id: id});
    }
});

controller.post('/authUser', async(req, res) => {
    let user = req.body.user;
    const dbUser = await userService.getUser(user.email);
    if(dbUser) {
        let hash = crypto.pbkdf2Sync(user.password, dbUser.salt, 1000, 64, 'sha512').toString('hex');
        if(dbUser.hash === hash) {
            let expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);
            let jsonToken = jsonwebtoken.sign({
                _id: dbUser._id,
                email: dbUser.email,
                name: dbUser.firstname,
                exp: expiry.getTime() / 1000
            }, process.env.AUTHAPIKEY);
            res.send({token: jsonToken});
        } else {
            res.status(401).send({message: "Authentication Failed: Incorrect password"});
        }
    } else {
        res.status(401).send({message: "Authentication Failed: User not found"});
    }
    
});

export { controller as UserController };
