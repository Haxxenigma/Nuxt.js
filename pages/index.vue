<template>
    <div class='home'>
        <div class='landing'>
            <div class='hero'>
                <h1 class='title'>
                    Turn Your Vision into <span class='gradient'>Reality</span>
                </h1>
                <h2 class='subtitle'>
                    Watch your dreams materialize before your eyes with us.
                </h2>
                <FormLink class='link' link-class='primary' :to='user ? `/users/${user.id}` : `/signin`'>
                    <icon name='material-symbols:rocket-launch-rounded' size='20' />
                    Get Started
                </FormLink>
            </div>
            <div class='grid-cnt'>
                <div class='grid'>
                    <div v-for='item in items' class='item'>
                        <div class='icon'>
                            <Icon :name='item.icon' size='32' />
                        </div>
                        <div class='title'>
                            {{ item.title }}
                        </div>
                        <div class='subtitle'>
                            {{ item.subtitle }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({ title: 'Home' });

const { user } = useUserStore();

const items = ref([
    {
        icon: 'simple-icons:nuxtdotjs',
        title: 'Fully Customizable',
        subtitle: 'Change the style of any component in your App Config or with ui prop.',
    },
    {
        icon: 'fluent:server-surface-multiple-16-filled',
        title: 'Icons',
        subtitle: 'Choose any of the 100k+ icons from the most popular icon libraries.',
    },
    {
        icon: 'tabler:database-import',
        title: 'Color Palette',
        subtitle: 'Choose a primary and a gray color from your Tailwind CSS color palette.',
    },
    {
        icon: 'carbon:two-factor-authentication',
        title: 'Keyboard Shortcuts',
        subtitle: 'Nuxt UI comes with a set of Vue composables to easily handle shortcuts.',
    },
]);
</script>

<style lang='scss'>
.home {
    flex-grow: 1;

    .landing {
        .hero {
            @include flex($dir: column);
            padding: 160px 20px 20px;
            text-align: center;

            .title {
                font-size: 64px;

                .gradient {
                    background-image: linear-gradient(15deg, rgba(var(--primary)) 60%, rgb(var(--bg)));
                    background-clip: text;
                    -moz-background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }

            .subtitle {
                color: rgba(var(--fg), 0.8);
                font-size: 20px;
            }

            .link {
                width: max-content;
                margin-top: 15px;
            }
        }

        .grid-cnt {
            @include flex();
            background-image: radial-gradient(rgba(var(--primary), 0.1), rgb(var(--bg)) 40%);
            padding: 50px 0;

            .grid {
                @include flex($wrap: wrap, $gap: 32px);
                max-width: 800px;
                padding: 32px;

                .item {
                    @include flex($y: flex-start, $dir: column);
                    flex-basis: calc(50% - 32px);
                    padding: 24px;
                    background-color: rgba(var(--fg), 0.01);
                    border: 3px solid rgba(var(--fg), 0.1);
                    border-radius: 16px;

                    .icon {
                        margin-bottom: 6px;
                    }

                    .title {
                        font-weight: 600;
                    }

                    .subtitle {
                        color: rgba(var(--fg), 0.6);
                        font-size: 14px;
                    }
                }
            }
        }
    }
}

@media (max-width: 650px) {
    .home {
        flex-grow: 1;

        .landing {
            .hero {
                .title {
                    font-size: 40px;
                }

                .subtitle {
                    color: rgba(var(--fg), 0.8);
                    font-size: 20px;
                }
            }

            .grid-cnt {
                .grid {
                    gap: 16px;
                    padding: 16px;

                    .item {
                        flex-basis: 100%;
                    }
                }
            }
        }
    }
}
</style>