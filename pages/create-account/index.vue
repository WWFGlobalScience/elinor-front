<template>
    <article class="page page--create-account">
        <header class="header--page">
            <div class="container--sm">
                <h1 class="c-title--sm">{{ $t( 'pages.sign-up.content.header.title' ) }}</h1>
                <p v-html="$t( 'pages.sign-up.content.header.subtitle' )"></p>
            </div>
        </header>
        <section class="section--signin-form">
            <form id="form--signin" class="form form--signin mb-12" action="">
                <div class="container--sm">
                    <div class="form__group">
                        <div class="form__row">
                            <div class="input">
                                <input type="email" name="email" :placeholder="$t( 'pages.sign-up.content.form.inputs.email' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input type="password" name="password" :placeholder="$t( 'pages.sign-up.content.form.inputs.password' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input type="text" name="name" :placeholder="$t( 'pages.sign-up.content.form.inputs.name' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                            <div class="input">
                                <input type="text" name="username" :placeholder="$t( 'pages.sign-up.content.form.inputs.username' )" required>
                            </div>
                        </div>
                        <div class="form__row">
                                <div class="input input--checkbox">
                                    <div class="checkbox">
                                        <input type="checkbox" id="terms-of-service" name="terms-of-service" required>
                                        <img src="~/assets/img/ico-checkbox.svg">
                                    </div>
                                    <label for="terms-of-service">{{ $t( 'pages.sign-up.content.form.inputs.terms-of-service' ) }}</label>
                                </div>
                            </div>
                            <div class="form__row form__row--separator"></div>
                            <div class="form__row flex justify-end mt-10">
                                <button type="submit" form="form--signin" class="btn btn--opacity--child" @submit="submit">
                                    <span class="btn--opacity__target">{{ $t( 'pages.sign-up.content.form.inputs.submit' ) }}</span>
                                    <img src="~/assets/img/ico-button-arrow.svg">
                                </button>
                            </div>
                    </div>
                </div>
                <!-- <div class="container--full container--turqy-lighter mt-14">
                    <div class="container--sm py-14">
                        <div class="form__group">
                            <div class="form__row">
                                <div class="input input--pr">
                                    <input type="text" name="affiliation" :placeholder="$t( 'pages.sign-up.content.form.inputs.affiliation' )" required> 
                                    <div class="input__tooltip" :content="$t( 'pages.sign-up.content.form.tooltips.affiliation' )" v-tippy='{ placement : "top-start" }'>?</div>
                                </div>
                            </div>
                            <div class="form__row">
                                <div class="input input--pr">
                                    <textarea name="contact-details" :placeholder="$t( 'pages.sign-up.content.form.inputs.contact-details' )" required></textarea>
                                    <div class="input__tooltip" :content="$t( 'pages.sign-up.content.form.tooltips.contact-details' )" v-tippy='{ placement : "top-start" }'>?</div>
                                </div>
                            </div>
                            <div class="form__row">
                                <div class="input input--checkbox">
                                    <div class="checkbox">
                                        <input type="checkbox" id="terms-of-service" name="terms-of-service" required>
                                        <img src="~/assets/img/ico-checkbox.svg">
                                    </div>
                                    <label for="terms-of-service">{{ $t( 'pages.sign-up.content.form.inputs.terms-of-service' ) }}</label>
                                </div>
                            </div>
                            <div class="form__row form__row--separator"></div>
                            <div class="form__row flex justify-end mt-10">
                                <button type="submit" form="form--signin" class="btn btn--opacity--child" @submit="submit">
                                    <span class="btn--opacity__target">{{ $t( 'pages.sign-up.content.form.inputs.submit' ) }}</span>
                                    <img src="~/assets/img/ico-button-arrow.svg">
                                </button>
                            </div>
                        </div>
                    </div>
                </div> -->
            </form>
        </section>
    </article>
</template>

<script>
export default {
    name: 'create-account',
    methods: {
        submit() {
            event.preventDefault()
            console.log( event )
        }
    }
}
</script>