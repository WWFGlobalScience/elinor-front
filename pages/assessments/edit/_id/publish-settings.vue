<template>
    <section class="section section--assessment-edit-publish-settings">
        <div class="container">
            <div class="flex items-center">
                <span class="rounded-number">100%</span>
                <h1 class="c-title--lg">{{ $t('pages.assessments.edit.tabs.publish.title') }}</h1>
            </div>

            <div class="container-lg--responsive py-12">
                <h2 class="c-title--base mb-6">{{ $t('pages.assessments.edit.tabs.publish.whatHappen') }}</h2>
                <ul class="list-inside list-disc list--light">
                    <li>{{ $t('pages.assessments.edit.tabs.publish.whatHappen1') }}</li>
                    <li>{{ $t('pages.assessments.edit.tabs.publish.whatHappen2') }}</li>
                    <li>{{ $t('pages.assessments.edit.tabs.publish.whatHappen3') }}</li>
                    <li>{{ $t('pages.assessments.edit.tabs.publish.whatHappen4') }}</li>
                    <li>{{ $t('pages.assessments.edit.tabs.publish.whatHappen5') }}</li>
                    <li>{{ $t('pages.assessments.edit.tabs.publish.whatHappen6') }}</li>
                </ul>
            </div>

            <div class="elinor__data-separator"></div>

            <div class="container-lg--responsive py-12">
                <form action="" class="form form--mt-0">
                    <div class="form__group g-grid--3-1-md">
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="status"
                                                id="status-public"
                                                :value="10"
                                                v-model="status"
                                                :checked="assessment.status === 10"
                                            />
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                    </div>
                                </div>
                                <label for="status-public" class="c-title--base">
                                    <span>{{ $t('pages.assessments.edit.tabs.publish.statuses.public.name') }}</span>
                                    <ul class="list-inside list-disc list--light">
                                        <li>{{ $t('pages.assessments.edit.tabs.publish.statuses.public.paragraph1') }}</li>
                                        <li>{{ $t('pages.assessments.edit.tabs.publish.statuses.public.paragraph2') }}</li>
                                    </ul>
                                </label>
                            </div>
                        </div>

                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="status"
                                                id="status-private"
                                                :value="90"
                                                v-model="status"
                                                :checked="assessment.status === 90"
                                            />
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                    </div>
                                </div>
                                <label for="status-private" class="c-title--base">
                                    <span>{{ $t('pages.assessments.edit.tabs.publish.statuses.private.name') }}</span>
                                    <ul class="list-inside list-disc list--light">
                                        <li>{{ $t('pages.assessments.edit.tabs.publish.statuses.private.paragraph1') }}</li>
                                        <li>{{ $t('pages.assessments.edit.tabs.publish.statuses.private.paragraph2') }}</li>
                                    </ul>
                                </label>
                            </div>
                        </div>

                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                        <div class="radio">
                                            <input
                                                type="radio"
                                                name="status"
                                                for="status-test"
                                                :value="80"
                                                v-model="status"
                                                :checked="assessment.status === 80"
                                            />
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                    </div>
                                </div>
                                <label for="status-test" class="c-title--base">
                                    <span>{{ $t('pages.assessments.edit.tabs.publish.statuses.test.name') }}</span>
                                    <ul class="list-inside list-disc list--light">
                                        <li>{{ $t('pages.assessments.edit.tabs.publish.statuses.test.paragraph1') }}</li>
                                        <li>{{ $t('pages.assessments.edit.tabs.publish.statuses.test.paragraph2') }}</li>
                                    </ul>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="elinor__data-separator"></div>
            <div class="container-lg--responsive">
                <div class="g-grid--4-1-sm items-center">
                    <div class="g-colspan--1-2-lg">
                        <button
                            type="button"
                            class="btn btn--opacity--child"
                            @click="
                popupState({
                  active: true,
                  type:'confirmation',
                  component: 'popup-assessment-publish',
                  title: $t('pages.assessments.edit.tabs.publish.popup.title'),
                  onConfirm: submit
                })
              "
                        >
                            <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.publish.publishButton') }}</span>
                            <img src="~/assets/img/ico-button-arrow.svg"/>
                        </button>
                    </div>
                    <div class="g-colspan--2">
                        <p>
                            <span class="c-text--warning c-text--base">{{ $t('pages.assessments.edit.tabs.publish.warning') }}</span>
                            {{ $t('pages.assessments.edit.tabs.publish.warningText') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from "vuex"

export default {
    name: "assessment-edit-publish-settings",
    layout: "assessment-edit",
    data() {
        return {
            status: null
        };
    },
    mounted() {
        this.status = this.assessment.status;
    },
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    },
    methods: {
        ...mapActions({
            publish: 'assessments/publish',
            popupState: 'popup/popupState'
        }),
        submit() {
            this.publish({id: this.assessment.id, status: this.status})
        }
    },
};
</script>
