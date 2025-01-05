<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { Column, Line, Pie, Radar } from '@antv/g2plot'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

let barPlot: any
let linePlot: any
let piePlot: any
let radarPlot: any

onMounted(() => {
  initChart1()
  initChart2()
  initChart3()
  initChart4()
})

onBeforeRouteLeave(() => {
  barPlot.destroy()
  linePlot.destroy()
  piePlot.destroy()
  radarPlot.destroy()
})

function initChart1() {
  const data = [
    { type: '分类一', values: [76, 100] },
    { type: '分类二', values: [56, 108] },
    { type: '分类三', values: [38, 129] },
    { type: '分类四', values: [58, 155] },
    { type: '分类五', values: [45, 120] },
    { type: '分类六', values: [23, 99] },
    { type: '分类七', values: [18, 56] },
    { type: '分类八', values: [18, 34] },
  ]
  barPlot = new Column('chart1', {
    data,
    xField: 'type',
    yField: 'values',
    color: 'l(90) 0:#3e5bdb 1:#b4d9e4',
    isRange: true,
    columnStyle: {
      fillOpacity: 0.8,
    },
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
      },
    },
  })
  barPlot.render()
}
function initChart2() {
  fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
    .then(res => res.json())
    .then((data) => {
      linePlot = new Line('chart2', {
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
          label: {
            formatter: v => `${(Number.parseInt(v) / 10e8).toFixed(1)} B`,
          },
        },
        legend: {
          position: 'top',
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
          appear: {
            animation: 'path-in',
            duration: 5000,
          },
        },
      })
      linePlot.render()
    })
}
function initChart3() {
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ]
  piePlot = new Pie('chart3', {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }],
  })
  piePlot.render()
}
function initChart4() {
  fetch('https://gw.alipayobjects.com/os/bmw-prod/5c41aa9b-9c8a-425f-9f4d-934b889bb75d.json')
    .then(data => data.json())
    .then((data) => {
      radarPlot = new Radar('chart4', {
        data,
        xField: 'item',
        yField: 'score',
        seriesField: 'user',
        xAxis: {
          label: {
            offset: 15,
          },
          grid: {
            line: {
              type: 'line',
            },
          },
        },
        yAxis: {
          grid: {
            line: {
              type: 'circle',
            },
          },
        },
        point: {
          shape: 'circle',
        },
        // 开启面积
        area: {},
        legend: {
          position: 'bottom',
        },
      })
      radarPlot.render()
    })
}
function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="G2plot">
      <template #description>
        <div class="space-y-2">
          <p>由于 G2 的高度可定置化，导致不同开发者开发出来的图表效果有的好看，有的不好看，G2Plot 解决了这一问题，由官方制定了一套标准设计规范，开发者可以专注于数据，而不用关心最终呈现，当然缺点也很明显，就是自定义上不如 G2 ，所以如果你有更复杂的需求，推荐还是使用 G2 去自行实现。</p>
          <p>
            安装命令：
            <Command text="pnpm add @antv/g2plot" />
          </p>
        </div>
      </template>
      <div class="space-x-2">
        <FaButton variant="outline" @click="open('https://github.com/antvis/g2')">
          <FaIcon name="i-ep:link" />
          访问 G2
        </FaButton>
        <FaButton variant="outline" @click="open('https://github.com/antvis/G2Plot')">
          <FaIcon name="i-ep:link" />
          访问 G2plot
        </FaButton>
      </div>
    </FaPageHeader>
    <div class="grid grid-cols-1 mx-4 gap-4 lg-grid-cols-2">
      <FaPageMain title="柱状图" class="m-0!">
        <div id="chart1" class="h-[400px] w-full" />
      </FaPageMain>
      <FaPageMain title="折线图" class="m-0!">
        <div id="chart2" class="h-[400px] w-full" />
      </FaPageMain>
      <FaPageMain title="饼图" class="m-0!">
        <div id="chart3" class="h-[400px] w-full" />
      </FaPageMain>
      <FaPageMain title="雷达图" class="m-0!">
        <div id="chart4" class="h-[400px] w-full" />
      </FaPageMain>
    </div>
  </div>
</template>
