<template>
    <div class="popup__content">
        <div class="elinor__popup-intro">
            <div class="intro-content">
                <h4 class="title mb-2">{{ $t('pages.assessments.popup.title') }}</h4>
                <p class="text">{{ $t('pages.assessments.popup.text') }}</p>
            </div>
            <div class="intro-picture">
                <img src="../../assets/img/onboarding.svg" alt="Forest"/>
            </div>
        </div>
        <ul class="elinor__steps-list">
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">{{ $t('pages.assessments.popup.step-1.title') }}</h5>
                    <p class="text">{{ $t('pages.assessments.popup.step-1.text') }}</p>
                </div>
            </li>
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">{{ $t('pages.assessments.popup.step-2.title') }}</h5>
                    <p class="text">{{ $t('pages.assessments.popup.step-2.text') }}</p>
                </div>
            </li>
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">{{ $t('pages.assessments.popup.step-3.title') }}</h5>
                    <p class="text">{{ $t('pages.assessments.popup.step-3.text') }}</p>
                </div>
            </li>
            <li class="elinor__step-card">
                <div class="step-info">
                    <h5 class="title">{{ $t('pages.assessments.popup.step-4.title') }}</h5>
                    <p class="text">{{ $t('pages.assessments.popup.step-4.text') }}</p>
                </div>
            </li>
            <li class="elinor__step-card step-card--row">
                <div class="step-info">
                    <h5 class="title">{{ $t('pages.assessments.popup.step-5.title') }}</h5>
                    <p class="text">{{ $t('pages.assessments.popup.step-5.text') }}</p>
                </div>
                <span class="circle-rang">100%</span>
            </li>
        </ul>
        <div class="elinor__cta-bar">
            <h4 class="title">{{ $t('pages.assessments.popup.question') }}</h4>
            <ul class="elinor__btn-group">
                <li>
                    <a role="button" @click="close()" class="btn btn--opacity--child">
                        <span class="btn--opacity__target">{{ $t('pages.assessments.popup.answer-1') }}</span>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDggMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNy41IDQuMTMzOTdDOC4xNjY2NyA0LjUxODg3IDguMTY2NjcgNS40ODExMyA3LjUgNS44NjYwM0wxLjUgOS4zMzAxM0MwLjgzMzMzNCA5LjcxNTAzIDEuMjIwMzhlLTA3IDkuMjMzOSAxLjEyODU4ZS0wNyA4LjQ2NDFMMy4wMjQwM2UtMDggMS41MzU5QzIuMTA2MDVlLTA4IDAuNzY2MDk4IDAuODMzMzMzIDAuMjg0OTczIDEuNSAwLjY2OTg3M0w3LjUgNC4xMzM5N1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg=="/>
                    </a>
                </li>
                <li>
                    <a role="button" @click="createAssessment()" class="btn btn--opacity--child">
                        <span class="btn--opacity__target">{{ $t('pages.assessments.popup.answer-2') }}</span>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDggMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNy41IDQuMTMzOTdDOC4xNjY2NyA0LjUxODg3IDguMTY2NjcgNS40ODExMyA3LjUgNS44NjYwM0wxLjUgOS4zMzAxM0MwLjgzMzMzNCA5LjcxNTAzIDEuMjIwMzhlLTA3IDkuMjMzOSAxLjEyODU4ZS0wNyA4LjQ2NDFMMy4wMjQwM2UtMDggMS41MzU5QzIuMTA2MDVlLTA4IDAuNzY2MDk4IDAuODMzMzMzIDAuMjg0OTczIDEuNSAwLjY2OTg3M0w3LjUgNC4xMzM5N1oiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg=="/>
                    </a>
                </li>
            </ul>
        </div>
        <div class="mt-14">
            <div class="input input--radios input--radios-question">
                <div class="radios__wrap">
                    <div class="radio__wrap">
                        <div class="radio">
                            <input type="checkbox" name="answer" id="dontShowAgain" value="1" :checked="false" @change="showAgain($event.target.value)">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQuMTcyMzIgNi44OTk5MUwxMC45NjYxIDBMMTIgMS4wNTAwNEw0LjE3MjMyIDlMMCA0Ljc2MjUxTDEuMDMzODkgMy43MTI0N0w0LjE3MjMyIDYuODk5OTFaIiBmaWxsPSIjMzU5RTk4Ii8+DQo8L3N2Zz4NCg==">
                        </div>
                        <label for="dontShowAgain" class="label">{{ $t('pages.assessments.popup.label') }}</label>
                    </div>
                </div>
            </div>
        </div>
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
        createAssessment() {
            this.popupState( { active: true, component: 'popup-assessment-create', title: 'pages.assessments.list.create.popup.title' });
        },
        close() {
            this.popupState( { active: false });
        },
        showAgain(value) {
            console.log(value);
            if(value === '1') {
                localStorage.setItem('onboarding', '0');
            } else {
                localStorage.removeItem('onboarding');
            }
        }
    }
}
</script>
