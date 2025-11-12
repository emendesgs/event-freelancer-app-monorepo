import { query } from '../database/connection';

export interface ISocialLink {
  id?: number;
  user_id: number;
  platform: string;
  url: string;
}

export const addSocialLink = async (socialLink: ISocialLink) => {
  const { user_id, platform, url } = socialLink;
  const result = await query(
    'INSERT INTO social_links (user_id, platform, url) VALUES ($1, $2, $3) RETURNING *',
    [user_id, platform, url]
  );
  return result[0];
};

export const getSocialLinksByUser = async (userId: number) => {
  const result = await query('SELECT * FROM social_links WHERE user_id = $1', [userId]);
  return result;
};

export const deleteSocialLink = async (id: number) => {
  await query('DELETE FROM social_links WHERE id = $1', [id]);
};