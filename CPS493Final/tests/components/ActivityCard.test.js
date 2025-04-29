import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ActivityCard from '@/components/activities/ActivityCard.vue'

describe('ActivityCard', () => {
    const mockActivity = {
        _id: '1',
        type: 'Running',
        duration: 30,
        distance: 5,
        date: '2024-03-20',
        notes: 'Test run'
    }

    it('renders activity details correctly', () => {
        const wrapper = mount(ActivityCard, {
            props: {
                activity: mockActivity
            }
        })

        expect(wrapper.text()).toContain('Running')
        expect(wrapper.text()).toContain('30 minutes')
        expect(wrapper.text()).toContain('5 km')
        expect(wrapper.text()).toContain('Test run')
    })

    it('emits edit event when edit button is clicked', async () => {
        const wrapper = mount(ActivityCard, {
            props: {
                activity: mockActivity
            }
        })

        await wrapper.find('.edit-btn').trigger('click')
        expect(wrapper.emitted().edit).toBeTruthy()
        expect(wrapper.emitted().edit[0]).toEqual([mockActivity])
    })

    it('emits delete event when delete button is clicked', async () => {
        const wrapper = mount(ActivityCard, {
            props: {
                activity: mockActivity
            }
        })

        await wrapper.find('.delete-btn').trigger('click')
        expect(wrapper.emitted().delete).toBeTruthy()
        expect(wrapper.emitted().delete[0]).toEqual([mockActivity._id])
    })

    it('hides action buttons when showActions is false', () => {
        const wrapper = mount(ActivityCard, {
            props: {
                activity: mockActivity,
                showActions: false
            }
        })

        expect(wrapper.find('.activity-actions').exists()).toBe(false)
    })
})
