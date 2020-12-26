<template>
    <div>
        <page-header title="欢迎使用 Fantastic-admin（基础版）">
            <el-button-group style="margin-right: 10px;">
                <el-button type="success" plain @click="open('https://hooray.gitee.io/fantastic-admin')">开发文档</el-button>
                <el-button type="primary" plain @click="open('https://gitee.com/hooray/fantastic-admin')">代码仓库</el-button>
            </el-button-group>
            <el-button type="primary" @click="open('https://hooray.gitee.io/fantastic-admin/pro')">查看专业版</el-button>
        </page-header>
        <page-main>
            <h1 style="margin-top: 0;">Fantastic-admin 介绍</h1>
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :md="12">
                    <el-table :data="versionDiff" row-key="prop" size="mini" border stripe default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                        <el-table-column prop="prop" label="功能项" />
                        <el-table-column label="基础版" width="150" align="center">
                            <template slot-scope="scope">
                                <span v-if="typeof scope.row.basic == 'string'">{{ scope.row.basic }}</span>
                                <i v-else-if="scope.row.basic" class="el-icon-check" />
                            </template>
                        </el-table-column>
                        <el-table-column label="专业版" width="200" align="center">
                            <template slot-scope="scope">
                                <span v-if="typeof scope.row.pro == 'string'">{{ scope.row.pro }}</span>
                                <i v-else-if="scope.row.pro" class="el-icon-check" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :md="12" class="intro">
                    <h3 class="question">什么样的场景适合用专业版？</h3>
                    <ol class="answer">
                        <li><span>没有前端开发人员的小型公司。</span>据了解，有些小型公司没有前端开发人员，而这些公司在开发中后台系统的时候，直接要求后端开发人员来进行开发工作。所以借助 Vue 的易学习易上手特性，再加上本框架的加持，可以让后端开发人员能在短时间内转型成为全栈开发。</li>
                        <li><span>前端开发人员不足的中小型公司。</span>根据招聘网站统计，几乎所有公司都缺前端，其中有很大一部分中小型公司标配只有1-2名前端开发人员，而这些公司在开发中后台系统的时候，如果能有一套现成的中后台框架系统，不仅能提高项目开发效率，同时还大大减轻前端开发人员工作压力。</li>
                        <li><span>项目型公司。</span>特点为项目多，周期短，甲方对页面布局和主题风格有绝对话语权，而通过专业版提供的 12 套页面布局和 5 款主题风格（共计 60 种）可应对绝大部分甲方需求，并且可自定义扩展主题风格的样式，实现高度定制化。</li>
                        <li><span>产品型公司。</span>产品型公司最担心的就是产品开发中代码不可控的因素，本框架除了提供完善的开发文档和代码注释外，作者还提供一对一的技术支持，确保开发人员尽可能理解整套框架源码的方方面面，为产品保驾护航。</li>
                        <li><span>接私活的个人开发者。</span>手里能有一套可高度定制化的中后台框架，什么项目都不用担心啦~</li>
                    </ol>
                    <h3 class="question">与同类产品对比，优势体现在哪？</h3>
                    <ol class="answer">
                        <li><span>作者拥有10年+的前后端开发经验。</span>部分框架的作者由于天然缺少后端开发经验，可能会在设计框架的时候，很少或者没有考虑后端的实现逻辑，导致框架在实际使用中，业务场景无法落地，开发人员得通过修改源码自行实现业务。</li>
                        <li><span>经历过数十个真实项目的打磨。</span>没用在真实业务场景中使用过的框架都是纸飞机，哪怕它提供的演示功能特别华丽。而本框架在作者就职的公司，已经稳定应用在电商、直播、OA、CRM、ERP等多个不同领域的中后台系统中。</li>
                        <li><span>拒绝无脑的堆料。</span>就像国内早期的手机企业，由于缺少技术实力，在制造手机上只能无脑的塞第三方的顶级硬件，追求参数配置，俗称堆料，实际实用体验却一塌糊涂。网上大部分同类中后台框架产品目前就像如此，塞了一大堆第三方插件。本框架在引用第三方插件的基础上，借助以往项目经验，沉淀并总结出每个第三方插件的最佳实践，部分进行二次封装形成组件，方便开发人员使用。</li>
                        <li><span>后续将更新业务应用页面。</span>通过项目积累，沉淀出数十个业务应用的静态页面，做到开发人员拿来即可使用，极大提升开发效率的同时，还省去了产品和设计人员的工作。</li>
                    </ol>
                    <h3 class="question">不购买专业版可不可以？</h3>
                    <div class="answer">当然可以，我们鼓励理性消费，希望你在购买前能详细对比基础版与专业版的功能。如果基础版的功能已经能满足你的需求，那就使用基础版；如果有更复杂的需求，更多的应用场景，我们才会建议你购买专业版。</div>
                    <div class="answer"><span>需要注意，基础版基于 MIT 开源协议，在不删除和修改作者版权信息的前提下，可以进行商用。专业版则不限制。</span></div>
                    <h3 class="question">两个版本都长期维护吗？</h3>
                    <div class="answer">都长期维护，但侧重不同。基础版侧重于稳定性维护，主要在修复 bug ，不定期增加新特性；而专业版侧重于新特性开发，在确保稳定的基础上，会长期深挖中后台系统框架，持续产出可落地的特性或开发规范。</div>
                    <h3 class="question">如何购买专业版？</h3>
                    <div class="answer">请先加作者 QQ ：304327508 ，或者点击右侧在线咨询，然后通过上方微信或支付宝进行支付，支付成功后需要提供一个源码接收邮箱地址，源码包含专业版<span>演示源码</span>和<span>模版源码</span>。</div>
                    <div class="pay">
                        <div class="wechat">
                            <el-image src="http://hooray.gitee.io/fantastic-admin/wechat.png" />
                        </div>
                        <div class="alipay">
                            <el-image src="http://hooray.gitee.io/fantastic-admin/alipay.png" />
                        </div>
                    </div>
                </el-col>
            </el-row>
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            versionDiff: [
                { prop: '页面布局', basic: '3 套', pro: '12 套（全新开发）' },
                { prop: '主题风格（可自行扩展）', basic: '1 款', pro: '5 款' },
                { prop: '路由（侧边栏导航）配置项', basic: true, pro: true, children: [
                    { prop: 'title - 标题', basic: true, pro: true },
                    { prop: 'icon - 图标', basic: true, pro: true },
                    { prop: 'auth - 权限', basic: true, pro: true },
                    { prop: 'sidebar - 是否在侧边栏显示', basic: true, pro: true },
                    { prop: 'breadcrumb - 是否在面包屑导航显示', basic: true, pro: true },
                    { prop: 'activeMenu - 侧边栏高亮', basic: true, pro: true },
                    { prop: 'badge - 标记', basic: false, pro: true },
                    { prop: 'link - 内嵌链接（iframe）', basic: false, pro: true },
                    { prop: 'copyright - 是否显示底部版权', basic: false, pro: true },
                    { prop: 'paddingBottom - 底部距离', basic: false, pro: true }
                ] },
                { prop: '外链导航', basic: true, pro: true },
                { prop: '多级导航', basic: true, pro: true },
                { prop: '标签栏（Tab 标签页）', basic: false, pro: true },
                { prop: '全方位权限验证', basic: true, pro: true },
                { prop: 'CSS Sprites（支持自动合并生成图片及 css 代码）', basic: true, pro: true },
                { prop: 'SVG 图标（提供组件方便使用 svg 图标）', basic: true, pro: true },
                { prop: '全局组件（自动注册）', basic: true, pro: true },
                { prop: '页面缓存', basic: true, pro: true },
                { prop: '基础组件', basic: true, pro: true },
                { prop: '扩展组件', basic: false, pro: true },
                { prop: '国际化', basic: false, pro: true },
                { prop: 'Mock', basic: false, pro: true },
                { prop: '错误日志', basic: false, pro: true },
                { prop: '业务应用页面（拿来即用的静态页面）', basic: false, pro: '不定期扩充' },
                { prop: '文件模版（代码快速生成）', basic: false, pro: true },
                { prop: '框架基础模版源码（不含演示代码）', basic: false, pro: true },
                { prop: '团队代码规范', basic: true, pro: true, children: [
                    { prop: 'IDE 开发编辑器规范', basic: true, pro: true },
                    { prop: 'ESLint 校验', basic: true, pro: true },
                    { prop: 'Stylelint 校验', basic: true, pro: true },
                    { prop: 'Git 验证', basic: false, pro: true }
                ] },
                { prop: '兼容 IE11', basic: false, pro: true },
                { prop: '版权信息修改/隐藏', basic: false, pro: true },
                { prop: '开发文档', basic: true, pro: true },
                { prop: '视频教程', basic: true, pro: true },
                { prop: '技术支持', basic: 'QQ群：1001394973', pro: '作者提供 1 对 1 技术支持' },
                { prop: '价格', basic: '免费', pro: '596 元' }
            ]
        }
    },
    methods: {
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>

<style lang="scss" scoped>
.intro {
    .question {
        margin: 0;
    }
    .answer {
        margin: 20px 0;
        padding-left: 40px;
        font-size: 14px;
        color: #aaa;
        li {
            margin-bottom: 10px;
            line-height: 1.5;
        }
        span {
            color: #666;
            font-weight: bold;
        }
    }
    .pay {
        text-align: center;
        .wechat,
        .alipay {
            display: inline-block;
            width: 230px;
            margin: 0 20px;
            padding: 20px 20px 0;
            color: #fff;
            border-radius: 4px;
            &::after {
                display: block;
                height: 50px;
                line-height: 46px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
            }
        }
        .wechat {
            background-color: #22ab38;
            &::after {
                content: '请使用微信支付';
            }
        }
        .alipay {
            background-color: #1678ff;
            &::after {
                content: '请使用支付宝支付';
            }
        }
    }
}
</style>
