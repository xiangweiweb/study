import { proxyRefs, effect } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js';
import { createVNode  } from './vnode.js';
export let currentInstance = null;
export let currentRenderingInstance = null;
function createRenderer(options) {
    const {
        createElement: hostCreateElement,
        insert: hostInsert,
        setElementText: hostSetElementText,
    } = options;
    function render(vnode, container, parentComponent) {
        patch(null, vnode, container, parentComponent);
    }

    function patch(n1, n2, container, parentComponent) {
        const { type } = n2;
        if(typeof type === 'string') {
            if(!n1) {
                mountElement(n2, container, parentComponent);
            }else {
                // 更新节点
            }
        }else if(typeof type === 'object') {
            if(!n1) {
                mountComponent(n2, container, parentComponent);
            }else {
                // 更新组件
            }
        }
    }
    const emptyAppContext = createAppContext();
    function mountComponent(vnode, container, parent) {
        const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
        const instance = {
            vnode,
            type: vnode.type,
            appContext,
            setupState: null,
            isMounted: false,
            subTree: null,
            update: null,
            render: null,
            proxy: null,
        }
        vnode.component = instance;
        const { setup, render } = instance.type;
        setCurrentInstance(instance);
        const setupResult = setup(instance);
        setCurrentInstance(null);
        if(typeof setupResult === 'object') {
            // 如果组件的setup返回的是一个对象，则 proxyRefs 处理之后设置到实例的属性上
            instance.setupState = proxyRefs(setupResult);
        }else {
            //
        }
        // 设置render函数中的this代理对象，通过call方法设置render函数中的this 指向proxy代理对象
        instance.proxy = new Proxy({_: instance}, {
            get({_: instance}, key) {
                if(key in instance.setupState) {
                    // 如果获取的key存在到此属性上，则返回值
                    return instance.setupState[key];
                }
            }
        })
    }
}
