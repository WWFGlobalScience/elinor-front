<template>
    <article class="page page--flushed">
        <section class="section section--main">
            <img src="~/assets/img/collaboration-section.jpg" alt="" />
        </section>
        <section class="section section--collaboration">
            <div class="container">
                <h1 class="c-title--main">{{ $t( 'pages.collaboration.title' ) }}</h1>
                <div class="g-grid--3-1-lg mt-16">
                    <div class="g-colspan--2-full-lg">
                        <div class="text-group">
                            <p>{{ $t( 'pages.collaboration.intro.paragraph1' ) }}</p> 
                            <p>{{ $t( 'pages.collaboration.intro.paragraph2' ) }}</p>
                            <h2 class="c-title--md my-8">{{ $t( 'pages.collaboration.intro.title' ) }}</h2>
                            <p>{{ $t( 'pages.collaboration.intro.paragraph3' ) }}</p> 
                            <p>{{ $t( 'pages.collaboration.intro.paragraph4' ) }}</p>
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
                <h2 class="c-title--md mb-12 text-turqy ">{{ $t( 'pages.collaboration.guidelines1.title' ) }}</h2>
                <h2 class="c-title--md mb-12">{{ $t( 'pages.collaboration.guidelines1.subtitle' ) }}</h2>
                <div class="g-grid--4-1-lg mt-16">
                    <div class="g-colspan--3-full-lg lg:mt-4">
                        <ul class="number-list">
                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines1.question1' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines1.answer1' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines1.question2' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines1.answer2-1' ) }}</h5>
                                </div>
                                <div class="number-list__answer">
                                    <h5 class="mb-4">{{ $t( 'pages.collaboration.guidelines1.answer2-2.paragraph1' ) }}</h5>
                                    <h5>{{ $t( 'pages.collaboration.guidelines1.answer2-2.paragraph2' ) }}</h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


                <div class="g-grid--4-1-lg mt-20">
                    <div class="g-colspan--3-full-lg lg:mt-4">
                        <h2 class="c-title--md mb-10">{{ $t( 'pages.collaboration.guidelines2.subtitle' ) }}</h2>
                        <p class="mb-16">{{ $t( 'pages.collaboration.guidelines2.text' ) }}</p>
                        <ul class="number-list">
                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines2.question1' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines2.answer1' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines2.question2' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5>{{ $t( 'pages.collaboration.guidelines2.answer2' ) }}</h5>
                                </div>
                            </li>

                            <li class="number-list__item">
                                <div class="number-list__question">
                                    <h4 class="">{{ $t( 'pages.collaboration.guidelines2.question3' ) }}</h4>
                                </div>
                                <div class="number-list__answer">
                                    <h5 class="mb-4">{{ $t( 'pages.collaboration.guidelines2.answer3.paragraph1' ) }}</h5>
                                    <h5>{{ $t( 'pages.collaboration.guidelines2.answer3.paragraph2' ) }}</h5>
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