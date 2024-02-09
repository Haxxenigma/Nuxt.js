<template>
    <textarea :id='id' :name='id' :value='value' :class='{ "not-empty": value !== "", "is-error": error !== "" }'
        v-bind='$attrs' class='form-textarea' autocomplete='off'
        @input='$emit("update:value", $event.target.value); $emit("reset:error", "")'>
    </textarea>
    <div class='form-label'>{{ label }}</div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'text',
    },
    id: String,
    label: String,
    value: String,
    error: {
        type: String,
        default: '',
    },
});
defineEmits(['update:value', 'reset:error']);
</script>

<style lang='scss'>
.form-textarea {
    @include input();
    vertical-align: top;
    resize: vertical;
}
</style>