<template>
    <footer class='footer'>
        <nav class='nav'>
            <a v-for='link in links' class='link' :href='link.path' target='_blank'>{{ link.label }}</a>
        </nav>
        <div class='end'>
            &copy; Haxxenigma &middot; 2023-2024
        </div>
    </footer>
</template>

<script setup>
const links = ref([
    {
        path: '',
        label: 'Project',
    },
    {
        path: '',
        label: 'Contact Me',
    },
    {
        path: '',
        label: 'Source Code',
    },
]);
</script>

<style lang='scss' scoped>
.footer {
    @include flex(space-evenly, $dir: column);
    width: 100%;
    height: 60px;
    padding: 0 15px;

    .nav {
        @include flex($gap: 45px);
        color: rgba(var(--fg), 0.7);
        font-size: 12px;

        .link {
            transition: 0.3s;

            &:hover {
                color: rgba(var(--primary), 0.7);
            }
        }
    }

    .end {
        color: rgba(var(--fg), 0.6);
        font-size: 10px;
    }
}
</style>