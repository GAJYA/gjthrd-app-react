module.exports = {
  // printWidth: 120, // 单行代码的最大长度
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 指定使用tab还是space缩进，true为tab
  semi: false, // 句尾添加分号
  singleQuote: true, // 使用单引号代替双引号
  quoteProps: 'as-needed', // 对象属性中key加引号的规则，as-needed:仅在需要的时候使用, consistent:有一个属性需要加引号，就都加, preserve:保留用户输入的情况
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSameLine: false, // 将多行元素(HTML, JSX, Vue, Angular)的'>',是否单独放一行
  arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  requirePragma: false, // 是否要注释来决定是否格式化代码，文件开头添加特殊注释，才会进行格式化，如：// @prettier或者// @format
  insertPragma: false, // 优先级比requirePragma低，可以通过在文件头部插入@format来标识此文件已格式化
  proseWrap: 'preserve', // 指定markdown文件折行方式，可选值："always|never|preserve"，默认值"preserve"，按照文件原样折行，allways：超出printWidth就折行，never：不折行
  htmlWhitespaceSensitivity: 'ignore', // 指定HTML、Vue、Angular和Handlebars的全局空白敏感性
  vueIndentScriptAndStyle: false, // 是否缩进Vue文件中<script>和<style>标签内的代码,比如import Vue from 'vue'这行代码
  endOfLine: 'lf', // 行尾换行样式，可选值"<auto|lf|crlf|cr>"
  singleAttributePerLine: true, // 会在HTML、Vue和JSX中强制执行每个属性独占一行。
}
