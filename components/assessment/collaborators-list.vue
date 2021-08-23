<template>
    <section class="elinor__collaborators">
        <!--        <div class="container">-->
        <!--            <div class="thead">-->
        <!--                <div class="th">Name</div>-->
        <!--                <div class="th">Status</div>-->
        <!--                <div class="th">Admin</div>-->
        <!--                <div class="th">Contributor</div>-->
        <!--                <div class="th">Observer</div>-->
        <!--            </div>-->
        <!--        </div>-->
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Admin</th>
                <th>Contributor</th>
                <th>Observer</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="collaborator in collaborators">
                <td>{{ collaborator.user_obj.username }}</td>
                <td>TODO</td>
                <td>
                    <input type="radio" :name="'role-' + collaborator.id" value="70" :checked="collaborator.role == 70"
                           @input="updateColl(70, collaborator)"/>
                </td>
                <td>
                    <input type="radio" :name="'role-' + collaborator.id" value="40" :checked="collaborator.role == 40"
                           @input="updateColl(40, collaborator)"/>
                </td>
                <td>
                    <input type="radio" :name="'role-' + collaborator.id" value="10" :checked="collaborator.role == 10"
                           @input="updateColl(10, collaborator)"/>
                </td>
            </tr>
            </tbody>
        </table>
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
