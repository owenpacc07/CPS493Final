<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const userStore = useUserStore()
const editingUser = ref(null)

function handleEdit(user) {
    editingUser.value = { ...user }
}

function handleUpdate() {
    if (editingUser.value) {
        userStore.updateUser(editingUser.value.id, editingUser.value)
        editingUser.value = null
    }
}

function handleDelete(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        userStore.deleteUser(userId)
    }
}

function cancelEdit() {
    editingUser.value = null
}
</script>

<template>
    <div class="container">
        <h1>User Management</h1>
        <p class="note">Note: Changes are temporary and will reset on refresh</p>

        <div class="users-grid">
            <div v-for="user in userStore.users" 
                :key="user.id" 
                class="user-card"
                :class="{ 'editing': editingUser?.id === user.id }"
            >
                <template v-if="editingUser?.id === user.id">
                    <div class="edit-form">
                        <div class="form-group">
                            <label>Name:</label>
                            <input v-model="editingUser.name" type="text">
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input v-model="editingUser.email" type="email">
                        </div>
                        <div class="form-group">
                            <label>Role:</label>
                            <select v-model="editingUser.role">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div class="edit-actions">
                            <button @click="handleUpdate" class="save-btn">Save</button>
                            <button @click="cancelEdit" class="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="user-info">
                        <h3>{{ user.name }}</h3>
                        <p class="email">{{ user.email }}</p>
                        <p class="role">Role: {{ user.role }}</p>
                        <p class="friends">Friends: {{ user.friends.length }}</p>
                    </div>
                    <div class="actions" v-if="user.id !== userStore.currentUser?.id">
                        <button @click="handleEdit(user)" class="edit-btn">Edit</button>
                        <button @click="handleDelete(user.id)" class="delete-btn">Delete</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.note {
    color: #666;
    margin-bottom: 2rem;
    font-style: italic;
}

.users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem 0;
}

.user-card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    &.editing {
        border: 2px solid #42b983;
    }
}

.user-info {
    h3 {
        margin: 0;
        color: #42b983;
    }

    .email {
        color: #666;
        margin: 0.5rem 0;
    }

    .role {
        font-weight: 500;
        margin: 0.5rem 0;
    }

    .friends {
        color: #666;
    }
}

.actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.edit-btn, .delete-btn, .save-btn, .cancel-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
}

.edit-btn {
    background: #42b983;
}

.delete-btn {
    background: #ff4757;
}

.save-btn {
    background: #42b983;
}

.cancel-btn {
    background: #666;
}

.edit-form {
    .form-group {
        margin-bottom: 1rem;

        label {
            display: block;
            margin-bottom: 0.3rem;
            color: #666;
        }

        input, select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }

    .edit-actions {
        display: flex;
        gap: 0.5rem;
    }
}
</style>