<template>
    <div>
        <page-header title="处理结果" content="Result" />
        <page-main>
            <result type="success" title="提交成功" desc="提交结果页用于反馈一系列操作任务的处理结果。">
                <el-button type="primary" size="small">返回列表</el-button>
                <el-button size="small">打印</el-button>
            </result>
        </page-main>
        <page-main>
            <result type="error" title="提交失败" desc="灰色额外区域可以显示一些补充的信息。请核对并修改以下信息后，再重新提交。">
                <div slot="extra">
                    <div>您提交的内容有如下错误：</div>
                    <div>
                        您的账户已被冻结
                        <a href="###">打印</a>
                    </div>
                </div>
                <el-button type="primary" size="small">返回修改</el-button>
            </result>
        </page-main>
    </div>
</template>
