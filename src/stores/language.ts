import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
    /**
     * Current name of the user.
     */
    const direction = ref(true)
    


    function toggleLanguage() {
        

        direction.value = !direction.value
    }
    function getLanguage() {
        return direction.value
    }

    return {
        toggleLanguage, getLanguage
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useLanguageStore as any, import.meta.hot))
