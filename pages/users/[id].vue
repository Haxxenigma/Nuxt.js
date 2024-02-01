<template>
    <div v-if='user' class='profile'>
        <div class='header'>
            <div class='image-cnt'>
                <img class='image' :src='user.image' />
            </div>
            <div class='info'>
                <div class='name'>
                    {{ user.name }}
                </div>
                <div class='created-at'>
                    Joined {{ new Date(user.createdAt).toLocaleDateString('en-US', options) }}
                </div>
                <div v-if='user.birth' class='birth'>
                    Birth date: {{ formatDate(user.birth) }}
                </div>
            </div>
            <div v-if='params.id == useUserStore().user?.id' class='actions'>
                <FormLink class='action primary' to='/settings'>
                    <Icon name='lets-icons:setting-fill' size='24' />
                    <span>Settings</span>
                </FormLink>
            </div>
        </div>
    </div>
    <Loader v-else />
</template>

<script setup>
const { users } = useUsersStore();
const { params } = useRoute();

const user = ref(null);
const options = ref({
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

watch(() => params.id, (userId) => {
    const data = users.find((user) => {
        return user.id == userId;
    });

    if (data) {
        user.value = data;
    } else {
        showError({ statusCode: 404 });
    }
}, { immediate: true });

useHead({ title: `Profile | ${user.value?.name}` });
</script>

<style lang='scss' scoped>
.profile {
    margin: 25px 64px;

    .header {
        @include flex(flex-start, flex-start);

        .image-cnt {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;

            .image {
                width: 100%;
                height: auto;
            }
        }

        .info {
            @include flex($y: flex-start, $dir: column);
            flex: 1;
            height: 100px;
            margin: 0 15px;

            .name {
                font-size: 18px;
            }

            .created-at,
            .birth {
                font-size: 14px;
                color: rgba(var(--fg), 0.8);
            }
        }

        .actions {
            @include flex();

            .action {
                padding: 8px 32px;
            }
        }
    }
}

@media (max-width: 650px) {
    .profile {
        margin: 10px 16px;

        .header {
            position: relative;
            flex-direction: column;
            align-items: center;

            .info {
                align-items: center;
            }

            .actions {
                position: absolute;
                justify-content: space-between;
                flex-direction: row-reverse;
                width: 80%;
                top: 50%;
                transform: translateY(-50%);

                .action {
                    padding: 12px;

                    span {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>