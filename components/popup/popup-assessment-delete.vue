<template>
    <div class="popup__content">
        <p>Assessment delete</p>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-delete',
    computed: {
        ...mapState({
            popup: state => state.popup.popup
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState'
        }),
        close() {
            this.popupState({active: false});
        }
    }
}
</script>
