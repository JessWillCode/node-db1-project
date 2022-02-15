const Accounts = require('./accounts-model');
const yup = require('yup');

const accountSchema = yup.object({
  name: yup.string()
  .trim()
  .min(3, "name of account must be between 3 and 100")
  .max(100, "name of account must be between 3 and 100")
  .required(),
  budget: yup.number()
  .required()
  .positive("budget of account is too large or too small" )
  .max(1000000, "budget of account is too large or too small" )
})

exports.checkAccountPayload = async (req, res, next) => {
 try {
  const validated = await accountSchema.validate(req.body);
  req.account = validated;
  next();
 } catch (err) {
   res.status(400).json({
     message: "name and budget are required"
   })
 }
}

exports.checkAccountNameUnique = (req, res, next) => {
  Accounts.getById(req.params.id)
  .then(name => {
    if(name) {
      res.status(400).json({
        message: "that name is taken"
      })
    } else {
      req.account = name;
      next();
    }
  })
  .catch(next);
}

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
  .then(id => {
    if(id) {
      req.account = id;
      next();
    } else {
      res.status(404).json({
        message: "account not found"
      })
    }
  })
  .catch(next);
}
