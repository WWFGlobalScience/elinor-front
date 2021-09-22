<template>
    <div class="popup__content popup--assessment-create">
        <form id="form--assessment-create" class="form form--assessment-create form--mt-0" @submit="submit">
            <div class="form__group">
                <div class="form__row">
                    <div class="input input--multiselect input--1-4">
                        <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.create.labels.year' ) }}*</label>
                        <div class="multiselect__wrap">
                            <multiselect placeholder="0000" select-label="Enter doesn’t work here!" :value="selectYear.value" :options="selectYear.options" :multiple="false" :searchable="true" :showLabels="false" :allow-empty="false" open-direction="bottom" :hide-selected="true" @input="onSelectYearChange" >
                                <span slot="noResult">{{ $t( 'default.noresults' ) }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                        <input type="number" name="year" :value="selectYear.value" style="display: none;">
                    </div>
                </div>
                <div class="form__row">
                    <div class="input">
                        <label class="label">{{ $t( 'pages.assessments.content.assessment-edit.create.labels.name' ) }}*</label>
                        <input type="text" name="name" :placeholder="$t( 'pages.assessments.content.assessment-edit.create.labels.name' )" required>
                    </div>
                </div>
                <div class="form__row -mt-3">
                    <div class="input">
                        <div class="legend">{{ $t( 'pages.assessments.content.assessment-edit.create.legends.name' ) }}</div>
                    </div>
                </div>
                <div class="form__row form__row--separator form__row--separator--20"></div>
                <div class="form__row flex justify-end mt-10">
                    <button type="submit" form="form--assessment-create" class="btn btn--opacity--child">
                        <span class="btn--opacity__target">{{ $t( 'pages.assessments.content.assessment-edit.create.labels.create' ) }}</span>
                        <img src="~/assets/img/ico-button-arrow.svg">
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapActions } from 'vuex'
export default {
    name: 'popup-assessment-create',
    data () {
        return {
            selectYear: {
                tocuhed: false,
                value: null,
                options: [ '2021', '2020' ]
            }
        }
    },
    methods: {
        ...mapActions({
            createAssessment: 'assessments/createAssessment'
        }),
        onSelectYearChange( value ) {
            this.selectYear.value = value
            console.log( document.querySelector( 'input[name="year"]' ).value )
        },
        submit() {
            event.preventDefault()
            this.createAssessment( event.target )
        }
    }
}
</script>
