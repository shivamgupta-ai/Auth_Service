const express = require('express')
const bodyParser = require('body-parser');


const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const { User } = require('./models/index');
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository');

const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);
    
    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`); 
        
        // const repo = new UserRepository();
        // const response = await repo.getById(10);
        // console.log(response);
        // const incomingPassword = '245324565'
        // const user = await User.findByPk(10);
        // const response = bcrypt.compareSync(incomingPassword, user.password);
        // console.log(response);

        const userService = new UserService();
        // const newToken = userService.createToken({
        //     email: 'yogesh@gmail.com',
        //     id: 9
        // });
        // console.log("Token created ", newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvZ2VzaEBnbWFpbC5jb20iLCJpZCI6OSwiaWF0IjoxNzg4MDg0NTkwLCJleHAiOjE3ODgwODQ2MjB9.I0OyubSJJ0lqFj89P7UvxNpqEWxtC4ePpKBICtaP79M'
        // const response = userService.verifyToken(token);
        // console.log(response);
    });
}
prepareAndStartServer();