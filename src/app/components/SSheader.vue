<template>
    <div class="ss-header">
        <h4>
            <router-link to='/watchSS'>{{title}}</router-link>>{{operation}}</h4>
    </div>
</template>
<script>
export default {
    props: ['title', 'operation']
}
</script>
<style scoped>
.ss-header {
    font-size: 16px;
}

.ss-header a {
    color: lightblue;
    text-decoration: none;
}
</style>
