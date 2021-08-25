<template>
    <div class="popup__content popup--assessment-publish">
        <h4 class="c-title--modal c-title--modal--alert mb-2">
            Are you sure you want to publish your assessment?
        </h4>
        <p class="c-text--base mb-6">
            Once publicated you can not edit the Survey or Assessment Data, so publish only when you finish your Assessment
        </p>
        <div class="g-grid--2">
            <div>
                <button type="button" class="btn--border-turqy btn--opacity--child">
                     <span class="btn--opacity__target">Yes</span>
                </button>
            </div>
            <div>
                <button type="button" class="btn--border-turqy btn--opacity--child">
                     <span class="btn--opacity__target">No</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'popup-assessment-publish' 
}
</script>