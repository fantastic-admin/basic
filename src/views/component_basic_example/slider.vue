<template>
    <div>
        <Alert />
        <page-header title="滑块" />
        <page-main title="基础用法" class="demo">
            <span class="demonstration">默认</span>
            <el-slider v-model="value1" />
            <span class="demonstration">自定义初始值</span>
            <el-slider v-model="value2" />
            <span class="demonstration">隐藏 Tooltip</span>
            <el-slider v-model="value3" :show-tooltip="false" />
            <span class="demonstration">格式化 Tooltip</span>
            <el-slider v-model="value4" :format-tooltip="formatTooltip" />
            <span class="demonstration">禁用</span>
            <el-slider v-model="value5" disabled />
        </page-main>
        <page-main title="离散值" class="demo">
            <span class="demonstration">不显示间断点</span>
            <el-slider v-model="value6" :step="10" />
            <span class="demonstration">显示间断点</span>
            <el-slider v-model="value6" :step="10" show-stops />
        </page-main>
        <page-main title="带有输入框" class="demo">
            <el-slider v-model="value7" show-input />
        </page-main>
        <page-main title="范围选择" class="demo">
            <el-slider v-model="value8" range show-stops :max="10" />
        </page-main>
        <page-main title="竖向模式" class="demo">
            <el-slider v-model="value9" vertical height="200px" />
        </page-main>
    </div>
</template>

<script>
import Alert from './components/alert'

export default {
    components: {
        Alert
    },
    data() {
        return {
            value1: 0,
            value2: 50,
            value3: 36,
            value4: 48,
            value5: 42,
            value6: 0,
            value7: 0,
            value8: [4, 8],
            value9: 0
        }
    },
    methods: {
        formatTooltip(val) {
            return val / 100
        }
    }
}
</script>
