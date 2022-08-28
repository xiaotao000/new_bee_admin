export interface ColumnProps {
	type: 'selection' | 'index' | 'expand'
	label: string
	prop: string
	width: string
	align: 'left' | 'center' | 'right'
	image: boolean
	link: boolean
	tag: boolean
}
