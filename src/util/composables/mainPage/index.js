import router from '@/router'

function useMainPage() {
    function reload() {
        router.push({
            name: 'reload'
        })
    }

    return {
        reload
    }
}

export default useMainPage
