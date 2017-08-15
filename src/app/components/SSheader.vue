<template>
    <div class="ss-header">
        <h4>
            <router-link to='/'>{{title}}</router-link>>{{operation}}</h4>
    </div>
</template>
<script>
export default {
    props: ['title', 'operation']
}
</script>
<style scoped>
h4 {
    font-size: 16px;
    line-height: 16px;
    margin: 0.6em 0 1em 0;
    color: #666;
}

.ss-header {
    font-size: 16px;
}

.ss-header a {
    color: #4747ff;
    text-decoration: none;
}
</style>
