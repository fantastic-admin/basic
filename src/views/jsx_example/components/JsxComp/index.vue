<script lang="tsx">
export default defineComponent({
  name: 'JsxComp',
  setup() {
    return () => (
      <div class="test">
        这是一个用
        <span>JSX</span>
        编写的SFC组件。
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.test {
  font-size: 24px;

  span {
    font-weight: bold;
    color: #f00;
  }
}
</style>
