import { $, $$, getWheelDelta, throttle, addClass, removeClass, hasClass } from '../utils'

// 动画时长
const ANIMATION_TIME: number = 1000
// 容器 class
const CON_CLS: string = 't-full-page'
// 单页 class
const PAGE_CLS: string = 'page'
// 导航按钮激活 class
const ACT_CLS: string = 'active'

export default class TFullPage {

  // 滚动容器
  private readonly $container: HTMLElement
  // 视口高度
  private readonly viewHeight: number
  // 滚动总页数
  private readonly pageCount: number
  // 导航按钮
  private readonly $navBtns: HTMLElement[] = []
  // 当前定位高度
  private curPosition: number
  // 当前定位索引
  private curIndex: number
  // 是否处于滚动的过程中
  private isScrolling: boolean = false

  constructor() {
    this.$container = $(`.${CON_CLS}`)
    this.viewHeight = document.documentElement.clientHeight
    this.pageCount = $$(`.${PAGE_CLS}`, this.$container).length
    this.curPosition = 0
    this.curIndex = 0
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

  // 向下滚动
  private down(): void {
    if (this.curIndex <= 0) return
    console.log('向下滚动')
    this.curIndex--
    this.goToPage(this.curIndex)
  }

  // 向上滚动
  private up(): void {
    if (this.curIndex >= this.pageCount - 1) return
    console.log('向上滚动')
    this.curIndex++
    this.goToPage(this.curIndex)
  }

  // 翻页
  private goToPage(index: number): void {
    this.isScrolling = true
    this.curPosition = -(this.viewHeight * index)
    this.$container.style.top = `${this.curPosition}px`
    this.setCurActiveBtn(this.curIndex)

    setTimeout((): void => {
      this.isScrolling = false
    }, ANIMATION_TIME)
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
      $navItem.setAttribute('page-index', i.toString())
      addClass($navItem, 'nav-list-item')
      this.$navBtns.push($navItem)
      $navUl.appendChild($navItem)
    }

    addClass(this.$navBtns[0], ACT_CLS)

    $nav.appendChild($navUl)
    this.$container.appendChild($nav)
    $navUl.addEventListener('click', e => {
      this.onClickNavBtn(e)
    })
  }

  // 设置当前激活按钮
  private setCurActiveBtn(index: number): void {
    this.$navBtns.forEach($navItem => removeClass($navItem, ACT_CLS))
    addClass(this.$navBtns[index], ACT_CLS)
  }

  // 点击导航按钮
  private onClickNavBtn(event: MouseEvent) {
    const target = event.target
    if (hasClass(<HTMLElement>target, 'nav-list-item')) {
      this.curIndex = ~~(target as HTMLElement).getAttribute('page-index')
      this.goToPage(this.curIndex)
    }
    event.stopPropagation()
  }

  // 对外暴露的代理方法 下一页
  public nextPage(): void {
    this.up()
  }

  // 对外暴露的代理方法 上一页
  public prevPage(): void {
    this.down()
  }
}
