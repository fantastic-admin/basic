<template>
    <el-row>
        <el-col :md="18">
            <page-main>
                <iframe src="//player.bilibili.com/player.html?aid=627509382&bvid=BV1Et4y1i7cJ&cid=249536051&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" />
            </page-main>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.page-main {
    position: relative;
    height: 0;
    padding-bottom: 60%;
}
iframe {
    border: 1px solid #ccc;
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}
</style>
