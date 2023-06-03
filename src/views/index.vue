<route lang="yaml">
name: home
meta:
  title: 主页
</route>

<script setup lang="ts">
function open(url: string) {
  window.open(url, '_blank')
}

const fantasticStartkitInfo = ref({
  feature: [
    '支持 TypeScript',
    '默认集成 vue-router 和 pinia',
    '全局 SCSS 资源引入',
    '全局组件自动注册',
    '支持 SVG 图标，CSS 精灵图自动合成',
    '支持 mock 数据，可摆脱后端束缚独立开发',
    '支持 gzip / brotli 优化项目体积，提高加载速度',
    '结合 IDE 插件、ESlint 、stylelint 、Git 钩子，轻松实现团队代码规范',
  ],
})

const fantasticAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://fantastic-admin.gitee.io/preview1.png',
    'https://fantastic-admin.gitee.io/preview2.png',
    'https://fantastic-admin.gitee.io/preview3.png',
    'https://fantastic-admin.gitee.io/preview4.png',
    'https://fantastic-admin.gitee.io/preview5.png',
    'https://fantastic-admin.gitee.io/preview6.png',
  ],
})

const oneStepAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://one-step-admin.gitee.io/preview1.png',
    'https://one-step-admin.gitee.io/preview2.png',
    'https://one-step-admin.gitee.io/preview3.png',
    'https://one-step-admin.gitee.io/preview4.png',
    'https://one-step-admin.gitee.io/preview5.png',
    'https://one-step-admin.gitee.io/preview6.png',
  ],
})
</script>

<template>
  <div>
    <page-header title="欢迎使用 Fantastic-admin（基础版）">
      <template #content>
        <div>
          <div style="margin-bottom: 5px;">
            这是一款<b class="text-emphasis">开箱即用</b>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护
          </div>
          <div>注：在作者就职的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行</div>
        </div>
      </template>
      <el-button-group>
        <el-button type="success" size="large" plain @click="open('https://fantastic-admin.gitee.io')">
          开发文档
        </el-button>
        <el-dropdown>
          <el-button type="primary" size="large">
            代码仓库
            <svg-icon name="ep:arrow-down" class="el-icon--right" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="open('https://gitee.com/fantastic-admin/basic')">
                Gitee
              </el-dropdown-item>
              <el-dropdown-item @click="open('https://github.com/fantastic-admin/basic')">
                Github
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-button-group>
    </page-header>
    <el-row :gutter="20" style="margin: 0 10px;">
      <el-col :lg="8">
        <page-main class="ecology vue">
          <template #title>
            <div class="title-info">
              <img src="https://cn.vuejs.org/logo.svg">
              <div>
                <h1>Fantastic-startkit</h1>
                <h2>一款开箱即用的 Vue 项目启动套件</h2>
              </div>
            </div>
            <el-dropdown split-button type="primary" @click="open('https://hooray.gitee.io/fantastic-startkit/')">
              访问官网
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="open('https://hooray.github.io/fantastic-startkit/')">
                    备用地址
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <ul>
            <li v-for="item in fantasticStartkitInfo.feature" :key="item">
              {{ item }}
            </li>
          </ul>
        </page-main>
      </el-col>
      <el-col :lg="8">
        <page-main class="ecology fa">
          <template #title>
            <div class="title-info">
              <img src="https://fantastic-admin.gitee.io/logo.png">
              <div>
                <h1>Fantastic-admin</h1>
                <h2>一款开箱即用的 Vue 中后台管理系统框架</h2>
              </div>
            </div>
            <el-dropdown split-button type="primary" @click="open('https://fantastic-admin.gitee.io')">
              访问官网
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="open('https://fantastic-admin.github.io')">
                    备用地址
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <el-carousel trigger="click" indicator-position="none" :interval="5000" height="250px">
            <el-carousel-item v-for="(item, index) in fantasticAdminInfo.data" :key="item">
              <el-image :src="item" fit="cover" style="cursor: pointer; width: 100%; height: 250px; margin: auto;" @click="fantasticAdminInfo.imageVisible = true; fantasticAdminInfo.index = index" />
            </el-carousel-item>
          </el-carousel>
          <el-image-viewer v-if="fantasticAdminInfo.imageVisible" :url-list="fantasticAdminInfo.data" :initial-index="fantasticAdminInfo.index" @close="fantasticAdminInfo.imageVisible = false" />
        </page-main>
      </el-col>
      <el-col :lg="8">
        <page-main class="ecology osa">
          <template #title>
            <div class="title-info">
              <img src="https://one-step-admin.gitee.io/logo.png">
              <div>
                <h1>One-step-admin</h1>
                <h2>一款干啥都快人一步的 Vue 中后台系统框架</h2>
              </div>
            </div>
            <el-dropdown split-button type="primary" @click="open('https://one-step-admin.gitee.io')">
              访问官网
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="open('https://one-step-admin.github.io')">
                    备用地址
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <el-carousel trigger="click" indicator-position="none" :interval="5000" height="250px">
            <el-carousel-item v-for="(item, index) in oneStepAdminInfo.data" :key="item">
              <el-image :src="item" fit="cover" style="cursor: pointer; width: 100%; height: 250px; margin: auto;" @click="oneStepAdminInfo.imageVisible = true; oneStepAdminInfo.index = index" />
            </el-carousel-item>
          </el-carousel>
          <el-image-viewer v-if="oneStepAdminInfo.imageVisible" :url-list="oneStepAdminInfo.data" :initial-index="oneStepAdminInfo.index" @close="oneStepAdminInfo.imageVisible = false" />
        </page-main>
      </el-col>
    </el-row>
    <page-main title="应用场景">
      <div class="question">
        <ol class="answer">
          <li><span>没有前端开发人员的小型公司。</span>据了解，有些小型公司没有前端开发人员，而这些公司在开发中后台系统的时候，直接要求后端开发人员来进行开发工作。所以借助 Vue 的易学习易上手特性，再加上本框架的加持，可以让后端开发人员能在短时间内转型成为全栈开发。</li>
          <li><span>前端开发人员不足的中小型公司。</span>根据招聘网站统计，几乎所有公司都缺前端，其中有很大一部分中小型公司标配只有1-2名前端开发人员，而这些公司在开发中后台系统的时候，如果能有一套现成的中后台框架系统，不仅能提高项目开发效率，同时还大大减轻前端开发人员工作压力。</li>
          <li><span>项目型公司。</span>特点为项目多，周期短，甲方对页面布局和主题风格有绝对话语权，而通过专业版提供的布局和主题风格，可应对绝大部分甲方需求，并且可自定义扩展主题风格的样式，实现高度定制化。</li>
          <li><span>产品型公司。</span>产品型公司最担心的就是产品开发中代码不可控的因素，本框架除了提供完善的开发文档和代码注释外，作者还提供一对一的技术支持，确保开发人员尽可能理解整套框架源码的方方面面，为产品保驾护航。</li>
          <li><span>个人开发者。</span>手里有一套可高度定制化的中后台框架，什么项目都不用担心啦~</li>
        </ol>
      </div>
    </page-main>
    <page-main title="优势">
      <div class="question">
        <ol class="answer">
          <li><span>作者拥有10年+的前后端开发经验。</span>部分框架的作者由于缺少后端开发经验，可能会在设计框架的时候，很少或者没有考虑后端的实现逻辑，导致框架在实际使用中，业务场景无法落地，开发人员得通过修改源码自行实现业务。</li>
          <li><span>经历过数十个真实项目的打磨。</span>没用在真实业务场景中使用过的框架都是纸飞机，哪怕它提供的演示功能特别华丽。而本框架在作者就职的公司，已经稳定应用在电商、直播、OA、CRM、ERP等多个不同领域的中后台系统中。</li>
          <li><span>丰富的组件库。</span>除了支持 ElementUI / Element Plus 自带的组件外，框架还扩充了部分业务组件，以及第三方插件。借助以往的项目经验，提供最佳实践方案，方便开发人员直接使用。</li>
          <li><span>持续更新的业务应用静态页面。</span>通过项目积累，沉淀出数十个业务应用的静态页面，做到开发人员拿来即可使用，极大提升开发效率的同时，还省去了产品和设计人员的工作。</li>
          <li><span>长期维护。</span>无论是免费的基础版，还是付费的专业版，均提供长期维护。区别在于基础版侧重于稳定性维护，主要在修复 bug ，不定期增加新特性；专业版侧重于新特性开发，在确保稳定的基础上，会长期深挖中后台系统框架，持续产出可落地的特性或开发规范。</li>
        </ol>
      </div>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.ecology {
  margin: 0;
  height: 100%;

  :deep(.title-container) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    .title-info {
      flex: 1 1 400px;
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 50px;
        display: block;
      }

      h1 {
        margin: 0;
        font-size: 24px;
      }

      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: normal;
        color: var(--el-text-color-secondary);
      }
    }

    .el-dropdown {
      margin-left: auto;
    }
  }

  &.vue {
    h1 {
      color: #41b883;
    }
  }

  &.fa {
    h1 {
      color: #e60000;
    }
  }

  &.osa {
    h1 {
      color: #67c23a;
    }
  }

  .el-carousel {
    box-shadow: var(--el-box-shadow-light);
    transition: var(--el-transition-box-shadow);
  }

  ul li {
    line-height: 28px;
  }
}

.question {
  .answer {
    margin: 20px 0 0;
    padding-left: 20px;
    font-size: 16px;
    color: var(--el-text-color-secondary);

    li {
      margin-bottom: 10px;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }
    }

    span {
      color: var(--el-text-color-primary);
      font-weight: bold;
    }
  }
}
</style>
