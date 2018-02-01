<template>
	<div class="item-filed">
		<div class="item-filed-item">
			<el-input v-model="filed.output" placeholder="输出字段" :disabled="filed.isdisabled">
			<el-checkbox v-model="filed.checked" @change="checkChange" slot="prepend"></el-checkbox>
		</el-input>
		</div>
		<div class="item-filed-item">
			<el-input v-model="filed.input" placeholder="输入字段" :disabled="filed.isdisabled"></el-input>
		</div>
			<div class="item-filed-item">
					<el-input v-model="filed.noneValue" placeholder="输入默认值" :disabled="filed.isdisabled"></el-input>
			</div>
			<!--<div class="item-filed-item">-->
					<!--<el-button type="primary" @click="del(id)">删除此行字段</el-button>-->
			<!--</div>-->
	</div>
</template>

<script>
export default {
  name: 'ItemFiledoralce',
  props: {
    filed: Object,
				id: '',
				otherInput: ''
  },
  methods: {
    checkChange (val) {
      val ? (this.filed.isdisabled = false) : (this.filed.isdisabled = true)
      this.$emit('checkChange', this.filed)
    },
				del (i) {
						this.otherInput.splice(i, 1)
				}
  }
}
</script>
<style>
.item-filed{
	display: flex;
}
.item-filed-item{
	flex: 1
}
</style>
