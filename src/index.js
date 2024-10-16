const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let users = [];
let nextUserId = 1;

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = nextUserId++;
    users.push(user);
    res.status(201).send(user);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user)
        res.send(user);
    else
        res.status(404).send({ error: 'User not found' });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1)
    {
        users[userIndex] = {...users[userIndex], ...updatedUserData};
        res.status(200).send(users[userIndex]);
    }
    else
        res.status(404).send({ error: 'User not found' });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1)
    {
        users.splice(userIndex, 1);
        res.status(204).send();
    }
    else
    {
        res.status(404).send({
            error: 'User not found'
        });
    }
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing