<script setup lang="ts">
import {Card } from '~/firebase/flashcard';
const {card} = defineProps({
  card: Object as PropType<Card>,

})
import { useLanguageStore } from '~/stores/language';

const {getLanguage} = useLanguageStore();

const flip = ref(false);
const emit = defineEmits(['correct', 'incorrect'])
onMounted(() => {
    flip.value = getLanguage();
    console.log(getLanguage())
})

const markIncorrect = () => {
    emit('incorrect')
};
const markCorrect = () => {
    emit('correct')
};
</script>

<template>
    <div class="flash-card" v-if="card" @click.prevent="flip = !flip" hyphens-auto>
        <div class="flash-card__front" break-words v-if="!flip"> {{ card.front }} </div>
        <div class="flash-card__back" break-words v-if="flip"> {{ card.back }} </div>
        
        <div class="flash-card__complete" v-if="!getLanguage() === flip" >
            <div i-carbon-checkmark-filled text-green class="flash-card__complete-icon" @click.prevent="markCorrect()"></div>
            <div i-carbon-close-filled text-red class="flash-card__complete-icon" @click.prevent="markIncorrect()"></div>
        </div>
    </div>
</template>

<style scoped>
.flash-card {
    @apply w-full text-6xl min-h-60 p-6 bg-white dark:bg-dark rounded-xl shadow-md flex flex-col items-center justify-center my-4;
}
.flash-card__front {
    @apply  font-bold w-full ;
}
.flash-card__back {
    @apply w-full text-5xl ;
}
.flash-card__complete {
    @apply flex items-center justify-evenly w-full relative z-1 ;
}
.flash-card__complete-icon {
    @apply w-8 h-8 cursor-pointer p-8 mt8;
}
</style>