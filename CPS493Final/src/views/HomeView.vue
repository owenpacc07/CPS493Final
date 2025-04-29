<script setup>
import { useUserStore } from '@/stores/user'
import { useActivityStore } from '@/stores/activities'
import { onMounted, computed } from 'vue'
import StatsDisplay from '@/components/stats/StatsDisplay.vue'
import ActivityList from '@/components/activities/ActivityList.vue'

const userStore = useUserStore()
const activityStore = useActivityStore()

const recentActivities = computed(() => {
    return [...activityStore.activities]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
})

onMounted(async () => {
  await activityStore.fetchActivities()
})
</script>

<template>
  <div class="container">
    <template v-if="userStore.isLoggedIn">
      <h1>Welcome, {{ userStore.currentUser?.name }}</h1>
      <div class="dashboard">
        <StatsDisplay />
        <div class="content-section">
          <div class="recent-activities">
            <h2>Recent Activities</h2>
            <div class="activities-grid">
              <div v-for="activity in recentActivities" 
                   :key="activity._id" 
                   class="activity-preview">
                <div class="activity-header">
                  <h3>{{ activity.type }}</h3>
                  <span class="date">{{ new Date(activity.date).toLocaleDateString() }}</span>
                </div>
                <div class="activity-stats">
                  <span>{{ activity.distance }} km</span>
                  <span>{{ activity.duration }} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h1>Welcome to Fitness Tracker</h1>
      <div class="cta">
        <RouterLink to="/login" class="login-btn">Login to Get Started</RouterLink>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";

.container {
  padding: 2rem;
  text-align: center;
}

.cta {
  margin-top: 2rem;
}

.login-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #FF7D00;
  color: #FFECD1;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: color.adjust(#FF7D00, $lightness: -10%);
  }
}

.dashboard {
  margin-top: 2rem;
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  margin-bottom: 2rem;
}

.friend-count-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  width: 150px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h3 {
    color: #FF7D00;
    margin: 0 0 0.5rem 0;
  }

  .count {
    font-size: 2rem;
    font-weight: bold;
    color: #15616D;
    margin: 0;
  }
}

.recent-activities {
  border-radius: 8px;
  padding: 1.5rem;
  padding-top: 0;  // Remove top padding since we want it aligned with stats

  h2 {
    color: #FF7D00;
    margin: 0 0 1rem 0;
  }
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.activity-preview {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    h3 {
      color: #FF7D00;
      margin: 0;
    }

    .date {
      color: #666;
      font-size: 0.9rem;
    }
  }

  .activity-stats {
    display: flex;
    justify-content: space-between;
    color: #15616D;
    font-weight: 500;
  }
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.recent-activities {
  width: 100%;
  max-width: 1200px;  // Or your preferred max width
  border-radius: 8px;
  padding: 1.5rem;
}

.friends-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;

  .friends-header {
    grid-column: span 3;
    display: flex;
    justify-content: center;  // Center the header
    align-items: center;
    margin-bottom: 1rem;

    h2 {
      margin-right: 1rem;  // Add space between title and count
    }
  }

  .friend-preview {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.friend-preview {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    color: #FF7D00;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #15616D;
    margin: 0;
    font-size: 0.9rem;
  }
}

.friends-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .friend-count {
    background: white;
    padding: 0.8rem;
    border-radius: 8px;
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    .count {
      font-size: 1.5rem;
      font-weight: bold;
      color: #FF7D00;
    }

    .label {
      font-size: 0.8rem;
      color: #666;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #FFECD1;
  font-size: 0.9rem;
}
</style>