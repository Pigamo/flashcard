<script setup lang="ts">
// get cards
import { getCardsByDeck, getCards, getDeckList, Card } from '~/firebase/flashcard';


// get deck
const { deck } = defineProps({
    deck: String
})

const cardList = ref<Card[]>([]);
const pureTotal = ref(0)
const getCardsLocal = async () => {
    try {
        if (!deck) return;
        const cards = await getCardsByDeck(deck);
        if (!cards) return;
        cardList.value = cards;
        pureTotal.value = cards.length
        console.log(cardList.value)
    }
    catch (err) {
        console.error(err);
    }
};
onMounted(getCardsLocal);

</script>

<template>
    <div flex justify-evenly w-full>

       
        
           
            
            
            <AddCard :deck="deck"/>
        
    </div>
</template>

<style scoped>
.card-holder {
    @apply max-w-2xl mx-auto p-6 bg-white dark:bg-dark rounded-xl shadow-md flex flex-col items-start;
}
.card-holder__header {
    @apply my-4;
}
.card-holder__title {
    @apply text-2xl font-bold;
}
.card-holder__cards {
    @apply mt-4;
}

.card-holder__score {
    @apply max-w-2xl mx-auto p-6 bg-white dark:bg-dark rounded-xl shadow-md flex flex-col items-start;
}

.card-holder__switcher {
    @apply btn;
}
</style>