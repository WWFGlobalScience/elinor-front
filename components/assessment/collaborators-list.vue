<template>
    <section class="elinor__collaborators">
        <div class="container">
        <form action="" class="form form--mt-0">
                <table class="c-data-table">
                <thead>
                <tr>
                    <th class="c-data-table__main-cell">Name</th>
                    <th>Status</th>
                    <th>Admin</th>
                    <th>Contributor</th>
                    <th>Observer</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="collaborator in collaborators">
                    <td class="c-data-table__main-cell"><span class="c-data-table__initial admin">N</span>{{ collaborator.user_obj.username }}</td>
                    <td>TODO</td>
                    <td>
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--radios input--radios-question">
                                    <div class="radios__wrap">
                                        <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" :name="'role-' + collaborator.id" value="70" :checked="collaborator.role == 70"
                                            @input="updateColl(70, collaborator)"/>
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                    <div class="radio">
                                        <input type="radio" :name="'role-' + collaborator.id" value="40" :checked="collaborator.role == 40"
                                        @input="updateColl(40, collaborator)"/>
                                        <img src="~/assets/img/ico-ok.svg"/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </td>
                    <td>
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--radios input--radios-question">
                                    <div class="radios__wrap">
                                        <div class="radio__wrap">
                                        <div class="radio">
                                            <input type="radio" :name="'role-' + collaborator.id" value="10" :checked="collaborator.role == 10"
                                            @input="updateColl(10, collaborator)"/>
                                            <img src="~/assets/img/ico-ok.svg"/>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn--circle btn--opacity--child"
                            @click="popupState( { active: true, component: 'popup-assessment-delete', title: 'Deleting Collaborator' })"
                            >
                                <span class="sr-only">delete</span>
                                <img class="btn--opacity__target" src="~/assets/img/ico-trash.svg">
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        </div>
    </section>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'assessment-collaborators-list',
    methods: {
        ...mapActions({
            fetchCollaborators: 'collaborators/fetchCollaborators',
            updateCollaborator: 'collaborators/updateCollaborator'
        }),
        updateColl(role, collaborator){
            this.updateCollaborator({role, collaborator})
        }
    },
    computed: {
        ...mapState({
            collaborators: state => state.collaborators.collaborators,
            assessment: state => state.assessments.assessment
        })
    },
    mounted() {
        setTimeout(() => {
            this.fetchCollaborators(this.assessment.id);
        }, 1000);
    }
}
</script>
