<template>
  <div class="form-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <span>1.商品基本信息</span>
          <el-form-item label="商品分类" prop="name">
            <el-select v-model="value" placeholder="请选择一级类目">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择细分类目">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择细分类目">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型" prop="name">
            <el-radio v-model="radio" label="1">普通商品</el-radio>
            <el-radio v-model="radio" label="2">帮TA付商品</el-radio>
            <el-radio v-model="radio" label="3">普通/帮TA付商品</el-radio>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.desc" placeholder="请输入商品标题（50个字以内）"></el-input>
          </el-form-item>
          <el-form-item label="商品副标题" prop="name">
            <el-input v-model="ruleForm.desc" placeholder="请输入商品标题（50个字以内）"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="name">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <span>建议尺寸：800×800px，大小不超过5M的图片，拖拽图片可更换顺序。</span>
          </el-form-item>
          <el-form-item label="商品规格" prop="name">
            <el-link icon="el-icon-plus" @click="addType" type="primary" :underline="false">添加商品规格</el-link>
            <div class="specifications">
              <span>规格一：</span>
            </div>
          </el-form-item>
          <el-form-item label="原价" prop="name">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="name">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="赠送积分" prop="name">
            <el-input v-model="ruleForm.desc"></el-input>
            <span>填入数字，若设为X，则赠送用户积分为实付商品数项*X</span>
          </el-form-item>
          <el-form-item label="商品视频" prop="name">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <span>视频将在商品详情页展示</span>
          </el-form-item>
          <el-form-item label="商品库存" prop="name">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="商品详情" prop="name">
            <el-input v-model="ruleForm.desc" type="textarea" placeholder="商品详情为空" :rows="10"></el-input>
          </el-form-item>
          <span>2.商品物流服务</span>
          <el-form-item label="物流模板" prop="name">
            <el-select v-model="value" placeholder="请选择细分类目">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name">
            <el-button type="info" disabled>快递</el-button>
            <el-button type="info" plain disabled>EMS</el-button>
            <el-button type="info" plain disabled>平邮</el-button>
          </el-form-item>
          <el-form-item prop="name">
            <span>默认运费：包邮</span>
          </el-form-item>
          <span>3.售后信息设置</span>
          <el-form-item label="售后信息" prop="name">
            <el-checkbox v-model="checked">7天无理由退货</el-checkbox>
          </el-form-item>
          <span>4.商品其他信息</span>
          <el-form-item label="库存计数" prop="name">
            <el-radio v-model="radio" label="1">买家拍下减库存</el-radio>
          </el-form-item>
          <el-form-item label="上架时间" prop="name">
            <el-radio v-model="radio" label="1">立即上架</el-radio>
            <el-radio v-model="radio" label="2">定时上架</el-radio>
            <el-radio v-model="radio" label="3">放入仓库</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              保存
            </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: '添加商品',
    data() {
      return {
        radio: '1',
        ruleForm: {
          desc: ''
        },
        rules: {
        },
        dialogImageUrl: 'https://img.zcool.cn/community/0175295dd1793aa8012053c04deaee.png@2o.png',
        dialogVisible: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      addType(){
        alert(1)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        //this.dialogImageUrl = file.url;
        //this.dialogVisible = true;
      }
    },
  }
</script>
<style lang="scss" scope>
.specifications{
  border: 1px solid #f3f3f3;
  background: #f9f9f9;
  padding: 7px 20px;
}
</style>
