<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="IP地址"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ip }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="归属"
                    width="180">
                <template slot-scope="scope">
                    <el-tag size="medium" v-if="scope.row.area == '1'">阿里云</el-tag>
                    <el-tag size="medium" v-if="scope.row.area == '2'">景安</el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    label="到期时间"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.exptime }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="开通时间"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.opentime }}</span>
                </template>
            </el-table-column>


            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    label="备注">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.marsk }}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="button">
            <router-link to="/server/add">
                <el-button type="primary" size="medium">添加</el-button>
            </router-link>

        </div>
    </div>
</template>

<script>
    import {deleteServer,getServers} from "@/async";

    export default {
        name: "lists",
        data() {
            return {
                tableData : [],
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({path : `/server/${row.id}`});
            },
            handleDelete(index, row) {
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteServer(row.id).then(res=>{
                        if (res.status == '204'){
                            this.tableData.splice(index,1);
                        }else{
                            this.$message.error('出错了');
                        }
                    })
                }).catch(() => {

                });
            }
        },
        created : function(){
            getServers().then(res=>{
                // console.log(res);
                this.tableData = res.data;
            })
        }
    }
</script>

<style lang="less" scoped>
.button{
    margin: 20px 0 0 100px;
}
</style>