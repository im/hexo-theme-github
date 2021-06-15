<template>
    <main>
        <UnderlineNav></UnderlineNav>
        <!-- <div class="container-xl px-3 px-md-4 px-lg-5">
            <div
                class="
                    gutter-condensed gutter-lg
                    flex-column flex-md-row
                    d-flex
                "
            >
                <div class="flex-shrink-0 col-12 col-md-3 mb-4 mb-md-0">
                    <Profile></Profile>
                </div>
                <div class="flex-shrink-0 col-12 col-md-9 mb-4 mb-md-0">
                    <router-view></router-view>
                </div>
            </div>
        </div> -->
        <div style="height: 10000px"></div>
    </main>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import UnderlineNav from 'components/tags/home/underlineNav.vue'
import Profile from 'components/tags/home/profile.vue'
export default defineComponent({
    components: {
        UnderlineNav,
    },
})
</script>

<style scoped lang="stylus"></style>
