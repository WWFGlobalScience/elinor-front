<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/collaboration-section.png" alt="" />
        </section>
        <section class="section section--collaboration">
            <div class="container">
                <h1 class="c-title--main">{{ $t( 'pages.collaboration.title' ) }}</h1>
                <div class="g-grid--3-1-lg mt-16">
                    <div class="g-colspan--2-full-lg">
                        <div class="text-group">
                            <h2 class="c-title--md mb-12">{{ $t( 'pages.collaboration.intro.title' ) }}</h2>
                            <p>{{ $t( 'pages.collaboration.intro.paragraph1' ) }}</p> 
                            <p>{{ $t( 'pages.collaboration.intro.paragraph2' ) }}</p>
                        </div>
                    </div>
                    <div class="g-colspan--1-full-lg lg:mt-4">
                        <blockquote class="elinor__blockquote">
                            <p>{{ $t( 'pages.collaboration.intro.blockquote' ) }}</p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section--guidelines">
            <div class="container">
                <h2 class="c-title--md mb-12">{{ $t( 'pages.collaboration.guidelines.title' ) }}</h2>

                <div class="g-grid--4-1-lg mt-16">
                    <div class="g-colspan--3-full-lg lg:mt-4">
                        <ul class="number-list">
                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question1' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines.answer1' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question2' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines.answer2' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question3' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines.answer3' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question4' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines.answer4' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question5' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines.answer5' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question6' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                   <h5>
                                        <strong class="register">©</strong>    
                                    </h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines.question7' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines.answer7' ) }}</h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    </article>
</template>
<script>
    export default {
      name: "collaboration",
      auth: false
    };
</script>