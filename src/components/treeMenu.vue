<template>
    <div>
<el-upload
　　name="multfile"    
　　class="avatar-uploader"
　　:action="updateUrl"   
　　:data="itemForm"  
　　:before-upload="beforeAvatarUpload" 
　　:on-success="handleAvatarSuccess"   
　　ref="newupload"
>
　　<el-button
　　　　slot="trigger"
　　　　size="small"
　　　　icon="el-icon-upload"
　　　　style="margin-top: 20px;"
　　>选择上传文件
　　</el-button>
　　<div slot="tip" class="el-upload__tip">
　　　　　只能上传jpg/png文件，且不超过500kb
　　 </div>
</el-upload>
 
<el-button type="primary" size="small" @click="submitBtn" style="width: 124px;"
>提 交</el-button>
 
    </div>
</template>

<script>
    export default {
        data(){
            return {
　　　　itemForm: {
　　　　//编辑时数据
　　　　　　token: sessionStorage.getItem('loginToken'),
　　　　　　id: 0,
　　　　　　user_name: '',
　　　　　　user_nike_name: '',
　　　　　　user_sex: 1, //默认 1男 0女
　　　　　　user_phone: '',
　　　　　　user_email: '',
　　　　　　head_img: ''
　　　　},
　　　　fd: '', //向服务器进行传递的参数（带有图片formdata）
　　　　updateUrl:"*"
　　}
        },
methods:{
　　//成功时保存一下后台给你返回的图片，可以渲染到页面上
　　handleAvatarSuccess(res, file) {
　　　　this.itemForm.head_img = URL.createObjectURL(file.raw)
　　},
　　//上传时，判断文件的类型及大小是否符合规则
　　beforeAvatarUpload(file) {
　　　　const isJPG =file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
　　　　const isLt2M = file.size / 1024 / 1024 < 2
　　　　if (!isJPG) {
　　　　　　this.$message.warning('上传头像图片只能是 JPG/PNG/GIF 格式!')
　　　　　　return isJPG
　　　　}
　　　　if (!isLt2M) {
　　　　　　this.$message.warning('上传头像图片大小不能超过 2MB!')
　　　　　　return isLt2M
　　　　}
　　　　this.multfileImg = file
　　　　return isJPG && isLt2M
　　　},
　　//点击提交按钮，向服务器传递你要传递的参数，涉及到formData　　
　　submitBtn() {
　　　　this.$refs.itemForm.validate(valid => {
　　　　　　if (valid) {
　　　　　　　　this.fd = new FormData()
　　　　　　　　this.fd.append('token', sessionStorage.getItem('loginToken')) //传其他参数
　　　　　　　　this.fd.append('id', this.itemForm.id)
　　　　　　　　this.fd.append('user_name', this.itemForm.user_name)
　　　　　　　　this.fd.append('user_nike_name', this.itemForm.user_nike_name)
　　　　　　　　this.fd.append('user_sex', this.itemForm.user_sex)
　　　　　　　　this.fd.append('user_phone', this.itemForm.user_phone)
　　　　　　　　this.fd.append('user_email', this.itemForm.user_email)
　　　　　　　　if (this.multfileImg != null) {
　　　　　　　　　　this.fd.append('multfile', this.multfileImg)
　　　　　　　　}
　　　　　　　　api.updateUserInfo(this.fd).then(res => {
　　　　　　　　　　if (res) {
　　　　　　　　　　　　this.$message({ showClose: true, type: 'success', message: '设置成功' })
　　　　　　　　　　　　this.initPage()
　　　　　　　　　　}
　　　　　　　　})
　　　　　　} else {
　　　　　　　　　　this.$message({
　　　　　　　　　　showClose: true,
　　　　　　　　　　type: 'error',
　　　　　　　　　　message: '请检查表单信息的正确性'
　　　　　　　　　　})
　　　　　　　　return false
　　　　　　}
　　　　})
　　
        
    }
}
    }
</script>

<style lang="less" scoped>

</style>