const router = require('express').Router();
const Accounts = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
 try {
  const accounts = await Accounts.getAll();
  res.json(accounts);
 } catch (err) {
   next(err)
 }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.account)
  .then(account => {
    res.status(201).json(account);
  })
  .catch(next);
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.account)
  .then(account => {
    res.status(200).json(account);
  })
  .catch(next);
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id);
      res.json(req.account);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    });
})

module.exports = router;