<template>
    <section class="elinor__collaborators">
        <div class="container">
        <form action="" class="form form--mt-0">
                <table class="c-data-table">
                <thead>
                <tr>
                    <th class="c-data-table__main-cell">Name</th>
                    <th>Admin</th>
                    <th>Contributor</th>
                    <th>Observer</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="collaborator in assessment.collaborators">
                    <td class="c-data-table__main-cell"><span :class="{'c-data-table__initial': true, 'admin': collaborator.role === 70, 'contributor': collaborator.role === 40, 'observer': collaborator.role === 10}">{{ collaborator.user.username.charAt(0) }}</span>{{ collaborator.user.username }}</td>
                    <td>
                        <div class="form__group">
                            <div class="form__row">
                                <div v-if="permissionToCollaboratorRoleEdit(collaborator, 70)" class="input input--radios input--radios-question">
                                    <div class="radios__wrap">
                                        <div class="radio__wrap">
                                        <div class="radio">
                                            <input :disabled="!isAdmin($auth, assessment)" type="radio" :name="'role-' + collaborator.id" value="70" :checked="collaborator.role === 70"
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
                            <div v-if="permissionToCollaboratorRoleEdit(collaborator, 40)" class="input input--radios input--radios-question">
                                <div class="radios__wrap">
                                    <div class="radio__wrap">
                                    <div class="radio">
                                        <input :disabled="!isAdmin($auth, assessment)" type="radio" :name="'role-' + collaborator.id" value="40" :checked="collaborator.role == 40"
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
                                <div v-if="permissionToCollaboratorRoleEdit(collaborator, 10)" class="input input--radios input--radios-question">
                                    <div class="radios__wrap">
                                        <div class="radio__wrap">
                                        <div class="radio">
                                            <input :disabled="!isAdmin($auth, assessment)" type="radio" :name="'role-' + collaborator.id" value="10" :checked="collaborator.role == 10"
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
                        <button v-if="!isLastAdmin() && isAdmin($auth, assessment)" type="button" class="btn--circle btn--opacity--child"
                                @click="popupState( { active: true, type:'confirmation', component: 'popup-assessment-delete', title: 'Deleting Collaborator', onConfirm: onConfirmDelete(collaborator.id) })"
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
import {isAssessmentAdmin} from "~/config/assessment-roles";

export default {
    name: 'assessment-edit-collaborators-list',
    computed: {
        ...mapState({
            assessment: state => state.assessments.assessment
        })
    },
    methods: {
        ...mapActions({
            updateCollaborator: 'collaborators/updateCollaborator',
            deleteCollaborator: 'collaborators/deleteCollaborator',
            popupState: 'popup/popupState'
        }),
        updateColl(role, collaborator){
            this.updateCollaborator({role, collaborator, assessmentId: this.assessment.id})
        },
        onConfirmDelete(collaboratorId) {
            return () => {
                this.deleteCollaborator(collaboratorId);
            }
        },
        isLastAdmin() {
            return this.assessment.collaborators.filter(collaborator => collaborator.role !== 70).length === 1;
        },
        permissionToCollaboratorRoleEdit(collaborator, role) {
           return collaborator.role === role || this.isAdmin(this.$auth, this.assessment);
        },
        isAdmin: isAssessmentAdmin
    }
}
</script>
