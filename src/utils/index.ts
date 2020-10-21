export const $ = (selector: string, scope: HTMLElement | Document = document): HTMLElement => scope.querySelector(selector)

export const $$ = (selector: string, scope: HTMLElement | Document = document): NodeListOf<Element> => scope.querySelectorAll(selector)

// 获取滚轮方向
export const getWheelDelta = (event: WheelEvent): number => event.deltaY

// 节流函数
export const throttle = (fn: Function, content: Object, delay: number = 1000): Function => {
  let wait: boolean = false
  return function (...args) {
    if (!wait) {
      fn.apply(content, args)
      wait = true
      setTimeout((): void => {
        wait = false
      }, delay);
    }
  }
}

