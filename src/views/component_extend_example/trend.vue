<template>
    <div>
        <page-header title="趋势符号">
            <template #content>
                <p>Trend</p>
                <p style="margin-bottom: 0;">标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外</p>
            </template>
        </page-header>
        <el-row :gutter="20" style="margin: 0 10px;">
            <el-col :md="8">
                <page-main title="基础用法" style="margin: 0;">
                    <p>
                        <trend value="12.3" />
                    </p>
                    <p>
                        <trend value="12.3" type="down" />
                    </p>
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main title="颜色反转" style="margin: 0;">
                    <p>
                        <trend value="12.3" reverse />
                    </p>
                    <p>
                        <trend value="12.3" type="down" reverse />
                    </p>
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main title="前缀后缀" style="margin: 0;">
                    <p>
                        <trend value="12.3" prefix="$" />
                    </p>
                    <p>
                        <trend value="12.3" suffix="%" />
                    </p>
                </page-main>
            </el-col>
        </el-row>
    </div>
</template>
