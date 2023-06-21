<script setup lang="ts">

import { createCard, Card } from '~/firebase/flashcard';

const front = ref('');
const back = ref('');

const { deck } = defineProps({
    deck: String
});
const submitted = ref(false);
const submitCard = ()=>setTimeout(() => {
    submitted.value = false;
}, 1000);
const createCardLocal = async () => {
    try{

        if(!front.value || !back.value) return alert('Please enter a front and back');
        console.log(deck)
        if(!deck) return;
    const id = Math.random().toString(36).substr(2, 9);
    const card: Card = {
        id: id,
        front: front.value,
        back: back.value,
        deck: deck
    };
    await createCard(card);
    front.value = '';
    back.value = '';
    submitted.value = true;
    submitCard();
}
catch(err){
    console.error(err);
}
}; 
</script>

<template>
    <div w-full flex items-center justify-center>

        <div class="add-card" v-if="!submitted">
            <div class="add-card__header">
                <h2 class="add-card__title">Add Card</h2>
            </div>
            <div class="add-card__form">
                <input class="add-card__input" type="text" placeholder="Korean" v-model="front" />
            <input class="add-card__input" type="text" placeholder="English" v-model="back" />
            <button class="add-card__button" @click.prevent="createCardLocal()">Add Card</button>
        </div>
    </div>
    <div v-else>
        <h2>Card Added!</h2>
        </div>
</div>
</template>

<style scoped>
.add-card {
    @apply w-full p-6 bg-white dark:bg-dark rounded-xl shadow-md flex flex-col items-center;
}
.add-card__header {
    @apply my-4;
}
.add-card__title {
    @apply text-2xl font-bold;
}
.add-card__form {
    @apply mt-4 flex flex-col gap2 ;
}
.add-card__input {
    @apply bg-gray-200 text-dark rounded p-2 mb-2;
}
.add-card__button {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt4;
}
</style>
