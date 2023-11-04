Vue的父子组件的挂载销毁都顺序遵循父子子父的规则：

1. 父组件的加载顺序：父beforeCreate ->父created ->父beforeMount ->子beforeCreate ->子created ->子beforeMount ->子mounted -> 父mounted。
2. 父组件更新顺序：父beforeUpdate->父updated。
3. 子组件更新顺序：父beforeUpdate->子beforeUpdate->子updated->父updated。
4. 父子组件销毁顺序：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed。

在具体使用中，根据需要选择性地添加钩子函数。例如，如果需要初始化某个操作，可以添加created或mounted钩子；如果需要在组件更新时执行某个操作，可以添加updated钩子。注意，如果需要在子组件加载时执行某个操作，需要等到子组件的created钩子执行完毕后才能执行。
