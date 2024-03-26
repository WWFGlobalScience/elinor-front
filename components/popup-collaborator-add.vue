<template>
    <div class="popup__content popup--collaborator-add">

        <div v-if="error" class="bg-red-100 border border-red-400 text-white-700 px-4 py-3 rounded relative mt-5 mb-10"
             role="alert">
            <strong class="font-bold">{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.error') }}</strong>
        </div>

        <p class="c-text--base mb-8">
            {{ $t('pages.assessments.edit.tabs.collaborators.popups.add.description') }}
        </p>

        <h4 class="c-title--modal mb-6">{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.selectCollaboratorTitle') }}</h4>
        <form
            id="form--assessment-create"
            class="form form--assessment-create form--mt-0"
            @submit="submit"
        >
            <input
                v-if="assessment"
                type="hidden"
                name="assessment"
                :value="assessment.id"
            />
            <div class="form__group">
                <div class="form__row">
                    <div class="input input--multiselect input--3-4">
                        <label class="label">
                            {{ $t('pages.assessments.edit.tabs.collaborators.popups.add.selectCollaboratorLabel') }}
                            <span v-if="hasError('non_field_errors')" class="msg msg--error">{{ getError('non_field_errors') }}</span>
                        </label>
                        <div class="multiselect__wrap">
                            <multiselect
                                :value="users.id"
                                :class="{'input--error': hasError('non_field_errors')}"
                                track-by="id"
                                label="username"
                                :options="users"
                                :multiple="false"
                                :searchable="true"
                                :showLabels="false"
                                :allow-empty="false" open-direction="bottom"
                                :hide-selected="true"
                                v-model="selectedUser"
                                @search-change="findUsers"
                            >
                                <span slot="noResult">{{ $t("default.noresults") }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg"/>
                            </div>
                        </div>
                        <input type="hidden" name="user" :value="selectedUser.id"/>
                    </div>
                </div>
                <h4 class="c-title--modal mb-6">
                    {{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roleAndPermissions') }}
                    <span v-if="hasError('role')" class="msg msg--error">{{ getError('role') }}</span>
                </h4>
                <div class="form__group g-grid--3-1-md">
                    <div v-if="isAdmin($auth, assessment)" class="form__row">
                        <div class="input input--radios input--radios-question">
                            <div class="radios__wrap">
                                <div class="radio__wrap">
                                    <div class="radio">
                                        <input
                                            type="radio"
                                            :class="{'input--error': hasError('role')}"
                                            v-model="role"
                                            name="role"
                                            value="70"
                                            id="answer-1"
                                        />
                                        <img src="~/assets/img/ico-ok.svg"/>
                                    </div>
                                </div>
                            </div>
                            <label for="answer-1" class="c-title--base">
                                <span>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.name') }}</span>
                                <ul class="list-inside list-disc list--light">
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.permission1') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.permission2') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.permission3') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.permission4') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.permission5') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.admin.permission6') }}</li>
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
                                            v-model="role"
                                            name="role"
                                            value="40"
                                            id="answer-2"
                                            :class="{'input--error': hasError('role')}"
                                        />
                                        <img src="~/assets/img/ico-ok.svg"/>
                                    </div>
                                </div>
                            </div>
                            <label for="answer-2" class="c-title--base">
                                <span>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.contributor.name') }}</span>
                                <ul class="list-inside list-disc list--light">
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.contributor.permission1') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.contributor.permission2') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.contributor.permission3') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.contributor.permission4') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.contributor.permission5') }}</li>
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
                                            v-model="role"
                                            name="role"
                                            value="10"
                                            id="answer-3"
                                            :class="{'input--error': hasError('role')}"
                                        />
                                        <img src="~/assets/img/ico-ok.svg"/>
                                    </div>
                                </div>
                            </div>
                            <label for="answer-3" class="c-title--base">
                                <span>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.observer.name') }}</span>
                                <ul class="list-inside list-disc list--light">
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.observer.permission1') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.observer.permission2') }}</li>
                                    <li>{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.roles.observer.permission3') }}</li>
                                </ul>
                            </label>
                        </div>
                    </div>
                </div>
                <p v-if="hasError('detail')" class="msg msg--error">{{ getError('detail') }}</p>
                <div class="elinor__data-separator"></div>
                <div class="g-grid--4-1-sm items-center">
                    <div class="g-colspan--2">
                        <div class="form__row">
                            <div class="input">
                                <button
                                    type="submit"
                                    class="btn--border-turqy btn--opacity--child"
                                >
                                    <span class="btn--opacity__target">{{ $t('pages.assessments.edit.tabs.collaborators.popups.add.submit') }}</span>
                                    <img
                                        src="~/assets/img/addcollaborator.svg"
                                        :alt="$t('pages.assessments.edit.tabs.collaborators.popups.add.submit')"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="g-colspan--2">
                        <div class="message-detail">
                            <p class="message-detail__title">
                                {{ $t('pages.assessments.edit.tabs.collaborators.popups.add.help') }}
                            </p>
                            <!--<p class="message-detail__text btn--opacity--child">
                                If you don’t find your collaborator you can
                                <NuxtLink to="" class="text-turqy btn--opacity__target">
                                    send an invitation
                                </NuxtLink>
                                to the app, you will be notified once joins
                            </p>-->
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {isAssessmentAdmin} from "~/config/assessment-roles";

export default {
    name: "popup-collaborator-add",
    data() {
        return {
            selectedUser: {},
            role: null,
        };
    },
    mounted() {
        this.$store.commit('collaborators/clearError');
    },
    methods: {
        ...mapActions({
            findUsers: "users/findUsers",
            createCollaborator: "collaborators/createCollaborator",
        }),
        submit(e) {
            e.preventDefault();
            this.createCollaborator(e.target);
        },
        isAdmin: isAssessmentAdmin,
        hasError(error) {
            return !!(this.error && this.error[error]);
        },
        getError(error) {
            let message = this.error && this.error[error];
            if(typeof message !== 'string' && message && message.length >= 0) {
                message = message[0];
            }
            return message;
        }
    },
    computed: {
        ...mapState({
            users: (state) => state.users.users,
            assessment: (state) => state.assessments.assessment,
            error: (state) => state.collaborators.error,
        }),
    },
};
</script>
