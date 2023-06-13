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
            >
            </multiselect>
            <div class="multiselect__caret">
                <img src="~/assets/img/ico-select-turqy.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "map-select"
};
</script>
