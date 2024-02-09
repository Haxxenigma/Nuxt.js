<template>
    <div v-if='editor'>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleBold().run()'
            :disabled='!editor.can().chain().focus().toggleBold().run()' :class='{ "is-active": editor.isActive("bold") }'>
            <Icon name='ic:round-format-bold' size='24' />
            <div class='tooltip'>Bold</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleItalic().run()'
            :disabled='!editor.can().chain().focus().toggleItalic().run()'
            :class='{ "is-active": editor.isActive("italic") }'>
            <Icon name='ic:round-format-italic' size='24' />
            <div class='tooltip'>Italic</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleStrike().run()'
            :disabled='!editor.can().chain().focus().toggleStrike().run()'
            :class='{ "is-active": editor.isActive("strike") }'>
            <Icon name='ic:round-strikethrough-s' size='24' />
            <div class='tooltip'>Strikethrough</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleCode().run()'
            :disabled='!editor.can().chain().focus().toggleCode().run()' :class='{ "is-active": editor.isActive("code") }'>
            <Icon name='ic:round-code' size='24' />
            <div class='tooltip'>Code</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().unsetAllMarks().run()'>
            <Icon name='ic:round-format-clear' size='24' />
            <div class='tooltip'>Clear</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().setParagraph().run()'
            :class='{ "is-active": editor.isActive("paragraph") }'>
            <Icon name='material-symbols:format-paragraph-rounded' size='24' />
            <div class='tooltip'>Paragraph</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleHeading({ level: 3 }).run()'
            :class='{ "is-active": editor.isActive("heading", { level: 3 }) }'>
            <Icon name='ci:heading' size='24' />
            <div class='tooltip'>Heading</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleBulletList().run()'
            :class='{ "is-active": editor.isActive("bulletList") }'>
            <Icon name='ic:round-format-list-bulleted' size='24' />
            <div class='tooltip'>Bulleted list</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleOrderedList().run()'
            :class='{ "is-active": editor.isActive("orderedList") }'>
            <Icon name='ic:round-format-list-numbered' size='24' />
            <div class='tooltip'>Numbered list</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleCodeBlock().run()'
            :class='{ "is-active": editor.isActive("codeBlock") }'>
            <Icon name='ic:round-terminal' size='24' />
            <div class='tooltip'>Code block</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().toggleBlockquote().run()'
            :class='{ "is-active": editor.isActive("blockquote") }'>
            <Icon name='ic:round-format-quote' size='24' />
            <div class='tooltip'>Blockquote</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().setHorizontalRule().run()'>
            <Icon name='ic:round-horizontal-rule' size='24' />
            <div class='tooltip'>Horizontal rule</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().setHardBreak().run()'>
            <Icon name='ic:round-keyboard-return' size='24' />
            <div class='tooltip'>Return</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().undo().run()'
            :disabled='!editor.can().chain().focus().undo().run()'>
            <Icon name='ic:round-undo' size='24' />
            <div class='tooltip'>Undo</div>
        </FormButton>
        <FormButton class='inverse-primary' type='button' @click='editor.chain().focus().redo().run()'
            :disabled='!editor.can().chain().focus().redo().run()'>
            <Icon name='ic:round-redo' size='24' />
            <div class='tooltip'>Redo</div>
        </FormButton>
    </div>
</template>

<script setup>
const { editor } = defineProps(['editor']);
</script>