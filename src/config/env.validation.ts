import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
  NATS_SERVERS: Joi.string()
    .required()
    .regex(/^([a-zA-Z]+:\/\/[^\s,]+)(,[a-zA-Z]+:\/\/[^\s,]+)*$/),
}).unknown(true);
