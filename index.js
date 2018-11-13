const express = require('express');
const mongoose = require('mongoose');

require('./services/passport');

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

const app = express();

require('./routes/authRoutes')(app);

app.get('/test', (req, res) => {
  res.send('test');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
