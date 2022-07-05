<template>
    <div class="popup__content">
        <div class="elinor__popup-intro">
            <div class="intro-content">
                <h4 class="title mb-2">How to create an Assessment</h4>
                <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div class="intro-picture">
                <img src="../../assets/img/onboarding.svg" alt="Forest"/>
            </div>
        </div>
        <ul class="elinor__steps-list">
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
                <span class="circle-rang">100%</span>              
            </li>
        </ul>
        <div class="elinor__cta-bar">
            <h4 class="title">What can I do from here?</h4>
            <ul class="elinor__btn-group">
                <li>
                    <a href="/" class="btn btn--opacity--child">
                        <span class="btn--opacity__target">Go to assessments</span> 
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDggMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNy41IDQuMTMzOTdDOC4xNjY2NyA0LjUxODg3IDguMTY2NjcgNS40ODExMyA3LjUgNS44NjYwM0wxLjUgOS4zMzAxM0MwLjgzMzMzNCA5LjcxNTAzIDEuMjIwMzhlLTA3IDkuMjMzOSAxLjEyODU4ZS0wNyA4LjQ2NDFMMy4wMjQwM2UtMDggMS41MzU5QzIuMTA2MDVlLTA4IDAuNzY2MDk4IDAuODMzMzMzIDAuMjg0OTczIDEuNSAwLjY2OTg3M0w3LjUgNC4xMzM5N1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg=="/>
                    </a>
                </li>
                <li>
                    <a href="/" class="btn btn--opacity--child">
                        <span class="btn--opacity__target">Create an assessment</span> 
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDggMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNy41IDQuMTMzOTdDOC4xNjY2NyA0LjUxODg3IDguMTY2NjcgNS40ODExMyA3LjUgNS44NjYwM0wxLjUgOS4zMzAxM0MwLjgzMzMzNCA5LjcxNTAzIDEuMjIwMzhlLTA3IDkuMjMzOSAxLjEyODU4ZS0wNyA4LjQ2NDFMMy4wMjQwM2UtMDggMS41MzU5QzIuMTA2MDVlLTA4IDAuNzY2MDk4IDAuODMzMzMzIDAuMjg0OTczIDEuNSAwLjY2OTg3M0w3LjUgNC4xMzM5N1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg=="/>
                    </a>
                </li>
            </ul>
        </div>
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
