<template>
    <div class='info-cnt'>
        <FormLink class='info inverse wo-outline' :to='`/users/${article.authorId}`'>
            <div class='author'>
                <div class='image-cnt'>
                    <img class='image' :src='article.authorImage' />
                </div>
                <div class='name'>
                    {{ article.authorName }}
                </div>
            </div>
            <div class='created-at'>
                {{ new Date(article.createdAt).toLocaleDateString('en-US', options) }}
            </div>
        </FormLink>
    </div>
</template>

<script setup>
const { article } = defineProps(['article']);
const options = ref({
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});
</script>

<style lang='scss' scoped>
.info-cnt {
    width: 100%;

    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: max-content;
        padding: 2px 8px;

        .author {
            @include flex($gap: 4px);

            .image-cnt {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                overflow: hidden;

                .image {
                    width: 100%;
                    height: auto;
                }
            }

            .name {
                max-width: 150px;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .created-at {
            padding: 0 2px;
            font-size: 14px;
            color: rgba(var(--fg), 0.6);
        }
    }
}
</style>