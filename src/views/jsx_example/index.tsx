import styles from './index.module.scss'
import JsxComp from './components/JsxComp/index.vue'

export default defineComponent({
  name: 'JsxExample',
  render() {
    const iconsArr = ref([
      'file-icons:jsx',
      'ep:element-plus',
    ])
    const icons = (
      iconsArr.value.map((v) => {
        return (
          <svg-icon key={v} name={v} class={styles['example-icon']} />
        )
      })
    )

    const count = ref(0)
    function onPlus(v = 1) {
      count.value += v
    }
    const html = '<p>这是<i>一段</i><b>HTML</b>代码</p>'
    const html2 = (
      <p>
        这也是
        <i>一段</i>
        <b>HTML</b>
        代码
      </p>
    )

    return (
      <div>
        <page-header title="JSX" content="请查看本页面源码，更多 JSX 介绍请访问官网文档。" />
        <page-main>
          <p>调用 SvgIcon 组件</p>
          {icons}
          <el-divider />
          <div class={styles.test1}>
            <div class={styles.a}></div>
          </div>
          <div class={styles.test2}>
            <div class={styles.a}></div>
          </div>
          <el-divider />
          <el-button onClick={() => onPlus(10)}>
            点我：
            { count.value }
          </el-button>
          <div v-html={html}></div>
          {html2}
          <el-divider />
          <JsxComp />
        </page-main>
      </div>
    )
  },
})
