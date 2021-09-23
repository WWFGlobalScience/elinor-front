<template>
    <section class="section section--filters">
        <div class="container">
            <ul>
                <li>
                    <form id="form--search" action="" class="form">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--ico">
                                    <input type="text" :placeholder="$t( 'default.search' )" @keyup="search($event.target.value)" @keydown="search($event.target.value)">
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
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
            fetchAssessments: 'assessments/fetchAssessments'
        }),
        search(text) {
            this.fetchAssessments({search: text});
        }
    }
}
</script>
