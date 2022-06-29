<template>
    <section class="section section--assessment-edit-survey-attributes section--mt-10">
        <div class="container">
            <div class="elinor__survey-attribute-wrapper">
                <header>
                    <h1>{{ $t( 'pages.assessments.edit.tabs.survey.title' ) }}</h1>
                </header>
                <h2 class="">Attributes</h2>
                <ul class="elinor__survey-attribute-gird">
                    <li class="elinor__survey-attribute-item ui-rounded-border">
                        <div class="item-pic">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=='/>
                        </div>
                        <div class="item-content">
                            <span class="title">Resource boundaries</span>
                            <a href="" class="">See Questions</a>
                        </div>
                    </li>
                    <li class="elinor__survey-attribute-item ui-rounded-border">
                        <div class="item-pic">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=='/>
                        </div>
                        <div class="item-content">
                            <span class="title">Resource boundaries</span>
                            <a href="" class="">See Questions</a>
                        </div>
                    </li>
                    <li class="elinor__survey-attribute-item ui-rounded-border">
                        <div class="item-pic">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=='/>
                        </div>
                        <div class="item-content">
                            <span class="title">Resource boundaries</span>
                            <a href="" class="">See Questions</a>
                        </div>
                    </li>
                    <li class="elinor__survey-attribute-item ui-rounded-border">
                        <div class="item-pic">
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDI4QzIyLjYyNzQgMjggMjggMjIuNjI3NCAyOCAxNkMyOCA5LjM3MjU4IDIyLjYyNzQgNCAxNiA0QzkuMzcyNTggNCA0IDkuMzcyNTggNCAxNkM0IDIyLjYyNzQgOS4zNzI1OCAyOCAxNiAyOFoiIHN0cm9rZT0iIzQzQTBCRCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+CjxwYXRoIGQ9Ik0xNiAxMFYxNyIgc3Ryb2tlPSIjNDNBMEJEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTYgMjNDMTYuODI4NCAyMyAxNy41IDIyLjMyODQgMTcuNSAyMS41QzE3LjUgMjAuNjcxNiAxNi44Mjg0IDIwIDE2IDIwQzE1LjE3MTYgMjAgMTQuNSAyMC42NzE2IDE0LjUgMjEuNUMxNC41IDIyLjMyODQgMTUuMTcxNiAyMyAxNiAyM1oiIGZpbGw9IiM0M0EwQkQiLz4KPC9zdmc+Cg=='/>
                        </div>
                        <div class="item-content">
                            <span class="title">Resource boundaries</span>
                            <a href="" class="">See Questions</a>
                        </div>
                    </li>
                </ul>
                <h3>Optional attributes</h3>
                <p>Unselect the attributtes  that do not correspond with your Assessment</p>

                <form class="form">
                    <ul class="elinor__survey-attribute-gird">
                        <li class="elinor__survey-attribute-item ui-rounded-border">
                            <div class="item-pic radio">
                                <input type="radio" name="survey-attribute-optional" id="survey-attribute-optional-1"> 
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQuMTcyMzIgNi44OTk5MUwxMC45NjYxIDBMMTIgMS4wNTAwNEw0LjE3MjMyIDlMMCA0Ljc2MjUxTDEuMDMzODkgMy43MTI0N0w0LjE3MjMyIDYuODk5OTFaIiBmaWxsPSIjMzU5RTk4Ii8+DQo8L3N2Zz4NCg==">
                            </div>
                            <div class="item-content">
                                <label class="title" for="survey-attribute-optional-1">Resource boundaries</label>
                                <a href="" class="">See Questions</a>
                            </div>
                        </li>
                    </ul>
                </form>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'assessment-edit-survey-attributes',
}
</script>
