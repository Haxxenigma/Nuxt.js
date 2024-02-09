<template>
    <div class='upload'>
        <a class='image-cnt' :href='user.image'>
            <img class='image' :src='user.image' />
        </a>
        <div class='btns'>
            <FormButton type='button' class='btn upload-btn primary' @click='input.click()'>
                <input class='upload-input' type='file' id='image' name='image' @change='setBlob' ref='input' />
                <Icon name='material-symbols:add-photo-alternate-outline-rounded' size='24' />
                <span>Upload</span>
            </FormButton>
            <FormButton type='button' class='btn delete-btn danger' @click='isVisibleDelete = true'>
                <Icon name='material-symbols:delete-outline-rounded' size='24' />
                <span>Delete</span>
            </FormButton>
        </div>
        <FormModal :isVisible='isVisibleUpload' :isSubmitting='isSubmitting' :error='rootError'
            @setIsVisible='isVisibleUpload = $event' @onClick='upload'>
            <template #msg>
                Are you sure you want to update your profile image?
            </template>
            <div class='image-cnt'>
                <img class='image' :src='blob' />
            </div>
        </FormModal>
        <FormModal :isVisible='isVisibleDelete' :isSubmitting='isSubmitting' :error='rootError'
            @setIsVisible='isVisibleDelete = $event' @onClick='remove'>
            <template #msg>
                Are you sure you want to delete your profile image?
            </template>
        </FormModal>
    </div>
</template>

<script setup>
const { fetchUser } = useUserStore();
const { fetchUsers } = useUsersStore();
const props = defineProps(['user']);
const isVisibleUpload = ref(false);
const isVisibleDelete = ref(false);
const isSubmitting = ref(false);
const rootError = ref(null);
const user = ref(props.user);
const input = ref(null);
const blob = ref(null);

async function upload() {
    isSubmitting.value = true;
    rootError.value = null;

    const formData = new FormData();
    formData.append('image', input.value.files[0]);

    const { data, error } = await useSubmit({
        url: `/api/users/${user.value.id}/image`,
        method: 'post',
        body: formData,
    });

    if (data) {
        isVisibleUpload.value = false;
        await fetchUser();
        await fetchUsers();
    } else if (error) {
        rootError.value = error.msg;
    }

    isSubmitting.value = false;
}

async function remove() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.value.id}/image`,
        method: 'delete',
    });

    if (data) {
        isVisibleDelete.value = false;
        await fetchUser();
        await fetchUsers();
    } else if (error) {
        rootError.value = error.msg;
    }

    isSubmitting.value = false;
}

function setBlob(e) {
    if (e.target.files[0]) {
        blob.value = URL.createObjectURL(e.target.files[0]);
        isVisibleUpload.value = true;
    }
}

watch(() => isVisibleUpload.value, (isVisibleUpload) => {
    if (isVisibleUpload === false) {
        blob.value = null;
        input.value.value = null;
        rootError.value = null;

        if (input.value.value) {
            input.value.type = 'text';
            input.value.type = 'file';
        }
    }
});
</script>

<style lang='scss' scoped>
.upload {
    @include flex(space-between, $gap: 8px);
    margin-bottom: 15px;

    .image-cnt {
        @include flex();
        width: 90px;
        height: 90px;
        min-width: 90px;
        border: 1px inset rgba(var(--fg), 0.6);
        border-radius: 50%;
        overflow: hidden;

        &:hover {
            ~.upload-label {
                opacity: 1;
                visibility: visible;
            }
        }

        .image {
            width: 100%;
            height: auto;
        }
    }

    .btns {
        @include flex($gap: 28px);
        font-size: 14px;

        .upload-btn {
            .upload-input {
                display: none
            }
        }
    }
}

.form-modal {
    .image-cnt {
        @include flex();
        width: 120px;
        height: 120px;
        margin-top: 20px;
        border-radius: 50%;
        overflow: hidden;

        .image {
            width: 100%;
            height: auto;
        }
    }
}

@media (max-width: 800px) {
    .upload {
        .btns {
            .btn {
                padding: 8px;

                span {
                    display: none;
                }
            }
        }
    }
}
</style>