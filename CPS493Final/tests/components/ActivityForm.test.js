import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ActivityForm from '@/components/activities/ActivityForm.vue'

describe('ActivityForm', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(ActivityForm)
    })

    it('emits submit event with form data', async () => {
        const testActivity = {
            type: 'Running',
            duration: 30,
            distance: 5,
            date: '2024-03-20',
            notes: 'Test run'
        }

        await wrapper.find('input[v-model="form.type"]').setValue(testActivity.type)
        await wrapper.find('input[v-model="form.duration"]').setValue(testActivity.duration)
        await wrapper.find('input[v-model="form.distance"]').setValue(testActivity.distance)
        await wrapper.find('input[v-model="form.date"]').setValue(testActivity.date)
        await wrapper.find('textarea[v-model="form.notes"]').setValue(testActivity.notes)

        await wrapper.find('form').trigger('submit')

        expect(wrapper.emitted('submit')).toBeTruthy()
        expect(wrapper.emitted('submit')[0][0]).toMatchObject(testActivity)
    })
})
