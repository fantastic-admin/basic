<template>
    <el-row>
        <el-col :md="18">
            <page-main class="main">
                <iframe src="//player.bilibili.com/player.html?aid=585143528&bvid=BV1yz4y1C7HH&cid=254577087&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" />
            </page-main>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.main {
    height: 0;
    padding-bottom: 60% !important;
}
iframe {
    border: 1px solid #ccc;
    position: absolute;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
}
</style>
