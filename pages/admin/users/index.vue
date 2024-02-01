<template>
    <SettingsLayout>
        <table class='users-table'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-if='users'>
                <tr v-for='user in users'>
                    <td>
                        <NuxtLink :to='`/users/${user.id}`'>{{ user.id }}</NuxtLink>
                    </td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ formatDate(user.createdAt) }}</td>
                    <td>
                        <NuxtLink :to='`/admin/users/${user.id}`'>
                            Edit
                        </NuxtLink>
                    </td>
                </tr>
            </tbody>
            <tr v-else class='loader'>
                <td colspan='5'>
                    <Loader />
                </td>
            </tr>
        </table>
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Users | Admin Panel' });
const { users } = useUsersStore();
</script>

<style lang='scss' scoped>
.users-table {
    @include table();
}
</style>