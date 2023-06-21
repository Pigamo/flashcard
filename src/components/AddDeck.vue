<script setup lang="ts">
import { addDeck } from '~/firebase/flashcard';
const deckName = ref('');
const submitted = ref(false);
const submitCard = () => setTimeout(() => {
    submitted.value = false;
}, 1000);
const addDeckLocal = async () => {
    if(!deckName.value) return alert('Please enter a deck name');

    await addDeck(deckName.value);
    deckName.value = '';
    submitted.value = true;
    submitCard();
};
</script>

<template>
    <div>
<div v-if="submitted">Created new deck!</div>
        <div class="add-deck" v-if="!submitted">
            <div class="add-deck__header">
                <h2 class="add-deck__title">Add Deck</h2>
        </div>
        <div class="add-deck__form">
            <input class="add-deck__input" type="text" placeholder="Deck Name" v-model="deckName" />
            <button class="add-deck__button" @click.prevent="addDeckLocal()">Add Deck</button>
        </div>
    </div>
</div>
</template>

<style scoped>
.add-deck {
    @apply w-full p-6 bg-white dark:bg-dark rounded-xl shadow-md flex flex-col items-center;
}
.add-deck__header {
    @apply my-4;
}
.add-deck__title {
    @apply text-2xl font-bold;
}
.add-deck__form {
    @apply mt-4 flex flex-col;
}
.add-deck__input {
    @apply bg-gray-200 text-dark rounded p-2 mb-2;
}
.add-deck__button {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700;
}
</style>