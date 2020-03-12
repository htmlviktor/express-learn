const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is start on PORT: ${PORT}`);
});
