<script setup lang="ts">


</script>

<template>
    <div class="main-ui">
        <h1 class="text-3xl font-bold mb7">Let's Learn Korean!</h1>
        <div class="main-ui__grid">
            
            <div class="main-ui__grid-item">
                <DeckHolder />
            </div>
            <div class="main-ui__grid-item">
                <AddDeck />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-ui {
    @apply max-w-7xl mx-auto p-6 ;
}
.main-ui__grid {
    @apply md:grid flex flex-wrap grid-cols-3 gap-10;
}
.main-ui__grid-item {
    @apply flex flex-col items-start w-full;
}
</style>