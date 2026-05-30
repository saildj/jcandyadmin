import { computed } from 'vue'

export function useAppName(suffix: string = '') {
    const master = (import.meta.env.VITE_APP_TITLE_MASTER || '').toString().trim()
    const slave = (import.meta.env.VITE_APP_TITLE_SLAVE || '').toString().trim()
    const defaultName = '糖果 · 管理平台'

    const appName = computed(() => {
        if (master && slave) return `${master} · ${slave}${suffix}`
        if (master) return master
        if (slave) return slave
        return defaultName
    })

    return { appName, master, slave }
}