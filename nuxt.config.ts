export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        databaseURL: 'mysql://4q2az16khjf9g9rpq1eq:pscale_pw_wu6PWGLqM3ud9bfWClC0eMFJNxlTjjfn4dJ6JAhar0v@aws.connect.psdb.cloud/js?ssl={"rejectUnauthorized":true}',
        jwtKey: 'jwt_key_wu6PWGLqM3ud9bfWClC0eMFJNxlTjjfn4dJ6JAhar0v',
        googleOAuthClientSecret: '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',
        githubOAuthClientSecret: '7789aff9733c0547e80c23c73b92832b5675e46f',
        imgurOAuthClientSecret: '8f1ca7481b335571571f68cd0c64e9b55fe3ae97',
        public: {
            googleOAuthRedirectURI: 'http://192.168.1.93.nip.io:3000/oauth',
            googleOAuthClientID: '533631762933-93fkv786j87h3tmcav66nbsev69o5sq3.apps.googleusercontent.com',
            githubOAuthClientID: 'ac27c51b636016a6a7a2',
            imgurOAuthClientID: '353de44b9a75fab',
        },
    },
    modules: [
        'nuxt-icon',
        '@pinia/nuxt',
    ],
    css: [
        '~/assets/main.scss',
        '~/assets/vars.scss',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/mixins.scss" as *;',
                },
            },
        },
    },
});