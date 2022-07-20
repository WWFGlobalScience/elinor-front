<template>
    <footer class="footer--main" v-bind:class="[!isSidebarOpen ? 'footer--main--max' : null]">
        <nav class="footer--main__wrapper">
            <NuxtLink to="/">
                <img src="~/assets/img/elinor-sidebar-circle.svg" alt="elinor-icon turqy">
            </NuxtLink>
            <ul v-if="$route.path === '/'">
                <li class="btn--opacity--child">
                    <NuxtLink :to="`/faq/`" class="btn--opacity__target">
                        {{ $t('footer.faqs') }}
                    </NuxtLink>
                </li>
                <li class="btn--opacity--child">
                    <NuxtLink :to="`/methodology/`" class="btn--opacity__target">
                        {{ $t('footer.methodology') }}
                    </NuxtLink>
                </li>
                <li v-if="!$auth.loggedIn" class="btn--opacity--child">
                    <NuxtLink :to="`/create-account/`" class="btn--opacity__target">
                        {{ $t('footer.createAccount') }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
        <div class="footer--main__bottom">
            {{ $t('footer.copyright') }}
            {{ currentYear }}
            {{ $t('footer.copyrightAfterYear') }}
            <NuxtLink to="terms-of-use" class="btn--opacity--child">
                <span class="btn--opacity__target"> {{ $t('footer.termsOfUse') }}</span>
            </NuxtLink><!--
             |
            <NuxtLink to="privacy-policy" class="btn--opacity--child">
                <span class="btn--opacity__target"> {{ $t('footer.privacyPolicy') }}</span>
            </NuxtLink>-->
        </div>
    </footer>
</template>
<script>
    export default {
        name: 'default-footer',
        computed: {
            isSidebarOpen(){
                return this.$store.state.layout.sidebar
            },
            currentYear() {
                return new Date().getFullYear();
            }
        }
    }
</script>
