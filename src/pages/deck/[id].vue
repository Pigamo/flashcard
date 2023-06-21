<script setup lang="ts">
import {useRoute} from 'vue-router';
import { resetWrongCardsByDeck, resetWrongCards } from '~/firebase/flashcard';

const path = useRoute().params;

console.log(path)
const play = ref(false)
const playWrong = ref(false)
const manage = ref(false)
</script>

<template>
    <div class="deck-controller">
        <h1 class="deck-controller__title" capitalize>{{ path.id }}
        </h1>
        <div flex items-center gap-4 my4 w-full h-full flex-col justify-evenly self-stretch >

            <button class="deck-controller__button" v-if="!manage && !playWrong"
            @click.prevent="play = !play">{{ play ? 'Quit' :
                'Play' }}</button>
                <div w-full flex gap-2 items-center justify-between v-if="!manage && !play">
    <button class="deck-controller__button" 
                        @click.prevent="playWrong = !playWrong">{{ playWrong ? 'Quit' :
                            'Play Wrong Cards' }}</button>
                    <button class="deck-controller__button !bg-red" v-if="path.id==='all' && !playWrong" 
                    @click.prevent="resetWrongCards()">Reset Wrong Cards</button>
                    <button class="deck-controller__button !bg-red" v-else-if="!playWrong"
                    @click.prevent="resetWrongCardsByDeck(path.id)">Reset Wrong Cards</button>
                </div>
                    <button class="deck-controller__button" v-if="!play && !playWrong && path.id !== 'all'"
                    @click.prevent="manage = !manage">{{manage ? 'Quit Manager': 'Manage Deck'}}</button>
                </div>
        <CardHolder :deck="path.id" v-if="play &&!playWrong && !manage" :wrong="false" />
        <CardHolder :deck="path.id" v-if="playWrong && !play && !manage" :wrong="true"/>
        <CardManager  :deck="path.id" v-if="manage && !play && path.id !== 'all'" />
        
        </div>
</template>

<style scoped>
.deck-controller {
    @apply  min-h-100 h-full    flex flex-col items-stretch justify-between my-4;
}
.deck-controller__title {
    @apply text-4xl font-bold mb-4;
}
.deck-controller__button {
    @apply px-3 self-stretch py-3 bg-blue-500 text-white rounded hover:bg-blue-700 my-2 w-full text-2xl;
}
</style>