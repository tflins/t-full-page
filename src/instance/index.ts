import { $, $$ } from '../utils'

export default class TFullPage {
  constructor() {
    this.init()
  }

  // 初始化
  init() {
    $('.t-full-page').style.height = `${document.documentElement.clientHeight}px`
  }

  // 向下翻页
  down() {

  }

  // 向上翻页
  up() {

  }
}
