const app = require('./app/routes.js');

const PORT = 3000;

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

module.exports = app;