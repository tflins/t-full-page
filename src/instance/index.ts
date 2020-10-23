import { $, $$, getWheelDelta, throttle, addClass, removeClass } from '../utils'

export default class TFullPage {

  // 滚动容器
  readonly $container: HTMLElement
  // 视口高度
  readonly viewHeight: number
  // 滚动总页数
  readonly pageCount: number
  // 当前定位高度
  curPosition: number
  // 当前定位
  curIndex: number
  // 是否处于滚动的过程中
  isScrolling: boolean = false
  // 导航按钮
  $navBtns: HTMLElement[] = []

  constructor() {
    this.$container = $('.t-full-page')
    this.viewHeight = document.documentElement.clientHeight
    this.curPosition = 0
    this.curIndex = 0
    this.pageCount = $$('.page', this.$container).length
    this.init()
  }

  // 初始化
  private init(): void {
    this.$container.style.height = `${this.viewHeight}px`
    this.bindEvt()
    this.createNavBtn()
  }

  // 绑定事件
  private bindEvt(): void {
    const handleWheel: any = throttle(this.scrollMouse, this, 1000)
    document.addEventListener('wheel', handleWheel)
  }

  // 向下翻页
  private down(): void {
    if (this.curIndex <= 0) return
    console.log('向下滚动')
    this.curPosition += this.viewHeight
    this.curIndex--
    this.turnPage(this.curPosition)
  }

  // 向上翻页
  private up(): void {
    if (this.curIndex >= this.pageCount - 1) return
    console.log('向上滚动')
    this.curPosition -= this.viewHeight
    this.curIndex++
    this.turnPage(this.curPosition)
  }

  // 翻页
  private turnPage(height: number): void {
    this.isScrolling = true
    this.$container.style.top = `${height}px`
    this.setCurActiveBtn(this.curIndex)

    setTimeout((): void => {
      this.isScrolling = false
    }, 1000)
  }

  // 鼠标滚动时
  private scrollMouse(event: WheelEvent): void {
    if (this.isScrolling) return
    const delta: number = getWheelDelta(event)
    if (delta > 0) this.up()
    else this.down()
  }

  // 创建导航按钮
  private createNavBtn(): void {
    const $nav: HTMLElement = document.createElement('div')
    const $navUl: HTMLElement = document.createElement('ul')
    addClass($navUl, 'nav-list')
    addClass($nav, 't-full-page__nav')

    for (let i: number = 0; i < this.pageCount; i++) {
      const $navItem: HTMLElement = document.createElement('li')
      addClass($navItem, 'nav-list-item')
      this.$navBtns.push($navItem)
      $navUl.appendChild($navItem)
    }

    addClass(this.$navBtns[0], 'active')

    $nav.appendChild($navUl)
    this.$container.appendChild($nav)
  }

  // 设置当前激活按钮
  private setCurActiveBtn(index: number): void {
    this.$navBtns.forEach($navItem => removeClass($navItem, 'active'))
    addClass(this.$navBtns[index], 'active')

  }
}
