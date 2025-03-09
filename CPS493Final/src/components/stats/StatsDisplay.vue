<script setup>
import { computed } from 'vue'
import { useActivityStore } from '@/stores/activities'

const activityStore = useActivityStore()

const stats = computed(() => {
    const activities = activityStore.userActivities
    return {
        totalActivities: activities.length,
        totalDistance: activities.reduce((sum, act) => sum + Number(act.distance), 0).toFixed(1),
        totalDuration: activities.reduce((sum, act) => sum + Number(act.duration), 0),
        byType: activities.reduce((acc, act) => {
            acc[act.type] = (acc[act.type] || 0) + 1
            return acc
        }, {})
    }
})
</script>

<template>
    <div class="stats-container">
        <h2>Your Activity Statistics</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Activities</h3>
                <p class="stat-value">{{ stats.totalActivities }}</p>
            </div>
            <div class="stat-card">
                <h3>Total Distance</h3>
                <p class="stat-value">{{ stats.totalDistance }} km</p>
            </div>
            <div class="stat-card">
                <h3>Total Duration</h3>
                <p class="stat-value">{{ stats.totalDuration }} minutes</p>
            </div>
            <div class="stat-card types">
                <h3>Activities by Type</h3>
                <ul>
                    <li v-for="(count, type) in stats.byType" :key="type">
                        {{ type }}: {{ count }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.stats-container {
    margin: 2rem 0;
    padding: 1rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.stat-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;

    h3 {
        color: #FF7D00;  // Change from #666
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: #FF7D00;  // Change from #15616D
    }

    &.types ul {
        list-style: none;
        padding: 0;
        text-align: left;

        li {
            padding: 0.2rem 0;
            color: #FF7D00;  // Add this line
        }
    }
}

.stat-value {
    color: #15616D;
}

h2 {
    color: #FF7D00;
}
</style>
