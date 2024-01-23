export async function getGoogleUser(config, code) {
    try {
        const tokenURL = 'https://oauth2.googleapis.com/token';
        const options = {
            code: code,
            client_id: config.public.googleOAuthClientID,
            client_secret: config.googleOAuthClientSecret,
            redirect_uri: config.public.googleOAuthRedirectURI,
            grant_type: 'authorization_code',
        };

        const { access_token, id_token } = await $fetch(tokenURL, {
            method: 'POST',
            body: options,
        });

        const userURL = 'https://www.googleapis.com/oauth2/v2/userinfo';

        const user = await $fetch(`${userURL}?access_token=${access_token}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });

        return user;
    } catch (err) {
        throw createError({
            statusCode: 500,
        });
    }
}

export async function getGithubUser(config, code) {
    try {
        const tokenURL = 'https://github.com/login/oauth/access_token';
        const options = {
            code: code,
            client_id: config.public.githubOAuthClientID,
            client_secret: config.githubOAuthClientSecret,
        };

        const { access_token } = await $fetch(tokenURL, {
            method: 'POST',
            body: options,
        });

        const userURL = 'https://api.github.com/user';
        const emailURL = 'https://api.github.com/user/emails';

        const githubUser = await $fetch(userURL, {
            method: 'GET',
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });

        const [githubUserEmail] = await $fetch(emailURL, {
            method: 'GET',
            headers: {
                Authorization: `bearer ${access_token}`,
            },
        });

        return { ...githubUser, ...githubUserEmail };
    } catch (err) {
        throw createError({
            statusCode: 500,
        });
    }
}