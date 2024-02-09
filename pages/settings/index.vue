<template>
    <SettingsLayout>
        <SettingsUpload :user='user' />
        <SettingsForm :user='user' />
    </SettingsLayout>
</template>

<script setup>
useHead({ title: 'Settings' });
const { user } = useUserStore();
</script>