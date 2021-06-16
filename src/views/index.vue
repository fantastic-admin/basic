<template>
    <div>
        <page-header title="欢迎使用 Fantastic-admin（基础版）">
            <template #content>
                <div>
                    <div style="margin-bottom: 5px;">这是一款<b style="text-emphasis-style: '❤';">开箱即用</b>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护</div>
                    <div>注：在作者就职的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行</div>
                </div>
            </template>
            <el-button-group style="margin-right: 10px;">
                <el-button type="success" plain @click="open(`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin`)">开发文档</el-button>
                <el-button type="primary" plain @click="open(`https://${location.origin.includes('gitee') ? 'gitee' : 'github'}.com/hooray/fantastic-admin`)">代码仓库</el-button>
            </el-button-group>
        </page-header>
        <el-row :gutter="20" style="margin: 0 10px;">
            <el-col :lg="8">
                <page-main title="框架信息" style="margin: 0 0 20px 0;">
                    <div class="fa-info">
                        <img :src="`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/logo.png`" style="width: 150px;">
                        <h1>Fantastic-admin</h1>
                        <el-table :data="diff" row-key="prop" size="mini" border stripe>
                            <el-table-column label="基础版" align="center">
                                <template slot-scope="scope">
                                    <div v-for="(item, index) in scope.row.basic" :key="index">{{ item }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="专业版" align="center">
                                <template slot-scope="scope">
                                    <div v-for="(item, index) in scope.row.pro" :key="index">{{ item }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </page-main>
            </el-col>
            <el-col :lg="16">
                <el-row :gutter="20" style="margin: 0 -10px 20px -10px;">
                    <el-col :md="4">
                        <div class="icon-box icon-box-1" @click="onIconClick('收藏')">
                            <i class="el-icon-star-off" />
                            <div class="title">收藏</div>
                        </div>
                    </el-col>
                    <el-col :md="4">
                        <div class="icon-box icon-box-2" @click="onIconClick('通知')">
                            <i class="el-icon-bell" />
                            <div class="title">通知</div>
                        </div>
                    </el-col>
                    <el-col :md="4">
                        <div class="icon-box icon-box-3" @click="onIconClick('图集')">
                            <i class="el-icon-picture-outline" />
                            <div class="title">图集</div>
                        </div>
                    </el-col>
                    <el-col :md="4">
                        <div class="icon-box icon-box-4" @click="onIconClick('拍照')">
                            <i class="el-icon-camera" />
                            <div class="title">拍照</div>
                        </div>
                    </el-col>
                    <el-col :md="4">
                        <div class="icon-box icon-box-5" @click="onIconClick('视频')">
                            <i class="el-icon-video-camera" />
                            <div class="title">视频</div>
                        </div>
                    </el-col>
                    <el-col :md="4">
                        <div class="icon-box icon-box-6" @click="onIconClick('购物')">
                            <i class="el-icon-goods" />
                            <div class="title">购物</div>
                        </div>
                    </el-col>
                </el-row>
                <page-main title="应用场景" style="margin: 0 0 20px 0;">
                    <div class="question">
                        <ol class="answer">
                            <li><span>没有前端开发人员的小型公司。</span>据了解，有些小型公司没有前端开发人员，而这些公司在开发中后台系统的时候，直接要求后端开发人员来进行开发工作。所以借助 Vue 的易学习易上手特性，再加上本框架的加持，可以让后端开发人员能在短时间内转型成为全栈开发。</li>
                            <li><span>前端开发人员不足的中小型公司。</span>根据招聘网站统计，几乎所有公司都缺前端，其中有很大一部分中小型公司标配只有1-2名前端开发人员，而这些公司在开发中后台系统的时候，如果能有一套现成的中后台框架系统，不仅能提高项目开发效率，同时还大大减轻前端开发人员工作压力。</li>
                            <li><span>项目型公司。</span>特点为项目多，周期短，甲方对页面布局和主题风格有绝对话语权，而通过专业版提供的 12 套页面布局和 5 款主题风格（共计 60 种）可应对绝大部分甲方需求，并且可自定义扩展主题风格的样式，实现高度定制化。</li>
                            <li><span>产品型公司。</span>产品型公司最担心的就是产品开发中代码不可控的因素，本框架除了提供完善的开发文档和代码注释外，针对专业版用户还提供一对一的技术支持，确保开发人员尽可能理解整套框架源码的方方面面，为产品保驾护航。</li>
                            <li><span>接私活的个人开发者。</span>手里有一套可高度定制化的中后台框架，什么项目都不用担心啦~</li>
                        </ol>
                    </div>
                </page-main>
                <page-main title="优势" style="margin: 0;">
                    <div class="question">
                        <ol class="answer">
                            <li><span>作者拥有10年+的前后端开发经验。</span>部分框架的作者由于天然缺少后端开发经验，可能会在设计框架的时候，很少或者没有考虑后端的实现逻辑，导致框架在实际使用中，业务场景无法落地，开发人员得通过修改源码自行实现业务。</li>
                            <li><span>经历过数十个真实项目的打磨。</span>没用在真实业务场景中使用过的框架都是纸飞机，哪怕它提供的演示功能特别华丽。而本框架在作者就职的公司，已经稳定应用在电商、直播、OA、CRM、ERP等多个不同领域的中后台系统中。</li>
                            <li><span>丰富的组件库。</span>除了支持 ElementUI 自带的组件外，框架还扩充了部分业务组件，以及第三方插件。借助以往的项目经验，提供最佳实践方案，方便开发人员直接使用。</li>
                            <li><span>持续更新的业务应用静态页面。</span>通过项目积累，沉淀出数十个业务应用的静态页面，做到开发人员拿来即可使用，极大提升开发效率的同时，还省去了产品和设计人员的工作。</li>
                            <li><span>长期维护。</span>无论是免费的基础版，还是付费的专业版，均提供长期维护。区别在于基础版侧重于稳定性维护，主要在修复 bug ，不定期增加新特性；专业版侧重于新特性开发，在确保稳定的基础上，会长期深挖中后台系统框架，持续产出可落地的特性或开发规范。</li>
                        </ol>
                    </div>
                </page-main>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            location: {
                origin: location.origin
            },
            diff: [{
                basic: [
                    '3 套页面布局',
                    '1 款主题风格',
                    '6 个侧边栏导航配置项',
                    '支持外链导航',
                    '支持全方位权限验证',
                    '10+ 个基础组件',
                    '支持 Mock 数据',
                    '团队代码规范',
                    '需保留作者版权信息'
                ],
                pro: [
                    '12 套页面布局',
                    '6 款主题风格',
                    '10 个侧边栏导航配置项',
                    '支持外链导航',
                    '支持内嵌导航',
                    '支持 Tab 标签栏',
                    '支持全方位权限验证',
                    '10+ 个基础组件',
                    '提供扩展组件',
                    '支持国际化',
                    '支持 Mock 数据',
                    '支持错误日志上报',
                    '支持文件自动生成',
                    '提供业务应用静态页面（长期扩充）',
                    '团队代码规范',
                    '可自定义版权信息',
                    '提供一对一技术支持'
                ]
            }]
        }
    },
    methods: {
        open(url) {
            window.open(url, 'top')
        },
        onIconClick(val) {
            this.$message({
                message: `你点击了：${val}`,
                type: 'info'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.fa-info {
    padding: 10px 0 0;
    text-align: center;
    h1 {
        margin: 10px auto 20px;
    }
}
.question {
    .answer {
        margin: 20px 0 0;
        padding-left: 20px;
        font-size: 14px;
        color: #aaa;
        li {
            margin-bottom: 10px;
            line-height: 1.5;
            &:last-child {
                margin-bottom: 0;
            }
        }
        span {
            color: #666;
            font-weight: bold;
        }
    }
}
.icon-box {
    padding: 20px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        color: #fff;
    }
    &-1 {
        color: #ffc069;
        &:hover {
            background-color: #ffc069;
        }
    }
    &-2 {
        color: #b37feb;
        &:hover {
            background-color: #b37feb;
        }
    }
    &-3 {
        color: #95de64;
        &:hover {
            background-color: #95de64;
        }
    }
    &-4 {
        color: #ff85c0;
        &:hover {
            background-color: #ff85c0;
        }
    }
    &-5 {
        color: #ff9c6e;
        &:hover {
            background-color: #ff9c6e;
        }
    }
    &-6 {
        color: #282c34;
        &:hover {
            background-color: #282c34;
        }
    }
    i {
        font-size: 24px;
    }
    .title {
        margin-top: 5px;
        font-size: 14px;
    }
}
</style>
