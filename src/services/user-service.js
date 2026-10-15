const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch(error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    async delete(userId) {
        try {
            return await this.userRepository.destroy(userId);
        } catch(error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try{
            //Step 1: Fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //Step 2: Compare incoming password with the stored encrypted password
            if(!user){
                throw new Error('User not found');
            }
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch){
                console.log("Password does not match");
                throw new Error('Incorrect Password');
            }

            //Step 3: If password matches, create a token
            const newJWT = this.createToken({
                email: user.email,
                id: user.id
            });
            return newJWT;
            
        } catch(error) {
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw new Error('Invalid token');
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw new Error('User not found');
            }
            return user.id;
        } catch(error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {
                expiresIn: '1d'
            });
            return result;
        } catch(error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch(error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch(error) {
            console.log("Something went wrong in password check");
            throw error;
        }
    }


}

module.exports = UserService;