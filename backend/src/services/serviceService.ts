import { query } from '../database/connection';

export interface IService {
  id?: number;
  freelancer_id: number;
  title: string;
  description: string;
  price: number;
}

export const createService = async (service: IService) => {
  const { freelancer_id, title, description, price } = service;
  const result = await query(
    'INSERT INTO services (freelancer_id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [freelancer_id, title, description, price]
  );
  return result[0];
};

export const getServices = async () => {
  const result = await query('SELECT * FROM services');
  return result;
};

export const getServiceById = async (id: number) => {
  const result = await query('SELECT * FROM services WHERE id = $1', [id]);
  return result[0];
};