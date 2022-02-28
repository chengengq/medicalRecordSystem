<template>
  <!-- 字典设置>科室字典库>科室设置 -->
  <div class="main">
    <div class="main_wrap">
      <div class="main_wraps">
        <el-radio-group v-model="radio" @change="handleRadio">
          <el-radio-button label="1">门诊科室</el-radio-button>
          <el-radio-button label="2">住院科室</el-radio-button>
          <el-radio-button label="3">急诊科室</el-radio-button>
          <el-radio-button label="4">观察室</el-radio-button>
          <el-radio-button label="5">医技科室</el-radio-button>
        </el-radio-group>
        <div class="tree tree_left">
          <el-tree
            :props="defaultProps"
            :data="treeData"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :allow-drag="allowDrag"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => handleAdd(data.id)"
                >
                  增加
                </el-button>
                <el-button
                  :disabled="data.parentId == 0"
                  type="text"
                  size="mini"
                  @click="() => handleRemove(data.id)"
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => handleEdit(data)"
                >
                  编辑
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
        <div class="tree tree_right"></div>
        <!--新增/编辑子菜单对话框-->
        <el-dialog
          :title="dialogTitle + '子菜单'"
          :visible.sync="isAdddialog"
          width="30%"
        >
          <el-form
            ref="form"
            :model="addForm"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="科室编号" prop="fdeptbh">
              <el-input
                v-model="addForm.fdeptbh"
                @blur="handleDeptbhBlur"
              ></el-input>
            </el-form-item>
            <el-form-item label="科室名称" prop="fdept">
              <el-input
                v-model="addForm.fdept"
                @input="handleConvertingLetters"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="radio == 1" label="主任医生数" prop="fdocnum">
              <el-input v-model="addForm.fdocnum"></el-input>
            </el-form-item>
            <el-form-item v-if="radio != 1" label="病床数" prop="fbedsnum">
              <el-input v-model="addForm.fbedsnum"></el-input>
            </el-form-item>
            <el-form-item v-if="radio != 1" label="负责人" prop="fprincipal">
              <el-select
                v-model="addForm.fprincipal"
                ref="fprincipal"
                filterable
                placeholder="请选择"
                :filter-method="getDocList"
                style="width: 100%;"
              >
                <el-option
                  v-for="(item, index) in docList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  style="text-align: center"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.code
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="助记词" prop="fremember">
              <el-input v-model="addForm.fremember"></el-input>
            </el-form-item>
            <el-form-item label="是否录入" prop="fwrite">
              <el-switch
                v-model="addForm.fwrite"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="是否统计" prop="fstatis">
              <el-switch
                v-model="addForm.fstatis"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isAdddialog = false">取 消</el-button>
            <el-button type="primary" @click="handleAddandEditOk"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSettingDeptList,
  postAddSettingDept,
  postEditSettingDept,
  postDelSettingDept,
  getCheckDeptBh,
  getDoctorList,
  postUpdateDeptSettingSort
} from "@/api";
import pinyin from "js-pinyin";
export default {
  data() {
    return {
      radio: sessionStorage.radio,
      treeData: [],
      defaultProps: {
        label: "fdept"
      },
      addForm: {
        //父节点id
        fparentid: "",
        //科室编号
        fdeptbh: "",
        //科室名称
        fdept: "",
        //主任医生数
        fdocnum: 0,
        //病床数
        fbedsnum: 0,
        //负责人
        fprincipal: "",
        //助记词
        fremember: "",
        //是否录入
        fwrite: false,
        //是否统计
        fstatis: false
      },
      sort: {},
      // 当前节点id
      id: "",
      //打开/关闭弹窗
      isAdddialog: false,
      //   弹窗标题
      dialogTitle: "",
      //医生名称
      docList: [],
      rules: {
        fdeptbh: [
          { required: true, message: "请输入科室编号", trigger: "blur" }
        ],
        fdept: [{ required: true, message: "请输入科室名称", trigger: "blur" }],
        fdocnum: [
          { required: true, message: "请输入主任医生数", trigger: "blur" }
        ],
        fbedsnum: [
          { required: true, message: "请输入病床数", trigger: "blur" }
        ],
        fprincipal: [
          {
            required: true,
            message: "请选择负责人",
            trigger: ["blur", "change"]
          }
        ],
        fremember: [
          { required: true, message: "请输入助记词", trigger: "blur" }
        ]
      },
      startDept: {},
      endDept: {},
      type: ""
    };
  },
  created() {
    if (sessionStorage.radio) {
      this.radio = sessionStorage.radio;
    } else {
      this.radio = "1";
      sessionStorage.setItem("radio", "1");
    }
    this.getlist();
  },
  methods: {
    // 获取科室数据
    getlist() {
      let data = {
        type: this.radio
      };
      getSettingDeptList(data).then(res => {
        console.log("res", res);
        if (res.state === "10000") {
          this.treeData = res.result;
        } else {
          this.treeData = [];
        }
      });
    },
    //获取医生列表
    getDocList(val) {
      let data = {
        fremember: val
      };
      getDoctorList(data).then(res => {
        console.log(res, "医生");
        this.docList = [];
        if (res.state === "10000") {
          res.result.forEach((item, index) => {
            this.docList.push({
              label: item.docName,
              value: item.docId,
              code: item.fremember
            });
          });
        } else {
          this.docList = [];
        }
      });
    },
    //打开新增dialog
    handleAdd(id) {
      this.getDocList();
      console.log(id);
      this.addForm = {
        //父节点id
        fparentid: id,
        //科室编号
        fdeptbh: "",
        //科室名称
        fdept: "",
        //主任医生数
        fdocnum: 0,
        //病床数
        fbedsnum: 0,
        //负责人
        fprincipal: "",
        //助记词
        fremember: "",
        //是否录入
        fwrite: false,
        //是否统计
        fstatis: false
      };
      this.dialogTitle = "新增";
      this.isAdddialog = true;
    },
    //打开编辑dialog
    handleEdit(item) {
      this.getDocList();
      console.log(item);
      this.addForm = {
        fparentid: item.fparentid,
        //科室编号
        fdeptbh: item.fdeptbh,
        //科室名称
        fdept: item.fdept,
        //主任医生数
        fdocnum: item.fdocnum,
        //病床数
        fbedsnum: item.fbedsnum,
        //负责人
        fprincipal: item.fprincipal,
        //助记词
        fremember: item.fremember,
        //是否录入
        fwrite: item.fwrite == 0 ? false : true,
        //是否统计
        fstatis: item.fstatis == 0 ? false : true
      };
      this.dialogTitle = "编辑";
      this.id = item.id;
      this.isAdddialog = true;
    },
    //新增/编辑子节点
    handleAddandEditOk() {
      if (this.dialogTitle == "新增") {
        let data = {
          type: this.radio,
          fparentid: this.addForm.fparentid,
          //科室编号
          fdeptbh: this.addForm.fdeptbh,
          //科室名称
          fdept: this.addForm.fdept,
          //主任医生数
          fdocnum: this.addForm.fdocnum,
          //病床数
          fbedsnum: this.addForm.fbedsnum,
          //负责人
          fprincipal: this.addForm.fprincipal,
          //助记词
          fremember: this.addForm.fremember,
          //是否录入
          fwrite: this.addForm.fwrite ? 1 : 0,
          //是否统计
          fstatis: this.addForm.fstatis ? 1 : 0
        };
        //把新增子节点的parentId设置为获取到的节点id
        postAddSettingDept(this.$qs.stringify(data)).then(res => {
          if (res.state === "10000") {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            this.isAdddialog = false;
            this.addForm = {};
            this.getlist();
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        let datas = {
          type: this.radio,
          fid: this.id,
          //科室编号
          fdeptbh: this.addForm.fdeptbh,
          //科室名称
          fdept: this.addForm.fdept,
          //主任医生数
          fdocnum: this.addForm.fdocnum,
          //病床数
          fbedsnum: this.addForm.fbedsnum,
          //负责人
          fprincipal: this.addForm.fprincipal,
          //助记词
          fremember: this.addForm.fremember,
          //是否录入
          fwrite: this.addForm.fwrite ? 1 : 0,
          //是否统计
          fstatis: this.addForm.fstatis ? 1 : 0
        };
        postEditSettingDept(this.$qs.stringify(datas)).then(res => {
          if (res.state === "10000") {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.addForm = {};
            this.isAdddialog = false;
            this.getlist();
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    // 通过id删除节点
    handleRemove(id) {
      console.log(id);
      let data = { fid: id };
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postDelSettingDept(this.$qs.stringify(data)).then(res => {
            if (res.state === "10000") {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getlist();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看科号是否重复
    handleDeptbhBlur() {
      let data = {
        type: this.radio,
        fdeptbh: this.addForm.fdeptbh
      };
      getCheckDeptBh(data).then(res => {
        console.log(res, "查看科号是否重复");
        if (res.state === "10000") {
          this.$message.success("科室编号可正常使用");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //输入科室名称转换首字母
    handleConvertingLetters(val) {
      console.log(val);
      pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
      this.addForm.fremember = pinyin.getCamelChars(val);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("11", draggingNode, dropNode, dropType, ev);
      console.log(this.treeData, "treeData");
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(draggingNode, dropNode, dropType, ev);
      console.log(this.treeData, "treeData1");
      if (dropType == "before") {
        this.sort["type"] = this.radio;
        this.sort["fdeptbh"] = draggingNode.data.fdeptbh;
        this.sort["fparentid"] = dropNode.data.parentId;
        this.sort["status"] = dropType;
        this.sort["fsort"] = dropNode.data.fsort;
      } else if (dropType == "after") {
        this.sort["type"] = this.radio;
        this.sort["fdeptbh"] = draggingNode.data.fdeptbh;
        this.sort["fparentid"] = dropNode.data.parentId;
        this.sort["status"] = dropType;
        this.sort["fsort"] = dropNode.data.fsort + 1;
      } else {
        this.sort["type"] = this.radio;
        this.sort["fdeptbh"] = draggingNode.data.fdeptbh;
        this.sort["fparentid"] = dropNode.data.id;
        this.sort["status"] = dropType;
        this.sort["fsort"] = 1;
      }
      postUpdateDeptSettingSort(this.$qs.stringify(this.sort)).then(res => {
        console.log(res);
      });
      console.log(this.sort, "sort");
    },
    allowDrag(draggingNode) {
      return draggingNode.data.fdept.indexOf("全院") === -1;
    },
    handleRadio(val) {
      this.radio = val;
      sessionStorage.setItem("radio", this.radio);
      this.getlist();
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  width: 50%;
  height: 100%;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
