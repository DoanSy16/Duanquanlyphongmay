

// import db from '../models'
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../connection_database';
import { JSONB, QueryTypes } from 'sequelize';
const hashedPassword = '$2b$10$AsqQ6gmzB0oCozov7crlbO7m9Tf9aEYi2./tRYXyjKJJOpWfZ7LyG'; // Hashed password 

export const Login = ({ mscb, password }) => new Promise(async (resolve, reject) => {
    try {
        console.log('email: ' + mscb);
        console.log('password: ' + password)
        const hash = await bcrypt.hash(password, 10);
        console.log('hash: ',hash)
        const user = await sequelize.query(`select  u.*,r.role_id,r."name" from users u 
                    inner join user_role ur on u.user_id = ur.user_id 
                    inner join roles r on ur.role_id =r.role_id 
                    where u.mscb  ='${mscb}'`, {
            type: QueryTypes.SELECT,
        });

        // const user = await db.User
        //     .findOne({ where: { MSCB: mscb }, include: db.Role });

        // const user = await db.User.findOne({
        //     where: { MSCB: mscb }
        // });
        // console.log(user);
        // console.log('user: ' + user)


        // const match1 = await bcrypt.compare('12345678', '$2b$10$CaR/atFpK4fX4HUmCWYoy.DCZZE7OvHTCABaysTvSmJCKe13owjPi');
        // console.log('match: ',match1)
        //  const result = await bcrypt.compare(password, '$2b$10$Lf1oEoPaVrS8k5C.mZ5BqOUYkkIzLoUXNG4w86Rd3Wik568jH6qAW');
        // console.log('hash: ',hash)
        // console.log('result: ' + JSON.stringify(user));
        // console.log('result: ' +user[0].password);
        if (!user) {
            resolve({
                user: LoginResponse(404, '', 'User not found')
            });
            return;
        }


        // So sánh mật khẩu được giải mã từ client với mật khẩu đã lưu trong cơ sở dữ liệu
        const match = await bcrypt.compare(password, user[0].password);
        console.log('match',match)
        if (match) {
            // Mật khẩu khớp, đăng nhập thành công
            // const roles = user.Roles.map(role => role.name);
            const roles = user[0].name;
            const token = 'Bearer ' + jsonwebtoken(user[0].user_id, user[0].mscb, roles);
            const auth = AuthenticationResponse(user[0].fullname, user[0].user_id, token);
            const loginResponse = LoginResponse(200, auth, 'Login successfully!');
            resolve({ message: 'Đăng nhập thành công', user: loginResponse });
        } else {
            // Mật khẩu không khớp, đăng nhập thất bại
            resolve({
                user: LoginResponse(401, '', 'Incorrect password')
            });
        }
        // resolve({ message: 'find successfully', messages: user });
    } catch (error) {
        reject(error)
        console.log("error in auth login: " + error)
    }
});
const jsonwebtoken = (id, email, role) => {
    const token = jwt.sign({ id: id, email: email, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
}
const AuthenticationResponse = (name, id, token) => {
    const authenticationResponse = {
        name: name,
        id: id,
        // avatar: avatar,
        token: token
    }
    return authenticationResponse;
}
const LoginResponse = (status, authenticationResponse, description) => {
    const loginResponse = {
        status: status,
        authenticationResponse: authenticationResponse,
        description: description
    }
    return loginResponse;

}