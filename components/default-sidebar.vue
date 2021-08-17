<template>
    <aside class="sidebar__main" v-bind:class="{'hidden': !showMenu, 'flex': showMenu}">
        <div class="sidebar__wrap">
            <div class="brand">
                <NuxtLink to="/" class="flex items-center">
                <img src="~/assets/img/elinor-icon-white.svg">
                <img src="~/assets/img/elinor.svg">
                </NuxtLink>
            </div>
            <nav class="nav__main">
                <ul>
                    <li v-for="(page, index) in pages">
                        <NuxtLink :to="`/${$t( page.slug )}`" class="btn--opacity--child">
                            <img v-if="page.icons.gray" :src="page.icons.gray" :alt="$t(page.title)" class="center-v">   
                            <span class="btn--opacity__target">{{ $t( page.title ) }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="nav__main nav__main--bottom">
                <ul>
                    <li>
                        <NuxtLink to="/" class="btn--opacity--child">
                        <img src="../assets/img/ico-minimize-white.svg" alt="minimize" class="center-v">
                        <span class="btn--opacity__target">Minimize</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>


<script>
    export default {
        name: 'default-sidebar',
        computed: {
            pages() {
                return this.$store.state.pages.list
            }
        }
    }
</script>

