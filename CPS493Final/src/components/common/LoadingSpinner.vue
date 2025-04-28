<template>
    <div class="loading-spinner">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>
.loading-spinner {
    display: flex;
    justify-content: center;
    padding: 1rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #FFECD1;
    border-top: 4px solid #FF7D00;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
