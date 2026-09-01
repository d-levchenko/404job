import { getOptionsService } from '../services/options.js';

export const getOptions = async (req, res) => {
  const { type } = req.query;
  const options = await getOptionsService(type);
  res.status(200).json(options);
};
