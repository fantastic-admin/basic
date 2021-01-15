<template>
    <div>
        <page-header title="搜索面板" content="SearchBar" />
        <page-main>
            <search-bar show-more @toggle="searchMore = $event">
                <el-form :model="search" size="small" label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名 / 手机号">
                                <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item v-auth="'supplay.department.browse'" label="部门">
                                <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                                    <el-option label="技术部" :value="1" />
                                    <el-option label="设计部" :value="2" />
                                    <el-option label="行政部" :value="3" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item v-auth="'supplay.department_job.browse'" label="职位">
                                <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                                    <el-option label="程序员" :value="1" />
                                    <el-option label="设计师" :value="2" />
                                    <el-option label="人事" :value="3" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item v-auth="'supplay.role.browse'" label="角色">
                                <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                                    <el-option label="主管" :value="1" />
                                    <el-option label="普通职员" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-show="searchMore">
                        <el-col :span="24">
                            <el-form-item label="角色">
                                <el-checkbox :value="true">备选项</el-checkbox>
                                <el-checkbox :value="false">备选项</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search">筛选</el-button>
                        <el-button>导出</el-button>
                        <el-button type="text">查看已导出记录</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
        </page-main>
        <page-main title="默认展开">
            <search-bar show-more unfold @toggle="searchMore2 = $event">
                <el-form :model="search" size="small" label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名 / 手机号">
                                <el-input v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item v-auth="'supplay.department.browse'" label="部门">
                                <el-select v-model="search.department_id" clearable placeholder="请选择部门">
                                    <el-option label="技术部" :value="1" />
                                    <el-option label="设计部" :value="2" />
                                    <el-option label="行政部" :value="3" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item v-auth="'supplay.department_job.browse'" label="职位">
                                <el-select v-model="search.department_job_id" clearable placeholder="请选择职位">
                                    <el-option label="程序员" :value="1" />
                                    <el-option label="设计师" :value="2" />
                                    <el-option label="人事" :value="3" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item v-auth="'supplay.role.browse'" label="角色">
                                <el-select v-model="search.role_id" clearable placeholder="请选择角色">
                                    <el-option label="主管" :value="1" />
                                    <el-option label="普通职员" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-show="searchMore2">
                        <el-col :span="24">
                            <el-form-item label="角色">
                                <el-checkbox :value="true">备选项</el-checkbox>
                                <el-checkbox :value="false">备选项</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search">筛选</el-button>
                        <el-button>导出</el-button>
                        <el-button type="text">查看已导出记录</el-button>
                    </el-form-item>
                </el-form>
            </search-bar>
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: {
                name: '',
                department_id: '',
                department_job_id: '',
                role_id: ''
            },
            searchMore: false,
            searchMore2: false
        }
    }
}
</script>
