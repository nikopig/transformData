<template>
		<!--<div class="item-filed-other">-->
				<!--<div class="item-filed-item">-->
						<!--<el-input v-model="filed.input" placeholder="输入字段" :disabled="filed.isdisabled"></el-input>-->
				<!--</div>-->
				<!--<div class="item-filed-item">-->
						<!--<el-input v-model="filed.output" placeholder="输出字段" :disabled="filed.isdisabled"></el-input>-->
				<!--</div>-->
				<!--<div class="item-filed-item">-->
						<!--<el-input v-model="filed.defaultValue" placeholder="默认值" :disabled="filed.isdisabled"></el-input>-->
				<!--</div>-->
				<!--<div class="item-filed-item">-->
						<!--<el-button type="text" size="mini" @click="del(id)"><i class="el-icon-close"></i>删除</el-button>-->
				<!--</div>-->
		<!--</div>-->
		<common-row>
				<common-col>
						<span class="label">输入字段</span>
						<div class="content">
								<el-input v-model="filed.input" placeholder="输入字段" :disabled="filed.isdisabled"></el-input>
						</div>
				</common-col>
				<common-col>
						<span class="label">输出字段</span>
						<div class="content">
								<el-input v-model="filed.output" placeholder="输出字段"></el-input>
						</div>
				</common-col>
				<common-col>
						<span class="label">默认值</span>
						<div class="content">
								<el-input v-model="filed.defaultValue" placeholder="默认值"></el-input>
						</div>
				</common-col>
				<common-col>
						<div class="delete-box">
								<!--<el-button type="primary" icon=""></el-button>-->
								<el-button type="text" icon="el-icon-delete" size="mini" @click="del(id)"></el-button>
						</div>
				</common-col>
		</common-row>
</template>

<script>
		import commonRow from '@/common/components/common-row'
		import commonCol from '@/common/components/common-col'
		export default {
				name: 'ItemFiledOther',
				props: {
						filed: Object,
						id: '',
						otherInput: ''
				},
				components: {commonRow, commonCol},
				methods: {
						del (i) {
							console.log(this.otherInput)
								this.otherInput.splice(i, 1)
								if (this.otherInput.length === 0) {
										this.$emit('clear')
								}
						}
				}
		}
</script>
<style lang="less">
		.item-filed-other {
				display: flex;
		}

		.item-filed-item {
				padding: ;
				flex: 1;
				.el-input {
						width: 80%;
						max-width: 216px;
				}
		}
</style>
