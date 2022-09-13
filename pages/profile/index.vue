<template>
    <section class="page">
        <div class="container--md">
            <div class="grid-profile">
                <div class="avatar">
                    <div class="elinor__avatar elinor__avatar--xl bg-turqy"><span>X</span></div>
                </div>
                <div class="name">
                    <h1 class="c-title--lg uppercase mb-2"><strong>{{ $t('pages.profile.header.title') }}</strong></h1>
                    <p>{{ $t('pages.profile.header.subtitle') }}</p>
                </div>
                <div class="content">
                    <form class="form">
                        <fieldset class="form__group px-0">
                            <legend class="form__legend w-full mb-4">
                                <div class="title-border">
                                    <h3 class="title">{{ $t('pages.profile.form.legend') }}</h3> 
                                </div>
                            </legend>

                            <div class="form__row">
                                <div class="input">
                                    <label for="mail" class="label">{{ $t('pages.profile.form.email') }}</label>
                                    <input type="text" id="mail" :placeholder="$t('pages.profile.form.email')" v-model="name" required>
                                </div>
                            </div>

                            <div class="form__row">
                                <div class="input">
                                    <label for="pass" class="label">{{ $t('pages.profile.form.password') }}</label>
                                    <input type="password" id="pass" name="password" minlength="8" required>
                                </div>
                            </div>

                            <div class="form__row">
                                <div class="input">
                                    <label for="username" class="label">{{ $t('pages.profile.form.username') }}*</label>
                                    <input type="text" id="username" :placeholder="$t('pages.profile.form.username')" v-model="username" required>
                                </div>
                            </div>

                            <div class="row-btn justify-end">
                                <button type="submit" class="btn btn--opacity--child" @click="onSubmit"  >
                                    <span class="btn--opacity__target">{{ $t('pages.profile.form.submit') }}</span>
                                    <img src="~/assets/img/ico-button-arrow.svg" alt=""/>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div class="content mt-20">
                    <div class="title-border">
                        <h3 class="title">{{ $t('pages.profile.delete.title') }}</h3> 
                    </div>
                    <h4 class="c-title--base font-semibold mb-4">{{ $t('pages.profile.delete.subtitle') }}</h4>
                    <ul class="list-inside list-disc list-delete">
                        <li class="list-item">{{ $t('pages.profile.delete.list.1') }}</li>
                        <li class="list-item">{{ $t('pages.profile.delete.list.2') }}</li>
                        <li class="list-item">{{ $t('pages.profile.delete.list.3') }}</li>
                        <li class="list-item">{{ $t('pages.profile.delete.list.4') }}</li>
                    </ul>

                    <div class="row-btn">
                        <button
                            type="button"
                            class="btn btn--opacity--child"
                            @click="
                                popupState(
                                    {
                                        active: true,
                                        type:'xs',
                                        component: 'popup-delete-account',
                                        title: 'pages.profile.popup.title'
                                    }
                                )
                            ">
                            <span class="btn--opacity__target">{{ $t('pages.profile.delete.confirm.title') }}</span>
                            <img src="~/assets/img/ico-button-arrow.svg" alt=""/>
                        </button>
                        <p>
                            <strong class="c-text--warning c-text--base">{{ $t('pages.profile.delete.confirm.message.strong') }}</strong>
                            {{ $t('pages.profile.delete.confirm.message.text') }}
                        </p>
                    </div>
            
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        methods: {
            ...mapActions(
                {
                    popupState: 'popup/popupState'
                }
            )
        }
    };
</script>


