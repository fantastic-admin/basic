<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import VChart from '@visactor/vchart'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

const chart1Ref = useTemplateRef('chart1Ref')
const chart2Ref = useTemplateRef('chart2Ref')
const chart3Ref = useTemplateRef('chart3Ref')
const chart4Ref = useTemplateRef('chart4Ref')
let chart1: any
let chart2: any
let chart3: any
let chart4: any

onMounted(() => {
  initChart1()
  initChart2()
  initChart3()
  initChart4()
})

function initChart1() {
  if (!chart1Ref.value) {
    return
  }
  const spec: any = {
    type: 'bar',
    data: {
      values: [
        { type: 'Nail polish', country: 'Africa', value: 4229 },
        { type: 'Nail polish', country: 'EU', value: 4376 },
        { type: 'Nail polish', country: 'China', value: 3054 },
        { type: 'Nail polish', country: 'USA', value: 12814 },
        { type: 'Eyebrow pencil', country: 'Africa', value: 3932 },
        { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
        { type: 'Eyebrow pencil', country: 'China', value: 5067 },
        { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
        { type: 'Rouge', country: 'Africa', value: 5221 },
        { type: 'Rouge', country: 'EU', value: 3574 },
        { type: 'Rouge', country: 'China', value: 7004 },
        { type: 'Rouge', country: 'USA', value: 11624 },
        { type: 'Lipstick', country: 'Africa', value: 9256 },
        { type: 'Lipstick', country: 'EU', value: 4376 },
        { type: 'Lipstick', country: 'China', value: 9054 },
        { type: 'Lipstick', country: 'USA', value: 8814 },
        { type: 'Eyeshadows', country: 'Africa', value: 3308 },
        { type: 'Eyeshadows', country: 'EU', value: 4572 },
        { type: 'Eyeshadows', country: 'China', value: 12043 },
        { type: 'Eyeshadows', country: 'USA', value: 12998 },
      ],
    },
    xField: ['type', 'country'],
    yField: 'value',
    seriesField: 'country',
    legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
    animationAppear: {
      duration: 500,
      oneByOne: true,
    },
    axes: [
      {
        orient: 'left',
        label: {
          formatMethod(val: any) {
            return `${(val * 100).toFixed(2)}%`
          },
        },
      },
    ],
  }
  chart1 = new VChart(spec, { dom: chart1Ref.value })
  chart1.renderSync()
}
function initChart2() {
  if (!chart2Ref.value) {
    return
  }
  const spec: any = {
    type: 'line',
    data: {
      values: [
        { type: 'Nail polish', country: 'Africa', value: 4229 },
        { type: 'Nail polish', country: 'EU', value: 4376 },
        { type: 'Nail polish', country: 'China', value: 3054 },
        { type: 'Nail polish', country: 'USA', value: 12814 },
        { type: 'Eyebrow pencil', country: 'Africa', value: 3932 },
        { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
        { type: 'Eyebrow pencil', country: 'China', value: 5067 },
        { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
        { type: 'Rouge', country: 'Africa', value: 5221 },
        { type: 'Rouge', country: 'EU', value: 3574 },
        { type: 'Rouge', country: 'China', value: 7004 },
        { type: 'Rouge', country: 'USA', value: 11624 },
        { type: 'Lipstick', country: 'Africa', value: 9256 },
        { type: 'Lipstick', country: 'EU', value: 4376 },
        { type: 'Lipstick', country: 'China', value: 9054 },
        { type: 'Lipstick', country: 'USA', value: 8814 },
        { type: 'Eyeshadows', country: 'Africa', value: 3308 },
        { type: 'Eyeshadows', country: 'EU', value: 4572 },
        { type: 'Eyeshadows', country: 'China', value: 12043 },
        { type: 'Eyeshadows', country: 'USA', value: 12998 },
        { type: 'Eyeliner', country: 'Africa', value: 5432 },
        { type: 'Eyeliner', country: 'EU', value: 3417 },
        { type: 'Eyeliner', country: 'China', value: 15067 },
        { type: 'Eyeliner', country: 'USA', value: 12321 },
        { type: 'Foundation', country: 'Africa', value: 13701 },
        { type: 'Foundation', country: 'EU', value: 5231 },
        { type: 'Foundation', country: 'China', value: 10119 },
        { type: 'Foundation', country: 'USA', value: 10342 },
        { type: 'Lip gloss', country: 'Africa', value: 4008 },
        { type: 'Lip gloss', country: 'EU', value: 4572 },
        { type: 'Lip gloss', country: 'China', value: 12043 },
        { type: 'Lip gloss', country: 'USA', value: 22998 },
        { type: 'Mascara', country: 'Africa', value: 18712 },
        { type: 'Mascara', country: 'EU', value: 6134 },
        { type: 'Mascara', country: 'China', value: 10419 },
        { type: 'Mascara', country: 'USA', value: 11261 },
      ],
    },
    percent: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'country',
    animationAppear: {
      duration: 1500,
      easing: 'linear',
    },
    legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
    axes: [
      {
        orient: 'left',
        label: {
          formatMethod(val: any) {
            return `${(val * 100).toFixed(2)}%`
          },
        },
      },
    ],
  }
  chart2 = new VChart(spec, { dom: chart2Ref.value })
  chart2.renderSync()
}
function initChart3() {
  if (!chart3Ref.value) {
    return
  }
  const spec: any = {
    type: 'common',
    padding: {
      top: 10,
    },
    layout: {
      type: 'grid',
      col: 3,
      row: 2,
      elements: [
        {
          modelId: 'legend',
          col: 0,
          row: 1,
          colSpan: 3,
        },
        {
          modelId: 'DAU',
          col: 0,
          row: 0,
        },
        {
          modelId: '新增',
          col: 1,
          row: 0,
        },
        {
          modelId: 'MAU',
          col: 2,
          row: 0,
        },
      ],
    },
    region: [
      {
        id: 'DAU',
      },
      {
        id: '新增',
      },
      {
        id: 'MAU',
      },
    ],
    legends: {
      visible: true,
      orient: 'bottom',
      id: 'legend',
      regionId: ['DAU', '新增', 'MAU', 'DAU/MAU'],
      item: {
        visible: true,
        background: {
          style: {
            fill: 'transparent',
          },
        },
      },
    },
    series: [
      {
        id: 'DAUseries0',
        regionId: 'DAU',
        type: 'pie',
        valueField: 'value',
        categoryField: 'type',
        data: {
          id: 'DAU',
          values: [
            {
              type: '首页',
              value: 120,
            },
            {
              type: '大屏',
              value: 100,
            },
            {
              type: '看板',
              value: 200,
            },
          ],
        },
        seriesField: 'type',
        label: {
          style: {
            visible: false,
          },
        },
      },
      {
        id: '新增series0',
        regionId: '新增',
        type: 'pie',
        animationAppear: {
          preset: 'fadeIn',
        },
        valueField: 'value',
        categoryField: 'type',
        data: {
          id: '新增',
          values: [
            {
              type: '首页',
              value: 80,
            },
            {
              type: '大屏',
              value: 200,
            },
            {
              type: '看板',
              value: 400,
            },
          ],
        },
        seriesField: 'type',
        label: {
          style: {
            visible: false,
          },
        },
      },
      {
        id: 'MAUseries0',
        regionId: 'MAU',
        type: 'pie',
        valueField: 'value',
        categoryField: 'type',
        animationAppear: {
          preset: 'growRadius',
        },
        data: {
          id: 'MAU',
          values: [
            {
              type: '首页',
              value: 123,
            },
            {
              type: '大屏',
              value: 245,
            },
            {
              type: '看板',
              value: 367,
            },
          ],
        },
        seriesField: 'type',
        label: {
          style: {
            visible: false,
          },
        },
      },
    ],
  }
  chart3 = new VChart(spec, { dom: chart3Ref.value })
  chart3.renderSync()
}
function initChart4() {
  if (!chart4Ref.value) {
    return
  }
  const spec: any = {
    type: 'radar',
    data: [
      {
        id: 'radarData',
        values: [
          {
            key: 'Strength',
            value: 5,
          },
          {
            key: 'Speed',
            value: 5,
          },
          {
            key: 'Shooting',
            value: 3,
          },
          {
            key: 'Endurance',
            value: 5,
          },
          {
            key: 'Precision',
            value: 5,
          },
          {
            key: 'Growth',
            value: 5,
          },
        ],
      },
    ],
    categoryField: 'key',
    valueField: 'value',
    point: {
      visible: false, // disable point
    },
    area: {
      visible: true, // display area
      state: {
      // The style in the hover state of the area
        hover: {
          fillOpacity: 0.5,
        },
      },
    },
    line: {
      style: {
        lineWidth: 4,
      },
    },
    axes: [
      {
        orient: 'radius', // radius axis
        zIndex: 100,
        min: 0,
        max: 8,
        domainLine: {
          visible: false,
        },
        label: {
          visible: true,
          space: 0,
          style: {
            textAlign: 'center',
            stroke: '#fff',
            lineWidth: 4,
          },
        },
        grid: {
          smooth: false,
          style: {
            lineDash: [0],
          },
        },
      },
      {
        orient: 'angle', // angle axis
        zIndex: 50,
        tick: {
          visible: false,
        },
        domainLine: {
          visible: false,
        },
        label: {
          space: 20,
        },
        grid: {
          style: {
            lineDash: [0],
          },
        },
      },
    ],
  }
  chart4 = new VChart(spec, { dom: chart4Ref.value })
  chart4.renderSync()
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="VChart">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add @visactor/vchart" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/VisActor/VChart')">
        <FaIcon name="i-ep:link" />
        访问 VChart
      </FaButton>
    </FaPageHeader>
    <div class="grid grid-cols-1 mx-4 gap-4 lg-grid-cols-2">
      <FaPageMain title="柱状图" class="m-0!">
        <div ref="chart1Ref" class="h-[400px] w-full" />
      </FaPageMain>
      <FaPageMain title="折线图" class="m-0!">
        <div ref="chart2Ref" class="h-[400px] w-full" />
      </FaPageMain>
      <FaPageMain title="饼图" class="m-0!">
        <div ref="chart3Ref" class="h-[400px] w-full" />
      </FaPageMain>
      <FaPageMain title="雷达图" class="m-0!">
        <div ref="chart4Ref" class="h-[400px] w-full" />
      </FaPageMain>
    </div>
  </div>
</template>
