<template>
    <div>
		<component :is="cn" :index="config.index" :title="config.title">
			{{config.title}}
			<main-menu-item v-if="cn === 'ElSubmenu'"></main-menu-item>
		</component>
    </div>
</template>

<script>
	import mainMenuItem from './main-menu-item'
    export default {
        name: 'mainMenuItem',
        props: {
        	config: {
        		type: Object,
				default () {
        			return {
        				index: '1'
					}
				}
			}
		},
        components: {
			mainMenuItem
		},
        data () {
            return {
			}
        },
        computed: {
			cn () {
				let flag = !this.config.children || this.config.children.length <= 0
				return flag ? 'ElMenuItem' : 'ElSubmenu'
			}
		},
        methods: {},
        created () {
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
</style>
