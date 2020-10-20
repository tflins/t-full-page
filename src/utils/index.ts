export const $ = (selector: string, scope = document): HTMLElement => scope.querySelector(selector)

export const $$  = (selector: string, scope = document): NodeListOf<Element>  => scope.querySelectorAll(selector) 
