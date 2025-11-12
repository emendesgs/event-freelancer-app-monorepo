export interface ISocialLink {
    id?: number;
    user_id: number;
    platform: string;
    url: string;
}
export declare const addSocialLink: (socialLink: ISocialLink) => Promise<any>;
export declare const getSocialLinksByUser: (userId: number) => Promise<any[]>;
export declare const deleteSocialLink: (id: number) => Promise<void>;
//# sourceMappingURL=socialService.d.ts.map