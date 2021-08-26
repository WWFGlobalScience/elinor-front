<template>
    <div class="popup__content popup--assessment-delete">
        <h4 class="c-title--modal c-title--modal--alert mb-2">
           Are you sure?
        </h4>
        <p class="c-text--base mb-6">
            By clicking yes you will delete the user so he/she coud not access the data  lorem ipsum dolor
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
    name: 'popup-assessment-delete' 
}
</script>