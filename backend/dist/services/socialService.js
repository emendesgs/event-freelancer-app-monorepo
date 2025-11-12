"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSocialLink = exports.getSocialLinksByUser = exports.addSocialLink = void 0;
const connection_1 = require("../database/connection");
const addSocialLink = async (socialLink) => {
    const { user_id, platform, url } = socialLink;
    const result = await (0, connection_1.query)('INSERT INTO social_links (user_id, platform, url) VALUES ($1, $2, $3) RETURNING *', [user_id, platform, url]);
    return result[0];
};
exports.addSocialLink = addSocialLink;
const getSocialLinksByUser = async (userId) => {
    const result = await (0, connection_1.query)('SELECT * FROM social_links WHERE user_id = $1', [userId]);
    return result;
};
exports.getSocialLinksByUser = getSocialLinksByUser;
const deleteSocialLink = async (id) => {
    await (0, connection_1.query)('DELETE FROM social_links WHERE id = $1', [id]);
};
exports.deleteSocialLink = deleteSocialLink;
//# sourceMappingURL=socialService.js.map