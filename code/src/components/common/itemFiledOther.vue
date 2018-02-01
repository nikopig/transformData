<template>
		<div class="item-filed-other">
				<div class="item-filed-item">
						<el-input v-model="filed.input" placeholder="输入字段" :disabled="filed.isdisabled"></el-input>
				</div>
				<div class="item-filed-item">
						<el-input v-model="filed.output" placeholder="输出字段" :disabled="filed.isdisabled">
						</el-input>
				</div>
				<div class="item-filed-item">
						<el-input v-model="filed.defaultValue" placeholder="默认值" :disabled="filed.isdisabled"></el-input>
				</div>
				<div class="item-filed-item">
						<el-button type="primary" @click="del(id)">删除此行字段</el-button>
				</div>
		</div>
</template>

<script>
		export default {
				name: 'ItemFiledOther',
				props: {
						filed: Object,
						id: '',
						otherInput: ''
				},
				methods: {
						del (i) {
								this.otherInput.splice(i, 1)
						}
				}
		}
</script>
<style>
		.item-filed-other {
				display: flex;
		}

		.item-filed-item {
				flex: 1
		}
</style>
