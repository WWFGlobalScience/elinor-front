<template>
    <footer class="footer--main" v-bind:class="[!isSidebarOpen ? 'footer--main--max' : null]">
        <nav class="footer--main__wrapper">
            <img src="~/assets/img/elinor-sidebar-circle.svg" alt="elinor-icon turqy">
            <ul>
                <li class="btn--opacity--child">
                    <NuxtLink to="'/'" class="btn--opacity__target">
                        About
                    </NuxtLink>
                </li>
                <li class="btn--opacity--child">
                    <NuxtLink :to="`/faq/`" class="btn--opacity__target">
                        FAQs
                    </NuxtLink>
                </li>
                <li class="btn--opacity--child">
                    <NuxtLink :to="`/methodology/`" class="btn--opacity__target">
                        Methodology
                    </NuxtLink>
                </li>
                <li v-if="!$auth.loggedIn" class="btn--opacity--child">
                    <NuxtLink :to="`/create-account/`" class="btn--opacity__target">
                        Create Account
                    </NuxtLink>
                </li>
            </ul>
        </nav>
        <div class="footer--main__bottom">
            © Copright 2021 Elinor. All rights reserved. <NuxtLink to="'/'" class="btn--opacity--child"><span class="btn--opacity__target">Terms of Use</span> </NuxtLink> | <NuxtLink to="'/'" class="btn--opacity--child"><span class="btn--opacity__target">Privacy Policy</span></NuxtLink>
        </div>
    </footer>
</template>
<script>
    export default {
        name: 'default-footer',
        computed: {
            isSidebarOpen(){
                return this.$store.state.layout.sidebar
            }
        }
    }
</script>
