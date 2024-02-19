<template>
    <div class='settings-layout'>
        <h1 class='settings-title'>
            <div class='settings-title-link'>
                <NuxtLink :to='`/${pathLvl1}`'>{{ capitalize(pathLvl1) }}</NuxtLink>
                <NuxtLink v-if='pathLvl2' :to='`/${pathLvl1}/${pathLvl2}`'>/{{ capitalize(pathLvl2) }}</NuxtLink>
                <NuxtLink v-if='pathLvl3' :to='`/${pathLvl1}/${pathLvl2}/${pathLvl3}`'>
                    /{{ capitalize(pathLvl3) }}
                </NuxtLink>
            </div>
            <FormButton class='nav-btn' btn-style='padding: 4px; border-radius: 4px;'
                @click='isNavExpanded = !isNavExpanded'>
                <Icon v-if='!isNavExpanded' name='ic:round-menu' size='30' />
                <Icon v-else name='iconoir:xmark' size='30' />
            </FormButton>
        </h1>
        <div class='settings'>
            <nav class='nav' :class='{ active: isNavExpanded }' @click='isNavExpanded = false'>
                <FormLink v-for='link in links' class='link' link-class='semi-primary wo-outline disable-ripples'
                    link-style='justify-content: flex-start' :to='link.path'>
                    <Icon :name='link.icon' size='24' />
                    {{ link.label }}
                </FormLink>
            </nav>
            <div class='content'>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const { fullPath } = useRoute();
const { user } = useUserStore();

const isNavExpanded = ref(false);
const path = ref(fullPath.split('/'));
const pathLvl1 = ref(path.value[1]);
const pathLvl2 = ref(path.value[2]);
const pathLvl3 = ref(path.value[3]);

const links = ref(null);

watch(() => user, () => {
    if (pathLvl1.value === 'admin' && user?.id !== 1) {
        showError({ statusCode: 404 });
    }
}, { immediate: true });

if (pathLvl1.value === 'settings') {
    links.value = [
        {
            label: 'General',
            icon: 'fa6-solid:user-gear',
            path: '/settings',
        },
        {
            label: 'Security',
            icon: 'material-symbols:shield-locked-sharp',
            path: '/settings/security',
        },
        {
            label: 'Advanced',
            icon: 'fluent:beaker-settings-16-filled',
            path: '/settings/advanced',
        },
    ];
} else if (pathLvl1.value === 'admin') {
    links.value = [
        {
            label: 'Admin Panel',
            icon: 'eos-icons:admin-outlined',
            path: '/admin',
        },
        {
            label: 'Users',
            icon: 'prime:users',
            path: '/admin/users',
        },
        {
            label: 'Articles',
            icon: 'prime:align-left',
            path: '/admin/articles',
        },
    ];
}
</script>

<style lang='scss' scoped>
.settings-layout {
    margin: 8px 64px;

    .settings-title {
        @include flex(space-between);
        padding: 4px;
        font-size: 28px;
        border-bottom: 3px solid rgba(var(--primary), 0.5);

        .settings-title-link {
            @include flex();

            a {
                color: rgba(var(--fg), 0.8);
                transition: 0.3s;

                &:hover {
                    color: rgb(var(--fg));
                }
            }
        }

        .form-button-cnt {
            display: none;
            width: max-content;
        }
    }

    .settings {
        @include flex(flex-start, flex-start);
        margin-top: 15px;

        .nav {
            @include flex($dir: column);
            flex: 0.4;

            .link {
                margin-top: 6px;
            }
        }

        .content {
            flex: 1;
            margin-left: 25px;
            overflow: auto;
        }
    }
}

@media (max-width: 800px) {
    .settings-layout {
        margin: 8px 24px;

        .settings-title {
            .nav-btn {
                display: flex;
            }
        }

        .settings {
            overflow: auto;

            .nav {
                position: absolute;
                justify-content: flex-start;
                height: calc(100vh - 128px - 60px);
                padding: 10px;
                top: 128px;
                left: 0;
                right: 0;
                background-color: rgba(var(--bg), 0.95);
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                z-index: 1;

                &.active {
                    opacity: 1;
                    visibility: visible;
                    pointer-events: all;
                }
            }

            .content {
                margin-left: 5px;
            }
        }
    }
}
</style>