import { query } from '../database/connection';

export interface ICertification {
  id?: number;
  freelancer_id: number;
  name: string;
  issuer: string;
  date_issued: Date;
}

export const addCertification = async (certification: ICertification) => {
  const { freelancer_id, name, issuer, date_issued } = certification;
  const result = await query(
    'INSERT INTO certifications (freelancer_id, name, issuer, date_issued) VALUES ($1, $2, $3, $4) RETURNING *',
    [freelancer_id, name, issuer, date_issued]
  );
  return result[0];
};

export const getCertificationsByFreelancer = async (freelancerId: number) => {
  const result = await query('SELECT * FROM certifications WHERE freelancer_id = $1', [freelancerId]);
  return result;
};