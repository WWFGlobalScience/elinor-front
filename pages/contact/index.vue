<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/contact-section.png" alt="" />
        </section>
        <section class="p-8">
            <div class="container">
                <h1 class="c-title--main">{{ $t( 'pages.contact.header.title' ) }}</h1>
                <div class="g-grid--4-1-lg flex items-center">
                    <div class="g-colspan--3-full-lg">

                        <form class="form">
                            <fieldset class="form__group px-0">
                                <legend class="form__legend mb-10">
                                    <strong>{{ $t( 'pages.contact.form.legend.strong' ) }}</strong><br>
                                    {{ $t( 'pages.contact.form.legend.default' ) }}
                                </legend>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="name" class="label">{{ $t( 'pages.contact.form.name' ) }}</label>
                                        <input type="text" id="name" class="" placeholder="Name">
                                    </div>
                                </div>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="subject" class="label">{{ $t( 'pages.contact.form.subject' ) }}</label>
                                        <input type="text" id="subject" class="" placeholder="Subject">
                                    </div>
                                </div>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="mail" class="label">{{ $t( 'pages.contact.form.mail' ) }}</label>
                                        <input type="mail" id="mail" class="" placeholder="Mail">
                                    </div>
                                </div>

                                <div class="form__row">
                                    <div class="input">
                                        <label for="message" class="label">{{ $t( 'pages.contact.form.message' ) }}</label>
                                        <textarea type="text" id="message" class="" placeholder="Message" rows="4"></textarea>
                                    </div>
                                </div>

                                <div class="row-btn justify-end">
                                    <button type="submit" class="btn btn--opacity--child">
                                        <span class="btn--opacity__target">{{ $t( 'pages.contact.form.submit' ) }}</span>
                                        <img src="~/assets/img/ico-button-arrow.svg" alt="" />
                                    </button>
                                </div>
                                
                            </fieldset>
                        </form>

                        <div class="form__legend mt-32">
                            <p><strong>{{ $t( 'pages.contact.form.contact.strong' ) }}: </strong><a href="">mail@mail.com</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </article>
</template>
<script>
    export default {
      name: "contact",
      auth: false
    };
</script>