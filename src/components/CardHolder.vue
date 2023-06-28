<script setup lang="ts">
// get cards
import type { Card } from '~/firebase/flashcard'
import { getCards, getCardsByDeck, getWrongCards, getWrongCardsByDeck, updateCard } from '~/firebase/flashcard'

// get deck
const { deck, wrong } = defineProps({
  deck: String,
  wrong: Boolean,
})
function shuffleArray(array: Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]] // swap elements
  }
  return array
}
const cardList = ref<Card[]>([])
const pureTotal = ref(0)
async function getAllCardsLocal() {
  try {
    if (!deck)
      return
    let cards
    if (!wrong)
      cards = await getCards()

    else
      cards = await getWrongCards()

    if (!cards)
      return
    cardList.value = cards
    pureTotal.value = cards.length
    cardList.value = shuffleArray(cardList.value)
  }
  catch (err) {
    console.error(err)
  }
}
async function getCardsLocal() {
  try {
    if (!deck)
      return

    let cards
    if (!wrong)
      cards = await await getCardsByDeck(deck)

    else
      cards = await getWrongCardsByDeck(deck)

    if (!cards)
      return
    cardList.value = cards
    pureTotal.value = cards.length
    cardList.value = shuffleArray(cardList.value)
  }
  catch (err) {
    console.error(err)
  }
}
onMounted(() => {
  if (deck === 'all')
    getAllCardsLocal()
  else
    getCardsLocal()
},
)
const gameOver = ref(false)
const currentCardIndex = ref(0)
const correctTotal = ref(0)
function markAsComplete(correct: boolean) {
  if (correct) {
    correctTotal.value++
    cardList.value[currentCardIndex.value].wrong = false
    updateCard(cardList.value[currentCardIndex.value])
  }
  else {
    cardList.value[currentCardIndex.value].wrong = true
    updateCard(cardList.value[currentCardIndex.value])
  }
  if (currentCardIndex.value < cardList.value.length - 1) {
    currentCardIndex.value++
  }
  else {
    // console.log("All cards have been completed.");
    gameOver.value = true
  }
}
</script>

<template>
  <div v-if="deck" class="card-holder">
    <div class="card-holder__header">
      <h2 v-if="!gameOver && pureTotal > 0" class="card-holder__title">
        {{ currentCardIndex }} / {{ pureTotal }}
      </h2>
      <h2 v-if="pureTotal === 0" class="card-holder__title">
        No Cards in Deck!
      </h2>
    </div>

    <div v-if="gameOver" w-full flex flex-col items-center justify-center py10 text-4xl font-bold space-y-4>
      <div>
        {{ correctTotal }} / {{ pureTotal }}
      </div>
      <div h-30 w-30 flex items-center justify-center rounded-full text-dark :style="`background: rgba(0,255,0,${correctTotal / (pureTotal)})`">
        {{ Math.round((correctTotal / (pureTotal)) * 100) }}%
      </div>
    </div>
    <div v-if="!gameOver" class="card-holder__cards">
      <FlashCard :card="cardList[currentCardIndex]" @correct="markAsComplete(true)" @incorrect="markAsComplete(false)" />
    </div>
  </div>
</template>

<style scoped>
.card-holder {
    @apply  w-full    rounded-xl  flex flex-col items-start;
}
.card-holder__header {
    @apply my-4;
}
.card-holder__title {
    @apply text-2xl font-bold;
}
.card-holder__cards {
    @apply mt-4 w-full flex items-center-justify-center;
}

.card-holder__score {
    @apply max-w-2xl mx-auto p-6 bg-white dark:bg-dark rounded-xl shadow-md flex flex-col items-start;
}

.card-holder__switcher {
    @apply btn;
}
</style>
