<template>
    <main>
        <UnderlineNav class="hidden-xs-only"></UnderlineNav>
        <el-row class="home-main">
            <el-col :span="6" :xs="24">
                <Profile></Profile>
            </el-col>
            <el-col :span="24" class="hidden-sm-and-up">
                <UnderlineNav ></UnderlineNav>
            </el-col>
            <el-col :span="18" :xs="24">
                <router-view></router-view>
            </el-col>
        </el-row>
    </main>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import UnderlineNav from 'components/tags/home/underlineNav.vue'
import Profile from 'components/tags/home/profile.vue'
export default defineComponent({
    components: {
        UnderlineNav,
        Profile,
    },
})
</script>

<style scoped lang="stylus">
.home-main
    padding 0 24px
@media only screen and (max-width: 768px)
    .home-main
        padding 0 10px
</style>
