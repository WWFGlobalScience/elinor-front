<template>
    <div class="rounded-3xl bg-turqy-lighter p-3">
        <table
            class="table-score-values table-score-values--report overflow-x-scroll block"
        >
            <tr>
                <th></th>
                <th>Indicator<br />value</th>
                <th>Attribute<br />value</th>
                <th>Aggregate<br />value</th>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-poor"></span>
                        <p class="text">
                            Plan
                        </p>
                    </div>
                </td>
                <td class="num">0</td>
                <td class="num">0-2</td>
                <td class="num">0-29</td>
            </tr>
            <tr>
                <td colspan="4" class="hr">
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-average"></span>
                        <p class="text">
                            Build
                        </p>
                    </div>
                </td>
                <td class="num">1</td>
                <td class="num">3-5</td>
                <td class="num">0-29</td>
            </tr>
            <tr>
                <td colspan="4" class="hr">
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-good"></span>
                        <p class="text">
                            Strengthen
                        </p>
                    </div>
                </td>
                <td class="num">2</td>
                <td class="num">6-8</td>
                <td class="num">0-29</td>
            </tr>
            <tr>
                <td colspan="4" class="hr">
                    <div class="flex justify-center items-center">
                        <span class="description"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-excellent"></span>
                        <p class="text">
                            Maintain
                        </p>
                    </div>
                </td>
                <td class="num">3</td>
                <td class="num">9-10</td>
                <td class="num">0-29</td>
            </tr>
            <tr>
                <td colspan="4" class="hr">
                    <div class="flex justify-center items-center">
                        <span class="description border-transparent"
                            >Collaborate with stakeholders to develop plans for
                            addressing major governance gaps</span
                        >
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: "report-table-score"
};
</script>
