# Baidu-study
+ [task1](http://snowxxapple.github.io/Baidu-study/task1/)
+ [task2](http://snowxxapple.github.io/Baidu-study/task2/)
+ [task3](http://snowxxapple.github.io/Baidu-study/task3/)
+ [task4](http://snowxxapple.github.io/Baidu-study/task4/index1.html)
+ task5
+ task6
+ task7
+ task8
+ task9
+ [task10](http://snowxxapple.github.io/Baidu-study/task10/)

---
##### task1 简单HTML标签使用
`<b>`用于粗体 
`<i>`用于斜体
可以用`label`标签关联一个radio按钮，点击`label`标签时，radio按钮将被选中
`name`属性主要为了表识表单

---

##### task2 简单css使用
``` css
list-style: none;//去掉点
text-decoration: none;//去掉下划线
border-collapse: collapse;//把表格的线条合并
display: inline-block;//行内块级元素
```
右端固定，左端自适应，可以设置`margin-right`
`label`标签的`for`属性，可以和`input`标签绑定
了解下Sass

---
##### task3 三栏布局
##### 应用浮动来实现三栏布局 需要注意：
1. 两侧栏应用浮动。
2. 中间栏需要放在浮动元素后面，否则当浏览器在解析div时会自动换行，这样在其后面的浮动元素也会跟着换行;另外，中间栏实际上两边是会被压住的，只不过把字显示在不被压住的地方，因此要让两边不被压住，可以设置margin-left和margin-right，其值就是两侧栏的宽度。
3. 使用浮动的元素，如果没有给宽高，且没有内容，那么是看不见的，同时也撑不起父元素的高度，解决办法，给父元素加上overflow:auto;使得其自动包含子元素，从而父元素有了实际的宽高。

---
##### task4 内容定位和居中
##### 应用position来实现div的居中定位和圆形div的定位
1. 定位方式:static(默认) fixed absolute relative
2. 父级元素为fixed absolute relative这三种定位的一种时，其子元素定位absolute是相对于父级进行的，否则是相对body进行的
3. 利用margin负值实现水平居中和垂直居中定位
4. div大小随内容而变化时，采用CSS3的transform:translateX(-50%) translateY(-50%)可以实现水平垂直定位
5. 绝对定位会删除元素在文档流中的位置，元素变成浮动。相对定位的元素也是浮动的，但是它依旧占据它原来的位置，并不会删除在文档流中的位置。

---
##### task10 Flex布局
##### 弹性盒模型，任何一个元素都可以指定为flex。display:flex/inline-flex。一个父级元素指定为f\lex之后，其子元素为其项目
1. 容器的属性
<p>flex-direction 主轴的方向</p>
<p>flex-wrap 是否换行</p>
<p>flex-flow  direction flow的缩写形式</p>
<p>justify-content 主轴方向的排列方式</p>
<p>align-items 侧轴方向的排列方式</p>
<p>align-content 多轴时的对齐方式</p>
2. 项目的属性
<p>order 值越小排的越前，默认值为0，可以为负值</p>
<p>flex-grow 放大比例</p>
<p>flex-shrink 缩小比例</p>
<p>flex-basis 在分配多余空间时项目占据的大小</p>
<p>flex     是flex-grow flex-shrink flex-basis的缩写</p>
<p>align-self 可以覆盖align-items的属性</p>

