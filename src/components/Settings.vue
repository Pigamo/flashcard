<script setup lang="ts">
import {useLanguageStore} from '~/stores/language';

const { toggleLanguage, getLanguage } = useLanguageStore();
const settings = ref(false);
const language = ref(getLanguage());
watchEffect(()=>{
    toggleLanguage(language.value)
})

const router = useRoute();


const params = ref(router.params)

watch(() => router.params, () => {
    params.value = router.params;
});

</script>

<template>
<div fixed top-0 left-0 w-full h-20 >
    <div relative w-full flex p-4 justify-between  >
    <RouterLink text-3xl i-carbon-home to="/" v-if="params.id"></RouterLink>
    <div i-carbon-settings @click.prevent="settings = !settings" text-3xl ml-auto>
        
        </div>
        <div v-if="settings" absolute right-0 top-20 animate-fade-in-right animate-duration-100>
            <div class="settings__container" p4 rounded-l-xl border-r-5 border-r-blue bg-white dark:bg-dark shadow >
                <div class="settings__item" @click.prevent="language = !language" cursor-pointer>
                    Language:
                    {{ language ? 'Korean' : 'English' }}
                </div>
            </div>
            </div>  
    </div>

</div>

</template>