import Validator from 'validatorjs';
import 'validatorjs/dist/lang/id';

Validator.useLang('id');
const validator = async ({ body, message, rules }, callback) => {
  const validation = new Validator(body, rules, message);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

export default validator;
