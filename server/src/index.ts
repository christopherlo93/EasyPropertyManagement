import * as cors from 'cors';
import * as express from 'express';
import * as expressjwt from 'express-jwt';
import * as dotenv from 'dotenv';
dotenv.config();


import { PropertyController } from './properties/property.controller';
import { UserController } from './users/user.controller';

const app = express();

const auth = expressjwt({
    secret: process.env.AUTHAPIKEY
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', auth, PropertyController);
app.use('/api/users', UserController);
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).send({message: err.name + ": " + err.message});
    }
});

app.listen(3000, () => console.log('Server started at http://localhost:3000/'))
