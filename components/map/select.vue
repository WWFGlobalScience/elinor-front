<template>
    <div class="input input--multiselect">
        <div class="multiselect__wrap multiselect__wrap--map">
            <multiselect
                :value="'Value'"
                :placeholder="'Value'"
                track-by="id"
                :options="['Value1', 'Value2', 'Value3', 'Value4']"
                :multiple="false"
                :showLabels="false"
                :allow-empty="true"
                open-direction="bottom"
                class="pt-0 pb-0"
            >
            </multiselect>
            <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-select"
};
</script>
