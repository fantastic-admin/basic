<template>
    <div>
        <page-header title="固定底部操作栏" content="避免因页面过长导致操作按钮需要滚动到页面底部才能操作，例如表单页">
            <template #content>
                <p>FixedActionBar</p>
                <p style="margin-bottom: 0;">避免因页面过长导致操作按钮需要滚动到页面底部才能操作，例如表单页</p>
            </template>
        </page-header>
        <page-main>
            <el-row>
                <el-col :md="24" :lg="12">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name" />
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai" />
                                <el-option label="区域二" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                                <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送">
                            <el-switch v-model="form.delivery" />
                        </el-form-item>
                        <el-form-item label="活动性质">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type" />
                                <el-checkbox label="地推活动" name="type" />
                                <el-checkbox label="线下主题活动" name="type" />
                                <el-checkbox label="单纯品牌曝光" name="type" />
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="线上品牌商赞助" />
                                <el-radio label="线下场地免费" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input v-model="form.desc" type="textarea" />
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name" />
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai" />
                                <el-option label="区域二" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                                <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送">
                            <el-switch v-model="form.delivery" />
                        </el-form-item>
                        <el-form-item label="活动性质">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type" />
                                <el-checkbox label="地推活动" name="type" />
                                <el-checkbox label="线下主题活动" name="type" />
                                <el-checkbox label="单纯品牌曝光" name="type" />
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="线上品牌商赞助" />
                                <el-radio label="线下场地免费" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input v-model="form.desc" type="textarea" />
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name" />
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai" />
                                <el-option label="区域二" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                                <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送">
                            <el-switch v-model="form.delivery" />
                        </el-form-item>
                        <el-form-item label="活动性质">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type" />
                                <el-checkbox label="地推活动" name="type" />
                                <el-checkbox label="线下主题活动" name="type" />
                                <el-checkbox label="单纯品牌曝光" name="type" />
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="线上品牌商赞助" />
                                <el-radio label="线下场地免费" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input v-model="form.desc" type="textarea" />
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </page-main>
        <fixed-action-bar>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
        </fixed-action-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    }
}
</script>
