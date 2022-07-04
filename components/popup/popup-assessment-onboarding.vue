<template>
    <div class="popup__content popup--assessment-delete">
        <h4 class="c-title--modal c-title--modal--alert mb-2">
            {{ $t('pages.assessments.edit.tabs.collaborators.popups.delete.confirmationTitle') }}
        </h4>
        <p class="c-text--base mb-6">
            {{ $t('pages.assessments.edit.tabs.collaborators.popups.delete.confirmationDescription') }}
        </p>
        <ul class="g-grid--2 elinor__steps-list">
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">Assessment Data</h5>
                    <p class="text">Complete the information related to the ASSESMENT, such as the number of people consulted or related institutions</p>
                </div>                
            </li>
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">Management Area</h5>
                    <p class="text">Identify the Management Area, its belonging to some PA and upload the shape or draw on the map its location.</p>
                </div>                
            </li>
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">The survey</h5>
                    <p class="text">Answer the questions from the Survey. You can select those attributes that best adapt to your Assessment</p>
                </div>                
            </li>
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">Collaborators</h5>
                    <p class="text">Invite collaborators to help you complete the Assessment, or share only as an observer</p>
                </div>                
            </li>
            <li class="elinor__step-card step-card--row">
                <div class="step-info">
                    <h5 class="title">Publish</h5>
                    <p class="text">Once the Assessment is finished you can publish it, making it accessible from the public zone of the web</p>
                </div>                
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: 'popup-assessment-delete',
    computed: {
        ...mapState({
            popup: state => state.popup.popup,
        })
    },
    methods: {
        ...mapActions({
            popupState: 'popup/popupState',
        }),
    }
}
</script>
