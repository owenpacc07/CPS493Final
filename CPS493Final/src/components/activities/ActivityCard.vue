<script setup>
const props = defineProps({
    activity: {
        type: Object,
        required: true
    },
    showActions: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
    <div class="activity-card">
        <div class="activity-header">
            <h3>{{ activity.type }}</h3>
            <div v-if="showActions" class="activity-actions">
                <button @click="$emit('edit')" class="edit-btn">Edit</button>
                <button @click="$emit('delete')" class="delete-btn">Delete</button>
            </div>
        </div>
        <div class="activity-details">
            <p>Duration: {{ activity.duration }} minutes</p>
            <p>Distance: {{ activity.distance }} km</p>
            <p>Date: {{ new Date(activity.date).toLocaleDateString() }}</p>
            <p v-if="activity.notes">Notes: {{ activity.notes }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.activity-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
    margin-bottom: 1rem;
}

.activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
        color: #FF7D00;
        margin: 0;
    }
}

.activity-actions {
    display: flex;
    gap: 0.5rem;
}

.edit-btn, .delete-btn {
    padding: 0.3rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #FFECD1;
}

.edit-btn {
    background: #15616D;
}

.delete-btn {
    background: #78290F;
}

.activity-details p {
    margin: 0.5rem 0;
    color: #001524;
}
</style>
