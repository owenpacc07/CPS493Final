import { useUserStore } from '@/stores/user'

export async function searchFriends(query) {
    console.log('Searching friends with query:', query)
    
    if (!query || query.length < 2) {
        console.log('Query too short, returning empty array')
        return []
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const userStore = useUserStore()
    const currentUser = userStore.currentUser
    
    // Filter friends and log results
    const results = userStore.users
        .filter(user => 
            user.id !== currentUser.id &&
            currentUser.friends.includes(user.id) &&
            user.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .map(user => ({
            id: user.id,
            name: user.name,
            value: user.id
        }))
    
    console.log('Search results:', results)
    return results
}
