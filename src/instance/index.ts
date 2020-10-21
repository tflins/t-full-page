import { $, $$, getWheelDelta, throttle } from '../utils'

export default class TFullPage {

  // 滚动容器
  $container: HTMLElement
  // 视口高度
  viewHeight: number
  // 当前定位高度
  curPosition: number
  // 当前定位
  curIndex: number
  // 滚动总页数
  pageCount: number

  constructor() {
    this.$container = $('.t-full-page')
    this.viewHeight = document.documentElement.clientHeight
    this.curPosition = 0
    this.curIndex = 0
    this.pageCount = $$('.page', this.$container).length
    this.init()
  }

  // 初始化
  init(): void {
    this.$container.style.height = `${this.viewHeight}px`
    this.bindEvt()
  }

  // 绑定事件
  bindEvt(): void {
    const handleWheel: any = throttle(this.scrollMouse, this, 1000)
    document.addEventListener('wheel', handleWheel)
  }

  // 向下翻页
  down(): void {
    if (this.curIndex <= 0) return
    console.log('向下滚动')
    this.curPosition += this.viewHeight
    this.turnPage(this.curPosition)
    this.curIndex --
  }

  // 向上翻页
  up(): void {
    if (this.curIndex >= this.pageCount - 1) return
    console.log('向上滚动')
    this.curPosition -= this.viewHeight
    this.turnPage(this.curPosition)
    this.curIndex ++
  }

  // 翻页
  turnPage(height: number): void {
    this.$container.style.top = `${height}px`
  }

  // 鼠标滚动时
  scrollMouse(event: WheelEvent): void {
    const delta: number = getWheelDelta(event)
    if (delta > 0) this.up()
    else this.down()
  }
}
