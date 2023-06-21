<script setup lang="ts">
import { getDeckList } from '~/firebase/flashcard';

const deckList = ref<string[]>([]);
const getDeckListLocal = async () => {
    try{

        const decks = await getDeckList();
        if(!decks) return;
        deckList.value = decks;
    }
    catch(err){
        console.error(err);
    }
};
onMounted(getDeckListLocal);
</script>

<template>
    <div class="deck-list">
        <div class="deck-list__header">
            <h2 class="deck-list__title" text-left>Select a Deck:</h2>
        </div>
        <div class="deck-list__decks">
            <div class="deck-list__deck" v-for="deck in deckList" :key="deck">
                <RouterLink :to="`/deck/${deck}`">{{ deck }}</RouterLink>
                
            </div>
            <div class="deck-list__deck">
                <RouterLink :to="`/deck/all`">All</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.deck-list {
    @apply max-w-2xl w-full p-6 bg-white dark:bg-dark rounded-xl shadow-md flex items-start flex flex-col;
}
.deck-list__header {
    @apply my-4 w-full;
}
.deck-list__title {
    @apply text-2xl font-bold;
}
.deck-list__decks {
    @apply mt-1 w-full flex flex-wrap gap2 items-center justify-start;
}
.deck-list__deck {
    @apply p-2 bg-orange-600 text-white rounded-md mt-1 max-w-20 w-full;
}
</style>