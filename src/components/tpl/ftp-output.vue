<template>
	<el-form ref="ftpOutput" :model="ftpOutput" label-width="100px" :rules="rules" label-position="right">
			<common-row>
					<common-col>
							<el-form-item label="数据类型" prop="datatype">
									<el-select v-model="ftpOutput.datatype" placeholder="请选择">
											<el-option label="TEXT" value="TEXT"></el-option>
											<el-option label="JSON" value="JSON"></el-option>
											<el-option label="XML" value="XML"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="数据分隔符" prop="separator">
									<el-input v-model="ftpOutput.separator"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="输出目录" prop="dir">
									<el-input v-model="ftpOutput.dir"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="IP" prop="url">
									<el-input v-model="ftpOutput.url"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="用户名" prop="username">
									<el-input v-model="ftpOutput.username"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="密码" prop="password">
									<el-input v-model="ftpOutput.password"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="数据编码"  prop="charset">
									<el-select v-model="ftpOutput.charset" placeholder="请选择数据库">
											<el-option label="GBK" value="GBK"></el-option>
											<el-option label="UTF8" value="UTF8"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="端口" prop="port">
									<el-input v-model="ftpOutput.port"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="文件名前缀" prop="prefix">
									<el-input v-model="ftpOutput.prefix"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="数据合并输出" prop="isArray">
									<el-select v-model="ftpOutput.isArray" placeholder="请选择">
											<el-option label="是" :value="true"></el-option>
											<el-option label="否" :value="false"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
					<common-col :lot="4">
						<el-form-item label="输出源字段" prop="cols">
							<el-input type="textarea" v-model="ftpOutput.cols"></el-input>
						</el-form-item>
					</common-col>
			</common-row>
		<!--
		<el-form-item label="保存文件名" prop="filename">
			<el-input v-model="ftpOutput.filename"></el-input>
		</el-form-item>
		-->
	</el-form>
</template>

<script>
import commonRow from '@/common/components/common-row'
import commonCol from '@/common/components/common-col'
export default {
  name: 'ftp-output',
  props: {
    ftpOutput: Object
  },
		components: {commonRow, commonCol},
  data () {
    return {
      rules: {
        username: [{ required: true, message: '请输入FTP用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入FTP密码', trigger: 'blur' }],
								prefix: [{ required: true, message: '请输入文件名前缀', trigger: 'blur' }],
        url: [{ required: true, message: '请输入FTP地址URL', trigger: 'blur' }],
        port: [{ required: true, message: '请输入FTP地址端口号', trigger: 'blur' }],
        dir: [{ required: true, message: '请输入保存文件目录', trigger: 'blur' }],
        datatype: [{ required: true, message: '请输入保存文件类型', trigger: 'blur' }],
        separator: [{ required: true, message: '请输入数据分隔符', trigger: 'blur' }],
        filename: [{ required: true, message: '请输入保存文件名', trigger: 'blur' }]
      }
    }
  }
}
</script>
