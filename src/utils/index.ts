const trim = (str: string): string => {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

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

// dom 是否有 class
export const hasClass = (el: HTMLElement, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

// 给 dom 添加 class
export const addClass = (el: HTMLElement, cls: string): void => {
  if (!el) return
  let curClass: string = el.className
  let classes: string[] = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName: string = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

// dom 删除 class
export const removeClass = (el: HTMLElement, cls: string): void => {
  if (!el || !cls) return
  let classes: string[] = cls.split(' ')
  let curClass: string = ' ' + el.className + ' '

  for (let i: number = 0, j: number = classes.length; i < j; i++) {
    let clsName: string = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
