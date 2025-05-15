import { searchUsers } from './api'
import { useUserStore } from '@/stores/user'

export async function searchFriends(query) {
    if (!query || query.length < 2) return []
    
    const userStore = useUserStore()
    const results = await searchUsers(query)
    
    // Filter to only include friends
    return results.filter(user => 
        user.id !== userStore.currentUser?.id &&
        userStore.currentUser?.friends.includes(user.id)
    )
}
