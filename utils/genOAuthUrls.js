export const genGoogleUrl = (config) => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        client_id: config.public.googleOAuthClientID,
        redirect_uri: config.public.googleOAuthRedirectURI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        state: 'googleOAuth',
        access_type: 'offline',
        prompt: 'consent',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
};

export const genGithubUrl = (config) => {
    const url = 'https://github.com/login/oauth/authorize';
    const options = {
        client_id: config.public.githubOAuthClientID,
        scope: 'user:email',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
};