<template>
    <aside class="sidebar__main" id="elinor__sidebar" v-bind:class="[!isSidebarOpened ? 'sidebar__main--min' : null]">
        <div class="sidebar__wrap">
            <div class="brand">
                <NuxtLink to="/" class="flex items-center">
                <img src="~/assets/img/elinor-icon-white.svg" class="brand__icon">
                <img src="~/assets/img/elinor.svg" class="brand__text">
                </NuxtLink>
            </div>
            <nav class="nav__main">
                <ul>
                    <li v-for="(page, index) in pages">
                        <NuxtLink :to="`/${$t( page.slug )}`" class="btn--opacity--child nav__main__link">
                            <img v-if="page.icons.gray" :src="page.icons.gray" :alt="$t(page.title)" class="center-v">
                            <span class="btn--opacity__target">{{ $t( page.title ) }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="nav__main nav__main--bottom">
                <ul>
                    <li class="btn--opacity--child" @click="toggleSidebar">
                        <div class="nav__main__link">
                            <img v-if="isSidebarOpen" src="../assets/img/ico-minimize-white.svg" alt="minimize" class="center-v">
                            <img v-else src="../assets/img/ico-maximize-white.svg" alt="maximize" class="center-v w-4 btn--opacity__target">
                            <span class="btn--opacity__target">Minimize</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>


<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'default-sidebar',
        computed: {
            pages() {
                return this.$store.state.pages.list
            },
            isSidebarOpen(){
                return this.$store.state.layout.sidebar
            }
        },
        methods:{
            ...mapActions({
                toggleSidebar: 'layout/toggleSidebar'
            }),
        }
    }
</script>

