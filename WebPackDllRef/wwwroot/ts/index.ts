import * as vender from './vendor'

export default function(el: Element) {    
    el.innerHTML = 'run index';
    vender.run();
    console.log('index');    
}