const BASE_URL = 'http://localhost:3000/api'

export async function searchUsers(query) {
    if (!query || query.length < 2) return []
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Simulate server response
    return {
        success: true,
        data: mockServerSearch(query)
    }
}

function mockServerSearch(query) {
    // This simulates a server endpoint
    const usersFromStore = JSON.parse(localStorage.getItem('users') || '[]')
    return usersFromStore
        .filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
        .map(user => ({
            id: user.id,
            name: user.name,
            value: user.id
        }))
}
