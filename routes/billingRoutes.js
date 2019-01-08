const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });

    req.user.credits += charge.amount / 100.0;
    const user = await req.user.save();
    res.send(user);
  });

  app.get('/api/stripe', requireLogin, (_, res) => {
    console.log('here');

    res.send('stripe');
  });
};
