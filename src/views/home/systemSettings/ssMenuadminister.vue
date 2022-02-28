<template>
  <!-- 系统设置>菜单管理 -->
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <div class="table_main">
          <div class="table_form">
            <div class="table_form_wrap">
              <div>
                <span>查询：</span>
                <el-input
                  size="small"
                  v-model="tableInput"
                  class="el_input"
                  clearable
                  placeholder="可输入账号名称或姓名来查询"
                  @input="handleTableSub(tableInput)"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="tables">
            <el-table
              :data="tableListOne"
              style="width: 100%"
              row-key="id"
              max-height="540"
              border
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column prop="id" align="center" label="菜单ID">
              </el-table-column>
              <el-table-column prop="menuName" align="center" label="菜单名称">
              </el-table-column>
              <el-table-column prop="menuType" align="center" label="菜单层级">
              </el-table-column>
              <el-table-column prop="sortNo" align="center" label="菜单优先级">
              </el-table-column>
              <el-table-column prop="parentId" align="center" label="父级菜单">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >修改</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- <new-pagination layout="total" :total="pagsOne.total"></new-pagination> -->
        </div>
        <el-dialog
          title="修改菜单信息"
          :visible.sync="editDialog"
          width="30%"
          :modal="false"
          :lock-scroll="false"
        >
          <el-form :model="DialogForm" label-width="110px">
            <el-form-item label="菜单ID：">
              <el-input
                v-model="DialogForm.id"
                @click.native="selectValue($event)"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜单名称：">
              <el-input
                disabled
                v-model="DialogForm.menuName"
                @click.native="selectValue($event)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜单层级：">
              <el-input
                disabled
                v-model="DialogForm.menuType"
                @click.native="selectValue($event)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜单优先级：">
              <el-input
                v-model="DialogForm.sortNo"
                @click.native="selectValue($event)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="菜单父级：">
              <el-input
                v-model="DialogForm.parentId"
                @click.native="selectValue($event)"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleEditOk">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuList, postUpdateMenu } from "@/api";
export default {
  data() {
    return {
      //分页
      pagsOne: {
        total: 1,
        size: 10,
        current: 1
      },
      tableListOne: [],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-09",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      list: [
        { bumc: "MDCB", ipstart: "123", bl: "20.01" },
        {
          bumc: "MDCB1",
          ipstart: "123",
          bl: "20123123123123123123123123123123123123"
        },
        { bumc: "MDCB2", ipstart: "123", bl: "20" },
        { bumc: "MDCB3", ipstart: "123", bl: "20" }
      ],
      //输入框
      tableInput: "",
      //修改弹出框显示/隐藏
      editDialog: false,
      // 修改弹窗存储数据的表单
      DialogForm: {
        id: "",
        menuName: "",
        menuType: "",
        sortNo: "",
        parentId: ""
      }
    };
  },
  created() {
    this.getAxios();
  },
  mounted() {},
  computed: {},
  methods: {
    //选定输入框,自动全选输入框内容
    selectValue(e) {
      console.log(e, "e");
      e.target.select();
    },
    getAxios() {
      getMenuList().then(res => {
        console.log(res, 1);
        if (res.state === "10000") {
          this.tableListOne = res.result;
          this.pagsOne.total = Number(res.pageTotal);
        } else {
          this.tableListOne = [];
          this.pagsOne.total = 0;
        }
      });
    },
    //输入框确定
    handleTableSub(name) {
      console.log(name);
      let data = {
        menuName: name
      };
      getMenuList(data).then(res => {
        console.log(res, 1);
        if (res.state === "10000") {
          this.tableListOne = res.result;
          this.pagsOne.total = Number(res.pageTotal);
        } else {
          this.tableListOne = [];
          this.pagsOne.total = 0;
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.editDialog = true;
      this.DialogForm = {
        id: row.id,
        menuName: row.menuName,
        menuType: row.menuType,
        sortNo: row.sortNo,
        parentId: row.parentId
      };
    },
    handleEditOk() {
      let data = {
        id: this.DialogForm.id,
        menuname: this.DialogForm.menuName,
        menutype: this.DialogForm.menuType,
        sortno: this.DialogForm.sortNo,
        parentid: this.DialogForm.parentId
      };
      postUpdateMenu(this.$qs.stringify(data)).then(res => {
        console.log(res);
        if (res.state === "10000") {
          this.$message.success("修改菜单信息成功,重新登录生效!");
          this.editDialog = false;
          this.getAxios();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table_main {
  width: 100%;
  height: 100%;
  .pages {
    width: 100%;
    text-align: center;
  }
}
</style>
