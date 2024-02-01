<template>
    <input :type='type' :id='id' :name='id' :value='value' :class='{ "not-empty": value !== "", "is-error": error !== "" }'
        v-bind='$attrs' class='form-input' autocomplete='off'
        @input='$emit("update:value", $event.target.value); $emit("reset:error", "")' />
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
.form-input {
    width: 100%;
    padding: 20px 12px 4px;
    background-color: rgba(var(--fg), 0.05);
    border-bottom: 2px solid rgba(var(--fg), 0.2);
    transition: 0.2s;

    &:hover {
        background-color: rgba(var(--fg), 0.075);
        border-bottom-color: rgba(var(--fg), 0.4);
    }

    &:focus {
        background-color: rgba(var(--fg), 0.1);
    }

    &:focus,
    &.not-empty {
        ~.form-label {
            top: 25%;
            color: rgb(var(--primary));
            font-size: 13px;
        }
    }

    &:disabled {
        cursor: not-allowed;
    }

    &[type='date'] {
        ~.form-label {
            top: 25%;
            color: rgb(var(--primary));
            font-size: 13px;
        }

        &::-webkit-calendar-picker-indicator {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 4px;
            transition: 0.3s;
            cursor: pointer;

            &:hover {
                background-color: rgb(255, 255, 255);
            }
        }
    }

    &.is-error {
        border-bottom-color: rgba(var(--red), 0.2);

        &:hover {
            border-bottom-color: rgba(var(--red), 0.5);
        }

        ~.form-label {
            color: rgba(var(--red), 0.7);
        }

        &:focus,
        &.not-empty {
            ~.form-label {
                color: rgb(var(--red));
            }
        }
    }

    ~.form-label {
        position: absolute;
        top: 50%;
        left: 12px;
        color: rgba(var(--fg), 0.7);
        transform: translateY(-50%);
        pointer-events: none;
        transition: 0.2s;
    }
}
</style>