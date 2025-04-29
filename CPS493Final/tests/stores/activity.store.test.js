import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useActivityStore } from '@/stores/activities'

vi.mock('@/services/api.service', () => ({
    api: {
        getActivities: vi.fn(),
        createActivity: vi.fn(),
        updateActivity: vi.fn(),
        deleteActivity: vi.fn()
    }
}))

describe('ActivityStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('adds activity correctly', async () => {
        const store = useActivityStore()
        const activity = {
            type: 'Running',
            distance: 5,
            duration: 30
        }

        await store.addActivity(activity)
        expect(store.activities).toContainEqual(expect.objectContaining(activity))
    })

    it('updates activity correctly', async () => {
        const store = useActivityStore()
        const activity = {
            _id: '1',
            type: 'Running',
            distance: 5
        }
        store.activities = [activity]

        const updates = { distance: 10 }
        await store.updateActivity('1', updates)
        
        expect(store.activities[0].distance).toBe(10)
    })
})
