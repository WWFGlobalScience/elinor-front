<template>
    <section class="section section--ma-edit-selector">
        <div class="container">
            <header>
                <h2>Managed Area</h2>
            </header>
        </div>
        <form class="form form--ma-selector">
            <div class="form__group">
                <div class="container--sm">
                    <div class="form__row">
                        <div class="input input--multiselect">
                            <label class="label">Select a Managed Area*</label>
                            <div class="multiselect__wrap">
                                <multiselect :value="maSelector.value" :options="maSelector.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" :hide-selected="true" @input="maSelectorChange">
                                    <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                                </multiselect>
                                <div class="multiselect__caret">
                                    <img src="~/assets/img/ico-select-turqy.svg">
                                </div>
                            </div>
                            <div class="legend mt-2">You can select an already created Managed Area, or if you don’t find it you can create a new one from here</div>
                        </div>
                    </div>
                    <div class="form__row">
                        <div class="input input--button">
                            <label class="label label--stripped"><span>OR CREATE A NEW ONE</span></label>
                            <button type="button" class="btn--border-turqy btn--opacity--child btn--arrow-down" @click="maSelectorNew">
                                <span>Create New Managed Area</span>
                                <img src="~/assets/img/ico-arrow-bottom-turqy.svg">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'ma-edit-selector',
    props: [ 'maSelector', 'maOrigin' ],
    methods: {
        ...mapActions({
            maSelectorChange: 'ma/maSelectorChange',
            maSelectorNew: 'ma/maSelectorNew'
        })
    }

}
</script>