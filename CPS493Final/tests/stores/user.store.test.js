import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/stores/user'

vi.mock('@/services/api.service', () => ({
    api: {
        login: vi.fn(),
        register: vi.fn()
    }
}))

describe('UserStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    it('handles login correctly', async () => {
        const store = useUserStore()
        const mockUser = { id: '1', name: 'Test User', role: 'user' }
        const mockResponse = { user: mockUser, token: 'test-token' }
        
        vi.mocked(api.login).mockResolvedValueOnce(mockResponse)
        
        const success = await store.login({ username: 'test', password: 'test' })
        
        expect(success).toBe(true)
        expect(store.currentUser).toEqual(mockUser)
        expect(localStorage.getItem('token')).toBe('test-token')
    })

    it('handles logout correctly', () => {
        const store = useUserStore()
        store.currentUser = { id: '1' }
        localStorage.setItem('token', 'test-token')
        
        store.logout()
        
        expect(store.currentUser).toBeNull()
        expect(localStorage.getItem('token')).toBeNull()
    })
})
