<template>
    <div class="common-tab-wraper common-container">
		<el-tabs v-model="activeName">
			<el-tab-pane label="失败记录" name="record">
				<Record></Record>
			</el-tab-pane>
			<el-tab-pane :disabled="true"></el-tab-pane>
			<el-tab-pane label="异常信息" name="exception">
				<Exception></Exception>
			</el-tab-pane>
		</el-tabs>
    </div>
</template>

<script>
	import Record from './failRecord'
	import Exception from './exceptioninfo'
    export default {
        name: 'log',
        props: [],
        components: {Record, Exception},
        data () {
            return {
				activeName: 'record'
			}
        },
        computed: {},
        methods: {},
        created () {
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
</style>
