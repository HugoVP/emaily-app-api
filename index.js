const express = require('express');

require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

app.get('/test', (req, res) => {
  res.send('test');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
