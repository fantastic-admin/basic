<script lang="tsx">
import JsxComp from './components/JsxComp/index.vue'

export default defineComponent({
  name: 'JsxExample',
  setup() {
    return () => {
      const iconsArr = ref([
        'i-file-icons:jsx',
        'i-ep:element-plus',
      ])
      const icons = (
        iconsArr.value.map((v) => {
          return (
            <fa-icon key={v} name={v} class="example-icon" />
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
          <fa-page-header title="JSX" content="请查看本页面源码，更多 JSX 介绍请访问官网文档。" />
          <fa-page-main>
            <div class="space-y-2">
              <p>调用 FaIcon 组件</p>
              {icons}
            </div>
            <fa-divider />
            <div class="space-y-2">
              <div class="test1">
                <div class="a"></div>
              </div>
              <div class="test2">
                <div class="a"></div>
              </div>
            </div>
            <fa-divider />
            <div class="space-y-2">
              <fa-button onClick={() => onPlus(10)}>
                点我：
                { count.value }
              </fa-button>
              <div v-html={html}></div>
              {html2}
            </div>
            <fa-divider />
            <JsxComp />
          </fa-page-main>
        </div>
      )
    }
  },
})
</script>

<style scoped>
.example-icon {
  font-size: 48px;
}

.test1 {
  font-size: 24px;

  .a {
    width: 100px;
    height: 100px;
    background-color: #000;
  }
}

.test2 {
  font-size: 24px;

  .a {
    width: 100px;
    height: 100px;
    background-color: #ff0;
  }
}
</style>
