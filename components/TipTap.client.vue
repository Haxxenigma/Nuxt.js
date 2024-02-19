<template>
    <div class='tiptap-cnt'>
        <TipTapBtns class='btns' :editor='editor' />
        <FormField :error='props.modelValue.error'>
            <TiptapEditorContent class='content' :editor='editor' />
        </FormField>
    </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:value', 'reset:error']);

const editor = useEditor({
    extensions: useTiptapExtensions(),
    content: props.modelValue.value,
    onUpdate: () => {
        emit('update:value', editor.value.getHTML());
        emit('reset:error', '');
    },
});

watch(() => props.modelValue.value, (value) => {
    const isSame = editor.value.getHTML() === value;

    if (!isSame) {
        editor.value.commands.setContent(value, false);
    }
});
</script>

<style lang='scss'>
.tiptap-cnt {
    .btns {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        .form-button-cnt {
            @include tooltip();
            width: max-content;

            .form-button {
                padding: 8px;
                overflow: visible;

                .ripples {
                    display: none;
                }
            }
        }
    }

    .content {
        .tiptap {
            @include input();
            @include html();
            min-height: 200px;
            max-height: 500px;
            margin-top: 16px;
            padding: 8px;
            overflow: auto;
            cursor: text;

            * {
                cursor: text;
            }
        }
    }
}
</style>