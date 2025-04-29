<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const userStore = useUserStore()
const router = useRouter()
const error = ref(null)
const isRegistering = ref(false)
const formData = ref({
    username: '',
    password: '',
    name: '',
    email: ''
})

async function handleSubmit() {
    try {
        error.value = null
        const credentials = isRegistering.value 
            ? {
                username: formData.value.username,
                password: formData.value.password,
                email: formData.value.email,
                name: formData.value.name
            }
            : {
                username: formData.value.username,
                password: formData.value.password
            }

        const success = isRegistering.value 
            ? await userStore.register(credentials)
            : await userStore.login(credentials)

        if (success) {
            router.push('/')
        }
    } catch (err) {
        error.value = err.message || 'Authentication failed'
    }
}

function toggleMode() {
    isRegistering.value = !isRegistering.value
    error.value = null
    formData.value = {
        username: '',
        password: '',
        name: '',
        email: ''
    }
}
</script>

<template>
    <div class="container login-page">
        <h1>{{ isRegistering ? 'Register' : 'Login' }}</h1>
        <div v-if="error" class="error-message">{{ error }}</div>
        <LoadingSpinner v-if="userStore.loading" />
        
        <form @submit.prevent="handleSubmit" class="login-form">
            <div class="form-group">
                <label>Username:</label>
                <input v-model="formData.username" required>
            </div>
            
            <template v-if="isRegistering">
                <div class="form-group">
                    <label>Name:</label>
                    <input v-model="formData.name" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" v-model="formData.email" required>
                </div>
            </template>

            <div class="form-group">
                <label>Password:</label>
                <input type="password" v-model="formData.password" required>
            </div>

            <button type="submit" class="login-button">
                {{ isRegistering ? 'Register' : 'Login' }}
            </button>
        </form>

        <p class="toggle-text">
            {{ isRegistering ? 'Already have an account?' : "Don't have an account?" }}
            <button @click="toggleMode" class="toggle-button">
                {{ isRegistering ? 'Login' : 'Register' }}
            </button>
        </p>
    </div>
</template>

<style scoped lang="scss">
@use "sass:color";

.login-page {
    padding: 2rem;
    text-align: center;
}

.login-form {
    max-width: 300px;
    margin: 0 auto;
    
    .form-group {
        margin-bottom: 1rem;
        text-align: left;
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #FFECD1;
        }
        
        input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #FFECD1;
            color: #001524;
        }
    }
}

.login-button {
    width: 100%;
    padding: 0.8rem;
    background: #FF7D00;
    color: #FFECD1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background: color.adjust(#FF7D00, $lightness: -10%);
    }
}

.toggle-text {
    margin-top: 1rem;
    color: #FFECD1;
}

.toggle-button {
    background: none;
    border: none;
    color: #FF7D00;
    cursor: pointer;
    text-decoration: underline;
    padding: 0 0.5rem;

    &:hover {
        color: color.adjust(#FF7D00, $lightness: -10%);
    }
}

.error-message {
    color: #ff4757;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: rgba(255, 71, 87, 0.1);
    border-radius: 4px;
}

.error-message {
  color: #ff4757;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(255, 71, 87, 0.1);
  border-radius: 4px;
}

.login-form {
    max-width: 300px;
    margin: 0 auto;
    
    .form-group {
        margin-bottom: 1rem;
        text-align: left;
        
        label {
            display: block;
            margin-bottom: 0.5rem;
        }
        
        input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }
}

.login-button {
    width: 100%;
    padding: 0.8rem;
    background: #FF7D00;
    color: #FFECD1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background: color.adjust(#FF7D00, $lightness: -10%);
    }
}

.toggle-text {
    margin-top: 1rem;
    color: #FFECD1;
}

.toggle-button {
    background: none;
    border: none;
    color: #FF7D00;
    cursor: pointer;
    text-decoration: underline;
    padding: 0 0.5rem;

    &:hover {
        color: color.adjust(#FF7D00, $lightness: -10%);
    }
}
</style>