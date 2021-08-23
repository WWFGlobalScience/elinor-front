<template>
    <div class="popup__content popup--collaborator-add">
        <form id="form--assessment-create" class="form form--assessment-create form--mt-0" @submit="submit">
            <input v-if="assessment" type="hidden" name="assessment" :value="assessment.id">
            <div class="form__group">
                <div class="form__row">
                    <div class="input input--multiselect input--1-4">
                        <label class="label">
                            Select collaborator
                        </label>
                        <div class="multiselect__wrap">
                            <multiselect
                                placeholder="Select..." select-label="Enter doesn’t work here!"
                                :value="users.id"
                                track-by="id"
                                label="username"
                                :options="users"
                                :multiple="false" :searchable="true" :showLabels="false"
                                :allow-empty="false" :hide-selected="true" v-model="selectedUser" @search-change="findUsers">
                                <span slot="noResult">{{ $t('default.noresults') }}</span>
                            </multiselect>
                            <div class="multiselect__caret">
                                <img src="~/assets/img/ico-select-turqy.svg">
                            </div>
                        </div>
                        <input type="hidden" name="user" :value="selectedUser.id"/>
                    </div>
                </div>
                <h2>Select role & permissions</h2>
                <div class="form__row">
                    <div class="input">
                        <label class="label">
                            Admin
                        </label>
                        <input type="radio" v-model="role" name="role" value="70"/>
                    </div>
                </div>
                <div class="form__row">
                    <div class="input">
                        <label class="label">
                            Contributor
                        </label>
                        <input type="radio" v-model="role" name="role" value="40"/>
                    </div>
                </div>
                <div class="form__row">
                    <div class="input">
                        <label class="label">
                            Observer
                        </label>
                        <input type="radio" v-model="role" name="role" value="10"/>
                    </div>
                </div>
                <div class="form__row">
                    <div class="input">
                        <button type="submit">Add collaborator</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapState} from 'vuex'

export default {
    name: 'popup-collaborator-add',
    props: {
        props: null
    },
    data() {
        return {
            selectedUser: {},
            role: null,
        }
    },
    methods: {
        ...mapActions({
            findUsers: 'users/findUsers',
            createCollaborator: 'collaborators/createCollaborator'
        }),
        submit(e) {
            e.preventDefault()
            console.log();
            this.createCollaborator(e.target)
        }
    },
    computed: {
        ...mapState({
            users: state => state.users.users,
            assessment: state => state.assessments.assessment
        })
    },
}
</script>
