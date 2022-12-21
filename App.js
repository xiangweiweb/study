import { ref } from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js';
import { resolveComponent } from './resolveAssets.js';
import { createVNode } from './vnode.js';

export const App = {
    name: 'App',
    setup() {
        const count = ref(520);
        return {
            count
        }
    },
    render() {
        const Button = resolveComponent('Button');
        const Icon = resolveComponent('Icon');
        return createVNode('div', {}, [
            createVNode('p', {}, 'Hi Vue3 Component param count is ' + this.count),
            createVNode(Button),
            createVNode(Icon),
        ]);
    }
}
