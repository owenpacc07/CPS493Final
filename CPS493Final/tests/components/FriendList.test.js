import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FriendList from '@/components/friends/FriendList.vue'

vi.mock('@/services/api.service', () => ({
    api: {
        getFriends: vi.fn(),
        searchUsers: vi.fn(),
        addFriend: vi.fn(),
        removeFriend: vi.fn()
    }
}))

describe('FriendList', () => {
    beforeEach(() => {
        vi.mocked(api.getFriends).mockResolvedValue([])
    })

    it('searches for users correctly', async () => {
        const wrapper = mount(FriendList)
        const mockUsers = [{ _id: '1', name: 'Test User' }]
        vi.mocked(api.searchUsers).mockResolvedValueOnce(mockUsers)
        
        await wrapper.find('input').setValue('test')
        await wrapper.find('input').trigger('input')
        
        expect(api.searchUsers).toHaveBeenCalledWith('test')
        expect(wrapper.text()).toContain('Test User')
    })

    it('adds friend successfully', async () => {
        const wrapper = mount(FriendList)
        vi.mocked(api.addFriend).mockResolvedValueOnce({})
        
        await wrapper.vm.addFriend('1')
        
        expect(api.addFriend).toHaveBeenCalledWith('1')
        expect(api.getFriends).toHaveBeenCalled()
    })
})
