<template>
    <section class="section section--filters">
        <div class="container">
            <ul>
                <li>
                    <form id="form--search" @submit="$event.preventDefault()" class="form">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--ico">
                                    <input type="text" :placeholder="$t( 'default.search' )" v-model="searchText">
                                    <div class="input__ico">
                                        <span></span>
                                        <button type="submit" form="form--search">
                                            <img src="~/assets/img/ico-search-turqy.svg">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </li>
                <li>
                    <button type="button" class="btn--border-turqy btn--opacity--child"
                    @click="popupState( {active: true, component : 'popup-assessments-filter', title: 'pages.assessments.content.filters.title' })">
                        <span class="btn--opacity__target">{{ $t( 'default.filters.button' ) }}</span>
                        <img src="~/assets/img/ico-filters-turqy.svg">
                    </button>
                </li>
                <li>
                    <button type="button" class="btn--border-turqy btn--opacity--child">
                        <span class="btn--opacity__target">{{ $t( 'default.order.button' ) }}</span>
                        <img src="~/assets/img/ico-order-turqy.svg">
                    </button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'assessments-filters',
    data() {
        return {
            timer: null,
            searchText: null
        }
    },
    watch: {
        searchText(value) {
            this.delay(() => {
                this.search(value);
            }, 800);
        }
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            search: 'assessments/search'
        }),
        delay(fn, ms)  {
            clearTimeout(this.timer);
            this.timer = setTimeout(fn, ms || 0);
        }
    }
}
</script>
