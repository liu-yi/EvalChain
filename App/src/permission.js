import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

const whiteList = ['/login','/info']
router.beforeEach(
    (to, from, next) => {
        if (whiteList.indexOf(to.path) !== -1) {
            console.log('haha')
            next()
        } else {
            next('/info')
            NProgress.done()
        }
    }
);

router.afterEach(
    () => {
        NProgress.done();
    }
)