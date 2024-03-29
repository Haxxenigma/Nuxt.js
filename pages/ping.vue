<template>
    <div class='ping-service'>
        <header class='header'>
            <h1 class='title'>Ping Service</h1>
            <form class='form' @submit.prevent='ping'>
                <FormField v-for='field in fields' class='field' :error='field.error'>
                    <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event'
                        autofocus />
                </FormField>
                <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>Send</FormButton>
            </form>
        </header>
        <footer class='footer'>
            <h2 class='title'>Result</h2>
            <div class='result-cnt'>
                <Transition name='result' mode='out-in'>
                    <div v-if='result' class='result'>
                        <span v-for='resLine in result' class='result-line'>{{ resLine }}</span>
                    </div>
                    <span v-else-if='isSubmitting' class='result-loading'>Loading...</span>
                    <span v-else class='result-initial'>No result</span>
                </Transition>
            </div>
        </footer>
    </div>
</template>

<script setup>
useHead({ title: 'Ping Service' });
const result = ref(null);
const isSubmitting = ref(false);

const fields = ref([
    {
        id: 'destination',
        label: 'Destination',
        value: '',
        error: '',
    },
]);

async function ping() {
    isSubmitting.value = true;
    result.value = null;

    const { data } = await useSubmit({
        fieldsArray: fields.value,
        url: '/api/ping',
        method: 'post',
    });

    if (data) {
        result.value = data.split('\n');
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
.ping-service {
    .header {
        width: 75%;
        margin: 15px auto 0;

        .title {
            color: rgba(var(--fg), 0.8);
            font-size: 24px;
        }

        .form {
            @include flex($y: flex-start);
            margin: 8px;

            .btn {
                width: max-content;
                margin: 5px 0 0 35px;
            }
        }
    }

    .footer {
        @include flex($wrap: wrap);
        margin: 0 auto;
        width: 75%;
        color: rgba(var(--fg), 0.8);

        .title {
            flex-basis: 100%;
            padding: 15px 0 5px;
            font-size: 20px;
        }

        .result-cnt {
            @include flex();
            flex-basis: 100%;
            min-height: 50px;
            max-height: 400px;
            padding: 4px 8px;
            margin: 4px;
            background-color: rgba(var(--fg), 0.05);
            border: 3px solid rgba(var(--fg), 0.1);
            border-radius: 8px;
            overflow: auto;

            .result {
                @include flex(flex-start, flex-start, $dir: column);
                width: 100%;
                height: 100%;
            }

            .result-initial {
                color: rgba(var(--fg), 0.6);
            }
        }
    }
}

.result-enter-active,
.result-leave-active {
    transition: 0.1s;
}

.result-enter-from,
.result-leave-to {
    opacity: 50%;
    filter: blur(1px);
}

@media (max-width: 600px) {
    .ping-service {
        .header {
            width: 95%;

            .form {
                flex-direction: column;

                .btn {
                    width: 100%;
                    margin: 0;
                }
            }
        }

        .footer {
            width: 95%;
        }
    }
}
</style>