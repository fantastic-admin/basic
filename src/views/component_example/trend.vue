<template>
    <div>
        <page-header title="趋势符号" content="标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外。" />
        <page-main>
            <el-divider content-position="left">基础用法</el-divider>
            <p>
                <trend value="12.3" />
            </p>
            <p>
                <trend value="12.3" type="down" />
            </p>
            <el-divider content-position="left">颜色反转</el-divider>
            <p>
                <trend value="12.3" reverse />
            </p>
            <p>
                <trend value="12.3" type="down" reverse />
            </p>
            <el-divider content-position="left">前缀后缀</el-divider>
            <p>
                <trend value="12.3" prefix="$" />
            </p>
            <p>
                <trend value="12.3" suffix="%" />
            </p>
        </page-main>
    </div>
</template>
