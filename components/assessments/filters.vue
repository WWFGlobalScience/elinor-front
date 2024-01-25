<template>
    <section class="section section--filters">
        <div class="container">
            <ul>
                <li>
                    <form id="form--search" @submit="$event.preventDefault()" class="form">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--ico">
                                    <input type="text" :placeholder="$t( 'pages.assessments.list.filters.search' )" v-model="searchText">
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
                    @click="popupState( {active: true, component : 'popup-assessment-aggregate-report', title: 'pages.assessments.list.aggregateReport.title' })">
                        <span class="btn--opacity__target">{{ $t( 'pages.assessments.list.aggregateReport.button' ) }}</span>
                        <img src="~/assets/img/ico-filters-turqy.svg">
                    </button>
                </li>
                <li>
                    <button type="button" class="btn--border-turqy btn--opacity--child"
                    @click="popupState( {active: true, component : 'popup-assessments-filter', title: 'pages.assessments.list.filters.popup.title' })">
                        <span class="btn--opacity__target"><template v-if="filtersApplied > 0">({{ filtersApplied }})</template> {{ $t( 'pages.assessments.list.filters.button' ) }}</span>
                        <img src="~/assets/img/ico-filters-turqy.svg">
                    </button>
                </li>
                <!--<li>
                    <button type="button" class="btn--border-turqy btn--opacity--child">
                        <span class="btn--opacity__target">{{ $t( 'default.order.button' ) }}</span>
                        <img src="~/assets/img/ico-order-turqy.svg">
                    </button>
                </li>-->
            </ul>
        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
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
    computed: {
        filtersApplied() {
            console.log(this.filters);
            return Object.keys(this.filters).filter(filterName => this.filters[filterName] !== null).length;
        },
        ...mapState({
            filters: state => state.assessments.filters
        })
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
