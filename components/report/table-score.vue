<template>
    <div class="rounded-3xl bg-turqy-lighter p-3">
        <table
            class="table-score-values table-score-values--report overflow-x-scroll block"
        >
            <tr>
                <th></th>
                <th>{{ $t('pages.report.scoreTable.indicator') }}<br />{{ $t('pages.report.scoreTable.value') }}</th>
                <th>{{ $t('pages.report.scoreTable.attribute') }}<br />{{ $t('pages.report.scoreTable.value') }}</th>
                <th>{{ $t('pages.report.scoreTable.aggregate') }}<br />{{ $t('pages.report.scoreTable.value') }}</th>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-poor"></span>
                        <p class="text">
                            {{ $t('pages.report.scoreTable.plan.title') }}
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
                        <span class="description">{{ $t('pages.report.scoreTable.plan.description') }}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-average"></span>
                        <p class="text">
                            {{ $t('pages.report.scoreTable.build.title') }}
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
                        <span class="description">{{ $t('pages.report.scoreTable.build.description') }}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-good"></span>
                        <p class="text">
                            {{ $t('pages.report.scoreTable.strengthen.title') }}
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
                        <span class="description">{{ $t('pages.report.scoreTable.strengthen.description') }}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-5 h-5 rounded-full bg-excellent"></span>
                        <p class="text">
                            {{ $t('pages.report.scoreTable.maintain.title') }}
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
                        <span class="description border-transparent">{{ $t('pages.report.scoreTable.maintain.description') }}</span>
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
