<template>
    <div class="add_form">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="IP地址">
                <el-input v-model="form.ip"></el-input>
            </el-form-item>
            <el-form-item label="归属">
                <el-select v-model="form.area" placeholder="请选择归属">
                    <el-option label="阿里云" value="1"></el-option>
                    <el-option label="景安" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="到期时间">
                <el-date-picker
                        v-model="form.exptime"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:hh:mm">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="开通时间">
                <el-date-picker
                        v-model="form.opentime"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:hh:mm">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.marsk"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-if="!isEdit">保存</el-button>
                <el-button type="primary" @click="save" v-if="isEdit">保存</el-button>
                <el-button @click="goBack">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {addServer,updateServer,getServer} from "@/async";

    export default {
        name: "add",
        data() {
            return {
                form: {
                    ip: '',
                    area: '',
                    exptime: '',
                    opentime : '',
                    marsk: ''
                }
            }
        },
        methods: {
            onSubmit() {
                addServer(this.form).then(res=>{
                    if (res.status == '201'){
                        this.$router.push('/server/lists');
                    }else{
                        this.$message.error('出错了');
                    }
                })
            },
            save : function(){
                updateServer(this.form).then(res=>{
                    if (res.status == '201'){
                        this.$router.push('/server/lists');
                    }else{
                        this.$message.error('出错了');
                    }
                })
            },
            goBack(){
                history.go(-1);
            },
            isEdit : function(){
                return this.$route.params.id;
            }
        },
        created : function(){
            if (this.isEdit()){
                getServer(this.$route.params.id).then(res=>{
                    this.form = res.data;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.add_form{
    width: 600px;
}
</style>