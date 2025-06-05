<script setup lang="ts">
import type { VueUiDonutConfig, VueUiDonutDatasetItem, VueUiOnionConfig, VueUiOnionDatasetItem, VueUiWorldConfig, VueUiWorldDataset, VueUiXyConfig, VueUiXyDatasetItem } from 'vue-data-ui'
import { VueDataUi } from 'vue-data-ui'
import Alert from './components/alert.vue'
import 'vue-data-ui/style.css'

const dataset1 = ref<VueUiXyDatasetItem[]>([
  {
    name: 'Serie 1',
    type: 'line',
    dataLabels: false,
    series: [-89, -55, -34, -21, -13, -8, -5, -3, -2, -1, 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
    scaleSteps: 5,
  },
  {
    name: 'Serie 2',
    type: 'bar',
    dataLabels: false,
    series: [21, 13, 29, 51, 12, 19, 16, 32, 64, 16, 21, 19, 45, 32, 12, -17, 34, 12, 2, 19, 40],
    scaleSteps: 4,
  },
  {
    name: 'Serie 3',
    type: 'line',
    dataLabels: false,
    series: [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
    stackRatio: 0.1,
    scaleSteps: 2,
  },
  {
    name: 'Serie 2',
    type: 'line',
    dataLabels: false,
    series: [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    stackRatio: 0.1,
    scaleSteps: 2,
  },
])
const config1 = ref<VueUiXyConfig>({
  table: {
    th: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
    td: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
  },
  chart: {
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    title: {
      text: 'Title',
      color: '#1A1A1A',
      textAlign: 'left',
      paddingLeft: 24,
      subtitle: {
        text: 'Subtitle',
      },
    },
    padding: {
      left: 82,
      bottom: 90,
      right: 70,
    },
    legend: {
      color: '#1A1A1A',
    },
    tooltip: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      showPercentage: false,
      borderColor: '#CCCCCC',
      backgroundOpacity: 30,
    },
    highlighter: {
      color: '#1A1A1A',
      opacity: 5,
    },
    highlightArea: {
      show: true,
      from: 0,
      to: 20,
      color: '#1A1A1A',
      opacity: 3,
      caption: {
        text: '',
      },
    },
    grid: {
      stroke: '#CCCCCC',
      frame: {
        show: true,
        stroke: '#CCCCCC',
      },
      labels: {
        fontSize: 16,
        color: '#1A1A1A',
        axis: {
          yLabel: 'yAxis',
          fontSize: 20,
          xLabel: 'xAxis',
          xLabelOffsetY: 48,
        },
        xAxis: {
          showBaseline: true,
        },
        xAxisLabels: {
          color: '#1A1A1A',
          values: ['01-25', '02-25', '03-25', '04-25', '05-25', '06-25', '07-25', '08-25', '09-25', '10-25', '11-25', '12-25', '01-26', '02-26', '03-26', '04-26', '05-26', '06-26', '07-26', '08-26', '09-26'],
          rotation: -45,
        },
        yAxis: {
          useIndividualScale: true,
          stacked: true,
          gap: 24,
        },
      },
      showHorizontalLines: true,
    },
    labels: {
      fontSize: 20,
    },
    zoom: {
      minimap: {
        show: true,
        lineColor: '#1F77B4',
        indicatorColor: '#1A1A1A',
      },
    },
  },
  line: {
    radius: 2,
    useGradient: false,
    labels: {
      show: true,
      color: '#1A1A1A',
      offsetY: -12,
    },
  },
  bar: {
    labels: {
      show: true,
      color: '#1A1A1A',
      offsetY: -6,
    },
  },
})

const dataset2 = ref<VueUiDonutDatasetItem[]>([
  {
    name: 'Series 1',
    values: [100],
  },
  {
    name: 'Series 2',
    values: [50],
  },
  {
    name: 'Series 3',
    values: [25],
  },
  {
    name: 'Series 4',
    values: [12.5],
  },
])
const config2 = ref<VueUiDonutConfig>({
  table: {
    th: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
    td: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
  },
  style: {
    chart: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      legend: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
        showPercentage: true,
        borderColor: '#CCCCCC',
        backgroundOpacity: 30,
      },
      title: {
        text: 'Title',
        color: '#1A1A1A',
        textAlign: 'left',
        paddingLeft: 24,
        subtitle: {
          text: 'Subtitle',
        },
      },
      layout: {
        curvedMarkers: true,
        donut: {
          strokeWidth: 64,
          useShadow: true,
        },
        labels: {
          percentage: {
            color: '#1A1A1A',
          },
          name: {
            color: '#6A6A6A',
          },
          hollow: {
            average: {
              color: '#6A6A6A',
              value: {
                color: '#1A1A1A',
              },
            },
            total: {
              color: '#6A6A6A',
              offsetY: -6,
              value: {
                color: '#1A1A1A',
                offsetY: -6,
              },
            },
          },
        },
      },
    },
  },
})

const dataset3 = ref<VueUiOnionDatasetItem[]>([
  {
    name: 'Serie 1',
    percentage: 21,
    value: 1200,
  },
  {
    name: 'Serie 2',
    percentage: 34,
    value: 1000,
  },
  {
    name: 'Serie 3',
    percentage: 55,
    value: 500,
  },
  {
    name: 'Serie 4',
    percentage: 79,
    value: 1280,
  },
])
const config3 = ref<VueUiOnionConfig>({
  table: {
    th: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
    td: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
    },
  },
  style: {
    chart: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      legend: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
      },
      layout: {
        gutter: {
          color: '#E1E5E8',
        },
        labels: {
          color: '#1A1A1A',
        },
      },
      title: {
        text: 'Title',
        color: '#1A1A1A',
        textAlign: 'left',
        paddingLeft: 24,
        subtitle: {
          text: 'Subtitle',
        },
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
        borderColor: '#CCCCCC',
        backgroundOpacity: 30,
      },
    },
  },
})

const dataset4 = ref<VueUiWorldDataset>({
  AFG: {
    value: 12.8,
  },
  ALB: {
    value: 13.5,
  },
  DZA: {
    value: 22.2,
  },
  AGO: {
    value: 22.4,
  },
  ARG: {
    value: 14.8,
  },
  ARM: {
    value: 7.2,
  },
  AUS: {
    value: 21.8,
  },
  AUT: {
    value: 8.5,
  },
  AZE: {
    value: 12.4,
  },
  BHS: {
    value: 24.9,
  },
  BHR: {
    value: 27.5,
  },
  BGD: {
    value: 25.9,
  },
  BRB: {
    value: 26.5,
  },
  BLR: {
    value: 7,
  },
  BEL: {
    value: 10.5,
  },
  BLZ: {
    value: 25.9,
  },
  BEN: {
    value: 27.8,
  },
  BTN: {
    value: 12,
  },
  BOL: {
    value: 20.1,
  },
  BIH: {
    value: 10.9,
  },
  BWA: {
    value: 21.5,
  },
  BRA: {
    value: 24.9,
  },
  BRN: {
    value: 26.8,
  },
  BGR: {
    value: 10.8,
  },
  BFA: {
    value: 28.3,
  },
  BDI: {
    value: 19.9,
  },
  KHM: {
    value: 27.5,
  },
  CMR: {
    value: 24.6,
  },
  CAN: {
    value: -5.35,
  },
  CPV: {
    value: 24,
  },
  CAF: {
    value: 25.6,
  },
  TCD: {
    value: 26.9,
  },
  CHL: {
    value: 8.5,
  },
  CHN: {
    value: 6.9,
  },
  COL: {
    value: 24.2,
  },
  COM: {
    value: 25.4,
  },
  COG: {
    value: 24.5,
  },
  COD: {
    value: 24.8,
  },
  CRI: {
    value: 24.8,
  },
  HRV: {
    value: 11.6,
  },
  CUB: {
    value: 25.2,
  },
  CYP: {
    value: 19.6,
  },
  CZE: {
    value: 8,
  },
  DNK: {
    value: 7.7,
  },
  DJI: {
    value: 29.8,
  },
  DMA: {
    value: 26,
  },
  DOM: {
    value: 25.5,
  },
  TLS: {
    value: 26.9,
  },
  ECU: {
    value: 21.8,
  },
  EGY: {
    value: 22,
  },
  SLV: {
    value: 24.8,
  },
  GNQ: {
    value: 25,
  },
  ERI: {
    value: 26,
  },
  EST: {
    value: 5.2,
  },
  SWZ: {
    value: 20,
  },
  ETH: {
    value: 22,
  },
  FJI: {
    value: 26,
  },
  FIN: {
    value: 2,
  },
  FRA: {
    value: 11.5,
  },
  GAB: {
    value: 25,
  },
  GMB: {
    value: 27.5,
  },
  GEO: {
    value: 7.5,
  },
  DEU: {
    value: 8.5,
  },
  GHA: {
    value: 26.8,
  },
  GRC: {
    value: 16.5,
  },
  GRD: {
    value: 26.5,
  },
  GTM: {
    value: 22,
  },
  GIN: {
    value: 26,
  },
  GNB: {
    value: 26.5,
  },
  GUY: {
    value: 26.8,
  },
  HTI: {
    value: 25.5,
  },
  HND: {
    value: 23.5,
  },
  HUN: {
    value: 10.5,
  },
  ISL: {
    value: 1.75,
  },
  IND: {
    value: 24,
  },
  IDN: {
    value: 25.5,
  },
  IRN: {
    value: 17,
  },
  IRQ: {
    value: 22,
  },
  IRL: {
    value: 9.5,
  },
  ISR: {
    value: 20,
  },
  ITA: {
    value: 13.5,
  },
  JAM: {
    value: 25.5,
  },
  JPN: {
    value: 11.5,
  },
  JOR: {
    value: 18,
  },
  KAZ: {
    value: 5,
  },
  KEN: {
    value: 24,
  },
  KIR: {
    value: 28,
  },
  PRK: {
    value: 8,
  },
  KOR: {
    value: 12.5,
  },
  KWT: {
    value: 27.5,
  },
  KGZ: {
    value: 5,
  },
  LAO: {
    value: 25,
  },
  LVA: {
    value: 6,
  },
  LBN: {
    value: 15,
  },
  LSO: {
    value: 12,
  },
  LBR: {
    value: 26.5,
  },
  LBY: {
    value: 22,
  },
  LIE: {
    value: 8,
  },
  LTU: {
    value: 6.5,
  },
  LUX: {
    value: 9,
  },
  MDG: {
    value: 22,
  },
  MWI: {
    value: 22.5,
  },
  MYS: {
    value: 26.5,
  },
  MDV: {
    value: 28,
  },
  MLI: {
    value: 28.3,
  },
  MLT: {
    value: 18.8,
  },
  MHL: {
    value: 27.5,
  },
  MRT: {
    value: 26,
  },
  MUS: {
    value: 23,
  },
  MEX: {
    value: 21,
  },
  FSM: {
    value: 27,
  },
  MDA: {
    value: 9,
  },
  MCO: {
    value: 16,
  },
  MNG: {
    value: -0.5,
  },
  MNE: {
    value: 11.5,
  },
  MAR: {
    value: 17.5,
  },
  MOZ: {
    value: 23.5,
  },
  MMR: {
    value: 25.5,
  },
  NAM: {
    value: 20,
  },
  NRU: {
    value: 28,
  },
  NPL: {
    value: 12,
  },
  NLD: {
    value: 9.5,
  },
  NZL: {
    value: 10.5,
  },
  NIC: {
    value: 25.5,
  },
  NER: {
    value: 28.3,
  },
  NGA: {
    value: 26,
  },
  MKD: {
    value: 11,
  },
  NOR: {
    value: 1.5,
  },
  OMN: {
    value: 27,
  },
  PAK: {
    value: 20,
  },
  PLW: {
    value: 27.5,
  },
  PAN: {
    value: 25.5,
  },
  PNG: {
    value: 25.5,
  },
  PRY: {
    value: 23.5,
  },
  PER: {
    value: 19.5,
  },
  PHL: {
    value: 26.5,
  },
  POL: {
    value: 7.5,
  },
  PRT: {
    value: 15.5,
  },
  QAT: {
    value: 28,
  },
  ROU: {
    value: 9.5,
  },
  RUS: {
    value: -5.1,
  },
  RWA: {
    value: 19,
  },
  KNA: {
    value: 26.5,
  },
  LCA: {
    value: 26.5,
  },
  VCT: {
    value: 26.5,
  },
  WSM: {
    value: 26.5,
  },
  SMR: {
    value: 13.5,
  },
  STP: {
    value: 26.5,
  },
  SAU: {
    value: 24.5,
  },
  SEN: {
    value: 27.5,
  },
  SRB: {
    value: 11,
  },
  SYC: {
    value: 27,
  },
  SLE: {
    value: 26.5,
  },
  SGP: {
    value: 27,
  },
  SVK: {
    value: 8.5,
  },
  SVN: {
    value: 9,
  },
  SLB: {
    value: 26.5,
  },
  SOM: {
    value: 27.5,
  },
  ZAF: {
    value: 17.5,
  },
  SSD: {
    value: 27.5,
  },
  ESP: {
    value: 15.5,
  },
  LKA: {
    value: 26,
  },
  SDN: {
    value: 27.5,
  },
  SUR: {
    value: 27,
  },
  SWE: {
    value: 2,
  },
  CHE: {
    value: 6,
  },
  SYR: {
    value: 18,
  },
  TWN: {
    value: 21.7,
  },
  TJK: {
    value: 7,
  },
  TZA: {
    value: 22.5,
  },
  THA: {
    value: 26.3,
  },
  TGO: {
    value: 27.2,
  },
  TON: {
    value: 24.8,
  },
  TTO: {
    value: 26.5,
  },
  TUN: {
    value: 18.7,
  },
  TUR: {
    value: 13.2,
  },
  TKM: {
    value: 15.8,
  },
  TUV: {
    value: 28,
  },
  UGA: {
    value: 22.8,
  },
  UKR: {
    value: 7.7,
  },
  ARE: {
    value: 27.7,
  },
  GBR: {
    value: 9.3,
  },
  USA: {
    value: 8.6,
  },
  URY: {
    value: 16.7,
  },
  UZB: {
    value: 13.2,
  },
  VUT: {
    value: 24,
  },
  VAT: {
    value: 15,
  },
  VEN: {
    value: 26.8,
  },
  VNM: {
    value: 24.7,
  },
  YEM: {
    value: 23.5,
  },
  ZMB: {
    value: 21.7,
  },
  ZWE: {
    value: 21.1,
  },
  CIV: {
    value: 26.5,
  },
  XKX: {
    value: 10.7,
  },
})
const config4 = ref<VueUiWorldConfig>({
  style: {
    chart: {
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      territory: {
        stroke: '#FFFFFF',
        colors: {
          min: '#b8c8fc',
          max: '#b54f0b',
        },
        emptyColor: '#E0E0E0',
      },
      dataLabels: {
        formatter: value => `${value} °C`,
      },
      title: {
        text: 'Average yearly temperatures °C',
        color: '#1A1A1A',
        subtitle: {
          text: '(Approximation)',
          color: '#6A6A6A',
        },
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A',
        borderColor: '#CCCCCC',
        backgroundOpacity: 30,
      },
    },
  },
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="Vue Data UI">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add vue-data-ui" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/graphieros/vue-data-ui')">
        <FaIcon name="i-ep:link" />
        访问 Vue Data UI
      </FaButton>
    </FaPageHeader>
    <div class="grid grid-cols-1 mx-4 gap-4 lg-grid-cols-2">
      <FaPageMain title="VueUiXy" class="m-0!">
        <VueDataUi component="VueUiXy" :dataset="dataset1" :config="config1" />
      </FaPageMain>
      <FaPageMain title="VueUiDonut" class="m-0!">
        <VueDataUi component="VueUiDonut" :dataset="dataset2" :config="config2" />
      </FaPageMain>
      <FaPageMain title="VueUiOnion" class="m-0!">
        <VueDataUi component="VueUiOnion" :dataset="dataset3" :config="config3" />
      </FaPageMain>
      <FaPageMain title="VueUiWorld" class="m-0!">
        <VueDataUi component="VueUiWorld" :dataset="dataset4" :config="config4" />
      </FaPageMain>
    </div>
  </div>
</template>
