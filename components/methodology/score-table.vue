<template>
    <div class="rounded-3xl bg-turqy-lighter px-4 py-8">
        <table class="table-score-values overflow-x-scroll block">
            <caption>
                <p>{{ $t('pages.methodologyPage.scoreTable.values') }}</p>
            </caption>
            <tr>
                <th></th>
                <th></th>
                <th>
                    {{ $t('pages.methodologyPage.scoreTable.indicator')
                    }}<br />{{ $t('pages.methodologyPage.scoreTable.value') }}
                </th>
                <th>
                    {{ $t('pages.methodologyPage.scoreTable.attribute')
                    }}<br />{{ $t('pages.methodologyPage.scoreTable.value') }}
                </th>
                <th>
                    {{ $t('pages.methodologyPage.scoreTable.aggregate')
                    }}<br />{{ $t('pages.methodologyPage.scoreTable.value') }}
                </th>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-poor"></span>
                        <p class="text">
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.plan.title',
                                )
                            }}
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description">{{
                            $t(
                                'pages.methodologyPage.scoreTable.plan.description',
                            )
                        }}</span>
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
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.build.title',
                                )
                            }}
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description">
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.build.description',
                                )
                            }}
                        </span>
                        <img src="~/assets/img/arrow-right.svg" alt="" />
                    </div>
                </td>
                <td class="num text-average">0</td>
                <td class="num text-average">3-5</td>
                <td class="num text-average">30-59</td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-good"></span>
                        <p class="text">
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.strengthen.title',
                                )
                            }}
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description">
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.strengthen.description',
                                )
                            }}
                        </span>
                        <img src="~/assets/img/arrow-right.svg" alt="" />
                    </div>
                </td>
                <td class="num text-good">0</td>
                <td class="num text-good">6-8</td>
                <td class="num text-good">60-89</td>
            </tr>
            <tr>
                <td>
                    <div class="item-legend">
                        <span class="w-7 h-7 rounded-full bg-excellent"></span>
                        <p class="text">
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.maintain.title',
                                )
                            }}
                        </p>
                    </div>
                </td>
                <td>
                    <div class="flex justify-center items-center">
                        <span class="description">
                            {{
                                $t(
                                    'pages.methodologyPage.scoreTable.maintain.description',
                                )
                            }}
                        </span>
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
    name: 'score-table',
};
</script>
