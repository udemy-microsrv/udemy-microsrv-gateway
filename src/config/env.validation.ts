import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
  NATS_SERVERS: Joi.string().required(),
}).unknown(true);
