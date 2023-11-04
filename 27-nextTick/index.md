nextTick利用了事件循环机制，vue2根据浏览器环境包装nexttick内部函数为微任务，宏任务，vue3直接包装为promise.resolve微任务。

同一作用域下，按照事件循环机制，同步任务，微任务，(nexttick)，宏任务，nexttick会在当前作用域下的所有微任务执行完毕后执行，然后执行宏任务。
