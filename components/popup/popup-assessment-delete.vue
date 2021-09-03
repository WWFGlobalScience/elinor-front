<template>
    <div class="popup__content popup--assessment-delete">
        <h4 class="c-title--modal c-title--modal--alert mb-2">
            Are you sure?
        </h4>
        <p class="c-text--base mb-6">
            By clicking yes you will remove the collaborator making them unable to access the assessment.
        </p>
        <div class="g-grid--2">
            <div>
                <button type="button" class="btn--border-turqy btn--opacity--child"
                        @click="deleteCollaborator(collaboratorId)">
                    Yes
                </button>
            </div>
            <div>
                <button type="button" class="btn--border-turqy btn--opacity--child"
                        @click="popupState(false, '', '')">
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'popup-assessment-delete',
    props: {
        props: null
    },
    data() {
        return {
            collaboratorId: null,
        }
    },
    methods: {
        ...mapActions({
            deleteCollaborator: 'collaborators/deleteCollaborator',
            popupState: 'popup/popupState',
        }),
    },
    mounted() {
        this.collaboratorId = this.props.collaboratorId;
    }
}
</script>
