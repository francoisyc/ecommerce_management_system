<template>
  <div>

    <el-steps
      :active="activeIndex"
      finish-status="success"
    >
      <el-step
        title="第一步"
        description="基本信息"
      ></el-step>
      <el-step
        title="第二步"
        description="商品图片"
      >

      </el-step>
      <el-step
        title="第三步"
        description="商品内容"
      ></el-step>

    </el-steps>

    <el-tabs
      @tab-click="clickTab"
      v-model="activeName"
      tab-position="left"
    >
      <el-tab-pane
        name="one"
        label="基本信息"
      >
        <el-form
          ref="form"
          :model="addGoodsForm"
          label-width="80px"
        >
          <el-form-item label="商品名称">
            <el-input v-model="addGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addGoodsForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addGoodsForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addGoodsForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :props="defaultProps"
              :options="options"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio
              v-model="addGoodsForm.radio"
              :label="true"
            >是</el-radio>
            <el-radio
              v-model="addGoodsForm.radio"
              :label="false"
            >否</el-radio>
          </el-form-item>

        </el-form>
        基本信息
        <el-button
          type="primary"
          @click="next(2,'two')"
        >下一步</el-button>
      </el-tab-pane>
      <el-tab-pane
        name="two"
        label="商品图片"
      >
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :headers="headers"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
        <el-button
          type="primary"
          @click="next(3,'three')"
        >下一步</el-button>
      </el-tab-pane>
      <el-tab-pane
        name="three"
        label="商品内容"
      >
        <quill-editor
          v-model="addGoodsForm.goods_introduce"
          ref="myQuillEditor"
          :options="editorOption"
        ></quill-editor>
        <el-button
          type="primary"
          @click="addGoods"
        >确定</el-button>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components:{
    quillEditor
  },
  data() {
    return {
      activeIndex: 1,
      activeName: "one",
      addGoodsForm: {
        radio: "",
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_introduce: "",
        pics: [],
        goods_cat: []
      },
      options: [
        {
          value: "",
          label: "",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            }
          ]
        }
      ],
      defaultProps: {
        label: "cat_name",
        value: "cat_id"
      },
      dialogImageUrl: "",
      dialogVisible: false,
      headers:{
        Authorization:localStorage.getItem('token')
      },
      editorOption:{
        placeholder:''
      }
    };
  },
  created() {
    this.loadCatData();
  },
  methods: {
    clickTab(tab) {
      this.activeIndex = +tab.index + 1;
    },
    next(index, name) {
      (this.activeIndex = index), (this.activeName = name);
    },
    async loadCatData() {
      let res = await this.$http.get("categories", {
        params: {
          type: 3
        }
      });

      this.options = res.data.data;
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(res){
     this.addGoodsForm.pics.push({
       pic : res.data.tmp_path
     })
        
      },
      async addGoods(){
        const{ goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics} = this.addGoodsForm
        let res = await this.$http.post('goods',{
          goods_name,goods_cat:goods_cat.join(','),goods_price,goods_number,goods_weight,goods_introduce,pics
        })
        if(res.data.meta.status === 201){
          alert('添加商品成功');
          this.$router.push('/goods')
        }

      }
  }
};
</script>

<style>
.ql-container {
  height: 300px;
}
</style>