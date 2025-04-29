import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsDisplay from '@/components/stats/StatsDisplay.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('StatsDisplay', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('calculates stats correctly', () => {
        const wrapper = mount(StatsDisplay, {
            global: {
                plugins: [createPinia()]
            }
        })

        const activities = [
            { type: 'Running', distance: 5, duration: 30 },
            { type: 'Running', distance: 3, duration: 20 },
            { type: 'Cycling', distance: 10, duration: 45 }
        ]

        wrapper.vm.activityStore.activities = activities

        expect(wrapper.vm.stats.totalActivities).toBe(3)
        expect(wrapper.vm.stats.totalDistance).toBe('18.0')
        expect(wrapper.vm.stats.totalDuration).toBe(95)
        expect(wrapper.vm.stats.byType).toEqual({
            Running: 2,
            Cycling: 1
        })
    })
})
