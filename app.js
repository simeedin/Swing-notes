const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000

const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./docs/docs.json');

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');



app.use(express.json());
app.use('/api/docs', swaggerUI.serve);
app.use('/api/docs', swaggerUI.setup(apiDocs));
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);




app.listen(PORT, () => {
    console.log('Server is running');
})