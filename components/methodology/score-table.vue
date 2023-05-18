<template>
    <div class="rounded-3xl bg-turqy-lighter px-4 py-8">
        <table class="score-values-table overflow-x-scroll block">
            <caption>
                <p>Values</p>
            </caption>
            <tr>
                <th></th>
                <th></th>
                <th>Indicator<br />value</th>
                <th>Attribute<br />value</th>
                <th>Aggregate<br />value</th>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-poor"></span>
                        <p class="text">
                            Plan
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                        <img src="~/assets/img/arrow-right.svg" alt="" />
                    </div>
                </td>
                <td class="num text-poor">0</td>
                <td class="num text-poor">0-2</td>
                <td class="num text-poor">0-29</td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-average"></span>
                        <p class="text">
                            Build
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps
                        </span>
                        <img src="~/assets/img/arrow-right.svg" alt="" />
                    </div>
                </td>
                <td class="num text-average">0</td>
                <td class="num text-average">3-4</td>
                <td class="num text-average">30-59</td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-good"></span>
                        <p class="text">
                            Strengthen
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                        <img src="~/assets/img/arrow-right.svg" alt="" />
                    </div>
                </td>
                <td class="num text-good">0</td>
                <td class="num text-good">5-7</td>
                <td class="num text-good">60-89</td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-excellent"></span>
                        <p class="text">
                            Maintain
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                        <img src="~/assets/img/arrow-right.svg" alt="" />
                    </div>
                </td>
                <td class="num text-excellent">0</td>
                <td class="num text-excellent">8-10</td>
                <td class="num text-excellent">90-100</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "score-table"
};
</script>
