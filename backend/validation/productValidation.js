import Joi from "joi";

export default function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
  });

  return schema.validate(data);
}
