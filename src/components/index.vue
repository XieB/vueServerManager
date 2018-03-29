<template>
    <div class="main">
        <div class="file_list" v-show="!editShow">
            <div class="search clear_fix">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm form fl" size="medium">
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-search" class="button fl">搜索</el-button>
            </div>
            <div class="parent_directory" v-if="path">
                <a href="javascript:;" @click="changeParent">
                    <i class="el-icon-news"></i>
                    返回上级目录
                </a>
            </div>
            <ul class="list_title clear_fix">
                <li>名称</li>
                <li>形式</li>
                <li>修改日期</li>
                <li>权限</li>
                <li>操作</li>
            </ul>
            <ul class="list clear_fix">
                <li class="clear_fix" v-for="(item,index) in lists.dirs">
                    <ul>
                        <li @click="changeDirectory(item.name)" class="directory">{{item.name}}</li>
                        <li><span class="el-icon-message" title="目录"></span></li>
                        <li>{{item.fmtime}}</li>
                        <li><span v-if="item.write">可写</span><span v-else class="no_write">不可写</span></li>
                        <li>
                            <template v-if="item.write">
                                <!--<el-button type="primary" icon="el-icon-edit" size="mini" title="修改"></el-button>-->
                                <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="del(item.name,index)"></el-button>
                            </template>
                            <template v-else>
                                <!--<el-button type="primary" icon="el-icon-edit" size="mini" title="修改" plain disabled></el-button>-->
                                <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" plain disabled></el-button>
                            </template>
                        </li>
                    </ul>
                </li>
                <li class="clear_fix" v-for="(item,index) in lists.files">
                    <ul>
                        <li>{{item.name}}</li>
                        <li><span class="el-icon-document" title="文件"></span></li>
                        <li>{{item.fmtime}}</li>
                        <li><span v-if="item.write">可写</span><span v-else class="no_write">不可写</span></li>
                        <li>
                            <template v-if="item.write">
                                <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="editFile(item.name)"></el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="del(item.name,index,false)"></el-button>
                            </template>
                            <template v-else>
                                <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" plain disabled></el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" plain disabled></el-button>
                            </template>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="edit" v-show="editShow">
            <textarea class="content" v-model="fileContent" @keyup.tab.prevent.stop="changexx"></textarea>
            <div class="action">
                <el-button type="success" @click="saveChange">保存</el-button>
                <el-button type="primary" @click="cancelChange">取消</el-button>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                ruleForm: {
                    name: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入文件名', trigger: 'blur' },
                    ],
                },

                path : '',
                lists : '',
                editShow : false,
                fileName : '',
                fileContent : '',
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            changeDirectory : function(dir){
                this.path += '/' + dir;
                this.getListData();
            },
            changeParent : function(){
                let index = this.path.lastIndexOf('\/');
                this.path = this.path.substring(0,index);
                this.getListData();
            },
            getListData : function(){
                this.$http.post('/',{path : this.path}).then(res => {
                    this.lists = res.data;
                })
            },
            del : function(name,index,directory =  true){
                this.$confirm('此操作将永久删除' + name + ', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/delete',{path : this.path,file : name}).then(res => {
                        if (res.data == '1'){
                            if (directory){
                                this.lists.dirs.splice(index,1);
                            }else{
                                this.lists.files.splice(index,1);
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    })
                }).catch(() => {

                });

            },
            editFile : function(fileNmae){
                this.fileName = fileNmae;
                this.$http.post('/edit',{path : this.path,file : this.fileName}).then(res =>{
                    this.fileContent = res.data;
                    this.editShow = true;
                })

            },
            cancelChange : function(){
                this.editShow = false;
            },
            saveChange : function(){
                this.$http.post('/save',{path : this.path,file : this.fileName,txt : this.fileContent}).then(res => {
                    if (res.data){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        setTimeout(()=>{
                            this.editShow = false;
                        },1000)
                    }else{
                        this.$message({
                            message: '出错了',
                            type: 'error'
                        });
                    }
                })
            },
            changexx : function(){
                console.log('xx');
            }
        },
        created : function(){
            this.getListData();
        },
    }
</script>

<style lang="less" scoped>
.main{
    width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;
    .file_list{
        .search{
            width: 600px;
            margin: 0 auto;
            padding-bottom: 20px;
            .form{
                width: 500px;
            }
            .button{
                height: 36px;
                margin-left: 11px;
            }
            .fl{
                float: left;
            }
        }
        .list_title{
            padding: 10px 0;
            color: #909399;
            li{
                width: 20%;
                text-align: center;
                float: left;
            }
        }
        .list{
            color: #606266;
            & > li{
                padding: 10px 0;
                border-top: 1px solid #ebeef5;
                background-color: #fff;
                transition: 0.3s background-color;
                &:hover{
                    background-color: #eee;
                }
                ul{
                    li{
                        width: 20%;
                        float: left;
                        text-align: center;
                        min-height: 1px;
                    }
                }
            }
        }
        .el-icon-message{
            color: #909399;
        }
        .el-icon-document{
            color: #67c23a;
        }
        .el-icon-message,.el-icon-document{
            font-size: 18px;
        }

        .parent_directory{
            text-decoration: underline;
            .el-icon-news{
                font-size: 20px;
                color: #409EFF;
                margin-left: 50px;
                vertical-align: middle;
            }
            a{
                color: #409EFF;
            }
        }
        .no_write{
            color: #F56C6C;
        }
        .directory{
            color: #409EFF;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .edit{
        .content{
            height: 600px;
            display: block;
            box-sizing: border-box;
            width: 1000px;
            margin: 0 auto;
            border:1px solid #eaeaea;
            padding: 10px;
        }
        .action{
            margin-top: 20px;
            text-align: center;
        }
    }
}
</style>