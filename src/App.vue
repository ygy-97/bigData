<template>
<div>
    <router-view></router-view>
</div>

</template>

<script>
export default {
    methods:{
        toAbout(){
            this.$router.push('/hotBar')
        }
    }
}
</script>

<style scoped lang='less'>

</style>