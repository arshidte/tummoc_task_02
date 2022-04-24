import bcrypt from 'bcryptjs';
const users = [
    {
        name: 'Arshid',
        email: 'arshiddiyan.te.adte@gmail.com',
        password: bcrypt.hashSync('arshid123', 10)
    },
    {
        name: 'User01',
        email: 'user01@example.com',
        password: bcrypt.hashSync('user123', 10)
    },
]

export default users;