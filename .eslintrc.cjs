// @see: http://eslint.cn
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	/* 指定如何解析语法 */
	parser: 'vue-eslint-parser',
	/* 优先级低于 parse 的语法解析配置 */
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true
		}
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript/recommended',
		'@vue/eslint-config-prettier'
	],
	globals: {
		RouterConfig: 'readonly'
	},
	/*
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
	rules: {
		// eslint (http://eslint.cn/docs/rules)
		'no-var': 'error', // 要求使用 let 或 const 而不是 var
		'no-multiple-empty-lines': ['error', { max: 2 }], // 不允许多个空行
		'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
		'no-irregular-whitespace': 'off', // 禁止不规则的空白
		'prefer-const': 'off', // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		'no-empty': 'off', // 不允许空块语句

		// typeScript (https://typescript-eslint.io/rules)
		'@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
		'@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
		'@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
		'@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 @ts-ignore
		'@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
		'@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
		'@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
		'@typescript-eslint/no-empty-function': 'off', // 禁止空函数
		'@typescript-eslint/no-use-before-define': 'off', // 禁止在变量定义之前使用它们
		'@typescript-eslint/ban-ts-comment': 'off', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
		'@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
		'@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型
		// vue (https://eslint.vuejs.org/rules)
		'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
		'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
		'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
		'vue/multi-word-component-names': 'off', // 要求组件名称始终为多字
		'vue/no-setup-props-destructure': 'off', // 禁止解构props

		// prettierrc配置
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				semi: false,
				singleQuote: true,
				vueIndentScriptAndStyle: true
			}
		]
	}
}
