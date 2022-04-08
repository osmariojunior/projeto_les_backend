const express =  require('express');
const port = process.env.PORT || 5000;

const usersRoutes = require('./routes/users.routes')

const server = express();

server.use('/users', usersRoutes);

server.get('/', (req, res) => {
    res.send('Hello world');
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

