<template>
  <div class="info-dialog">
    <!-- 第一步-->

    <div class="infoma-header back-ye">
      <el-button icon="el-icon-back" type="primary" size="mini" @click="goBackYe"></el-button>
      <p>供应商注册</p>
      <p></p>
    </div>

    <!-- <div class="infoma-header">
      供应商
    </div>-->

    <div class="button">
      <el-button
        type="primary"
        @click="buttonClick(item.id)"
        size="mini"
        :class="index==indexActive?'active':''"
        v-for="(item,index) in  buttons"
        :key="index"
        :disabled="isButton"
      >{{item.name}}</el-button>
    </div>
    <template v-if="indexActive==0">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        align="left"
        label-width="160px"
        class="demo-ruleForm"
        :rules="rules"
        :disabled="isLook"
      >
        <div class="informa">供应商信息</div>

        <el-form-item label="供应商名称" ref="supplierName" prop="supplierName" style="width:33%">
          <el-input size="mini" v-model="ruleForm.supplierName"></el-input>
        </el-form-item>

        <el-form-item label="纳税人状态" ref="taxpayerType" prop="taxpayerType" style="width:33%">
          <el-select
            size="mini"
            v-model="ruleForm.taxpayerType"
            @change="changOptions"
            placeholder="请选择"
          >
            <el-option
              v-for="item in taxpayerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商星级" ref="supplierStar" prop="supplierStar" style="width:33%">
          <el-input size="mini" v-model="ruleForm.supplierStar" disabled></el-input>
        </el-form-item>

        <el-form-item
          label="营业期限"
          ref="licenseValidBegin"
          prop="licenseValidBegin"
          style="width:33%"
        >
          <el-date-picker
            @change="licenseValidBegin"
            v-model="times"
            size="mini"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="经营范围" ref="operateRange" prop="operateRange" style="width:33%">
          <el-input size="mini" v-model="ruleForm.operateRange"></el-input>
        </el-form-item>

        <el-form-item label="所在区域" ref="supplierInArea" prop="supplierInArea" style="width:33%">
          <el-input size="mini" v-model="ruleForm.supplierInArea"></el-input>
        </el-form-item>

        <el-form-item
          label="服务区域"
          class="operate"
          ref="supplierServiceregion"
          label-width="160px"
          prop="supplierServiceregion"
          style="width:33%;"
        >
          <el-cascader
            ref="cascaderAddr"
            size="mini"
            :options="optionsCity"
            :props="propsArea"
            clearable
            @change="suppChange"
            collapse-tags
            v-model="cityListBig"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="合作状态" ref="cooperateStatus" prop="cooperateStatus" style="width:33%">
          <el-select
            size="mini"
            v-model="ruleForm.cooperateStatus"
            @change="cooperChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cooperOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="供应商类别"
          ref="supplierSort"
          prop="supplierSort"
          class="supplierSort"
          style="width:33%"
        >
          <el-cascader
            size="mini"
            :options="optionsSort"
            :props="propsType"
            clearable
            v-model="ruleForm.supplierSort"
            @change="sortChange"
            collapse-tags
          ></el-cascader>
        </el-form-item>

        <el-form-item
          label="总部地址"
          ref="headquartersAddress"
          prop="headquartersAddress"
          style="width:33%"
        >
          <el-input size="mini" v-model="ruleForm.headquartersAddress"></el-input>
        </el-form-item>
        <el-form-item label="办公地址" ref="officeAddress" prop="officeAddress" style="width:33%">
          <el-input size="mini" v-model="ruleForm.officeAddress"></el-input>
        </el-form-item>

        <el-form-item
          label="企业注册地址"
          ref="establishmentRegisterAddress"
          prop="establishmentRegisterAddress"
          style="width:33%;"
        >
          <el-input size="mini" v-model="ruleForm.establishmentRegisterAddress"></el-input>
        </el-form-item>

        <el-form-item
          label="企业性质"
          style="width:33%"
          prop="establishmentNature"
          ref="establishmentNature"
          :class="[isClass?'establishmentNature':'establishmentNature-s']"
        >
          <el-select
            size="mini"
            v-model="ruleForm.establishmentNature"
            placeholder="请选择"
            @change="changEsOptions"
          >
            <el-option
              v-for="item in estabOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="isOther"
          label-width="0px"
          style="width:11%"
          class="establishmentNature-s-t"
          prop="establishmentNatures"
        >
          <el-input size="mini" placeholder="企业性质其他备注" v-model="ruleForm.establishmentNatures"></el-input>
        </el-form-item>

        <el-form-item
          label="企业状况"
          ref="establishmentStatus"
          prop="establishmentStatus"
          style="width:33%"
        >
          <!-- <el-input size="mini" v-model="ruleForm.establishmentStatus"></el-input> -->
          <el-select size="mini" v-model="ruleForm.establishmentStatus" placeholder="请选择">
            <el-option
              v-for="item in qiyezhuangkuang"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="官网地址" ref="webAddress" prop="webAddress" style="width:33%">
          <el-input size="mini" v-model="ruleForm.webAddress"></el-input>
        </el-form-item>

        <el-form-item
          label="企业成立日期"
          ref="establishmentFoundDate"
          prop="establishmentFoundDate"
          style="width:33%"
        >
          <el-date-picker
            v-model="ruleForm.establishmentFoundDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择企业成立日期"
            size="mini"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="员工人数" ref="peopleNum" prop="peopleNum" style="width:33%">
          <el-input
            type="number"
            :min="0"
            onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
            size="mini"
            v-model="ruleForm.peopleNum"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="办公面积"
          ref="offInput"
          class="offInput"
          prop="officeArea"
          style="width:33%"
        >
          <el-input
            size="mini"
            type="number"
            :min="0"
            onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
            v-model="ruleForm.officeArea"
          ></el-input>
          <span style="color:#606266;">m²</span>
        </el-form-item>

        <el-form-item label="是否为内部公司" ref="inside" prop="inside" style="width:33%">
          <el-radio-group
            type="kind"
            v-model="ruleForm.inside"
            style="margin-top:14px;"
            @change="insideChange"
          >
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否上市公司" ref="supplierListed" prop="supplierListed" style="width:33%">
          <el-radio-group
            type="kind"
            style="margin-top:14px;"
            v-model="ruleForm.supplierListed"
            @blur="insuppChange"
          >
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上市股票代码" ref="stockCode" prop="stockCode" style="width:33%">
          <el-input size="mini" v-model="ruleForm.stockCode"></el-input>
        </el-form-item>

        <el-form-item label="法定代表人" prop="ceoName" ref="ceoName" style="width:33%">
          <el-input size="mini" v-model="ruleForm.ceoName"></el-input>
        </el-form-item>

        <el-form-item
          label="注册资本"
          class="offInput"
          ref="registeredCapital"
          prop="registeredCapital"
          style="width:33%"
        >
          <el-input
            type="number"
            size="mini"
            :min="0"
            onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
            v-model="ruleForm.registeredCapital"
          >万元</el-input>
          <span style="color:#606266;">万元</span>
        </el-form-item>

        <el-form-item
          label-width="200px"
          label="营业执照号/统一信用代码"
          prop="supplierLicenseNumber"
          style="width:65%"
          class="suppli-num"
          ref="supplierLicenseNumber"
        >
          <el-radio-group type="kind" v-model="radioCredit" @change="icreditChange">
            <el-radio :label="1">统一社会信用代码</el-radio>
            <el-radio :label="2">营业执照编号</el-radio>
          </el-radio-group>
          <el-input
            size="mini"
            v-if="icredit"
            v-model="ruleForm.supplierLicenseNumber"
            placeholder=" 18位数字或字母"
            style="margin-left:20px"
          ></el-input>
          <el-input
            size="mini"
            v-if="!icredit"
            v-model="ruleForm.supplierLicenseNumber"
            placeholder="13-15位数字或字母"
            style="margin-left:20px"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="法定代表人身份证号码"
          ref="ceoId"
          label-width="170px"
          prop="ceoId"
          style="width:33%"
        >
          <el-input size="mini" v-model="ruleForm.ceoId"></el-input>
        </el-form-item>

        <el-form-item
          label="品牌描述  "
          ref="brandDescription"
          class="describe"
          prop="brandDescription"
          style="width:100%"
        >
          <el-input size="mini" v-model="ruleForm.brandDescription" type="textarea"></el-input>
        </el-form-item>

        <div class="informa" style="margin-bottom: 10px;">
          资质等级
          <el-button type="primary" size="mini" @click="addSupplier">新增</el-button>
        </div>
        <el-form-item style="width:100%" label-width="0px" v-if="isGrade">
          <p class="el-form-items-p" style="padding-left:5px">
            资质等级:无
            <span>（提示：如无资质需要选择，请继续填写下方信息）</span>
          </p>
        </el-form-item>

        <div
          v-for="(item,index) in ruleForm.supplierQualifications"
          :key="item.id"
          style="width: 100%; display: flex; flex-wrap: wrap;"
        >
          <el-form-item
            label="资质名称"
            ref="spName"
            :prop="'supplierQualifications.' + index + '.spName'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spName"></el-input>
          </el-form-item>
          <el-form-item
            label="资质证书编号"
            ref="spNumber"
            :prop="'supplierQualifications.' + index + '.spNumber'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spNumber"></el-input>
          </el-form-item>
          <el-form-item
            label="资质证书有效期"
            ref="spDate"
            :prop="'supplierQualifications.' + index + '.spDate'"
            style="width:33%"
          >
            <el-date-picker
              v-model="item.spDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择资质证书有效期"
              size="mini"
            ></el-date-picker>
          </el-form-item>
          <!-- <div>还剩多少天</div> -->
          <el-form-item
            label="级别"
            ref="spLevel"
            :prop="'supplierQualifications.' + index + '.spLevel'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spLevel"></el-input>
          </el-form-item>
          <el-form-item
            label="可承接范围"
            ref="spLimit"
            :prop="'supplierQualifications.' + index+ '.spLimit'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spLimit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              style="height: 28px; margin: auto;"
              @click="deleteSupplier(index)"
            >删除</el-button>
          </el-form-item>
          <div class="regis-xian"></div>
        </div>

        <div class="informa">
          股东
          <el-button type="primary" size="mini" @click="addShare">新增</el-button>
        </div>

        <div
          class="shar-box"
          style=" display: flex"
          v-for="(item,index) in  ruleForm.shareholderList"
          :key="'gd'+index"
        >
          <el-form-item
            :label="`股东${(index + 1)}`"
            ref="sharName"
            :prop="'shareholderList.' + index+ '.sharName'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.peopleName"></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号"
            ref="peopleIdCode"
            :prop="'shareholderList.' + index+ '.peopleIdCode'"
            style="width:33%;margin:0 50px"
          >
            <el-input size="mini" v-model="item.peopleIdCode"></el-input>
          </el-form-item>
          <el-form-item style="width:33%">
            <el-button
              type="primary"
              style="height:28px;margin:auto"
              size="mini"
              @click="deleteShare(index)"
            >删除</el-button>
          </el-form-item>
        </div>

        <div class="informa">联系信息</div>
        <div class="informaT">主要联系人</div>
        <div
          v-for="(item,index ) in ruleForm.supplierPeopleList"
          :key="'lxr'+index"
          style="width:100%; display:flex; flex-wrap:wrap;  "
        >
          <template v-if="item.peopleType=='1'" style="width:100%">
            <el-form-item
              label="主联系人"
              ref="peopleName"
              :prop="'supplierPeopleList.' + index + '.peopleName'"
              style="width:33%"
              :rules="[
                { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                ]"
            >
              <el-input size="mini" v-model="item.peopleName"></el-input>
            </el-form-item>
            <el-form-item
              label="手机号"
              ref="peopleCellPhone"
              :prop="'supplierPeopleList.' + index + '.peopleCellPhone'"
              style="width:33%"
              :rules="[{ required: true, message: '请输入联系人手机号', trigger: 'blur' },
                {
                  pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                  message: '手机号格式不对',
                  trigger: 'blur'
                }
              ]"
            >
              <el-input size="mini" v-model="item.peopleCellPhone"></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              ref="peoplePhone"
              :prop="'supplierPeopleList.' + index + '.peoplePhone'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peoplePhone"></el-input>
            </el-form-item>
            <el-form-item
              label="个人邮箱"
              ref="peopleEmail"
              :prop="'supplierPeopleList.' + index + '.peopleEmail'"
              style="width:33%"
              :rules="[{required: true, message: '请输入联系人邮箱', trigger: 'blur' }]"
            >
              <el-input size="mini" v-model="item.peopleEmail"></el-input>
            </el-form-item>

            <el-form-item
              label="职位"
              ref="peoplePosition"
              :prop="'supplierPeopleList.' + index + '.peoplePosition'"
              style="width:33%"
              :rules="[{ required: true, message: '请输入联系人职位', trigger: 'blur' }]"
            >
              <el-input size="mini" v-model="item.peoplePosition"></el-input>
            </el-form-item>
          </template>
        </div>

        <div class="informaT">
          联系人
          <el-button type="primary" size="mini" @click="addContacts">新增</el-button>
        </div>
        <div
          v-for="(item,index) in ruleForm.supplierPeopleList"
          :key="'lxr666'+index"
          style="width:100%; display:flex; flex-wrap:wrap;  "
        >
          <template v-if="item.peopleType==='2'">
            <el-form-item
              :label="`联系人${(index)}`"
              ref="phone"
              :prop="'supplierPeopleList.' + index + '.phone'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peopleName"></el-input>
            </el-form-item>
            <el-form-item
              label="手机号"
              ref="peopleCellPhone"
              :prop="'supplierPeopleList.' + index + '.peopleCellPhone'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peopleCellPhone"></el-input>
            </el-form-item>
            <el-form-item
              label="电话"
              ref="peoplePhone"
              :prop="'supplierPeopleList.' + index + '.peoplePhone'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peoplePhone"></el-input>
            </el-form-item>
            <el-form-item
              label="个人邮箱"
              ref="peopleEmail"
              :prop="'supplierPeopleList.' + index + '.peopleEmail'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peopleEmail"></el-input>
            </el-form-item>
            <el-form-item
              label="职位"
              ref="peoplePosition"
              :prop="'supplierPeopleList.' + index + '.peoplePosition'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peoplePosition"></el-input>
            </el-form-item>
            <el-form-item label prop="desc" style="width:33%">
              <el-button
                type="primary"
                style="height:28px;margin:auto"
                size="mini"
                @click="deleteContacts(index)"
              >删除</el-button>
            </el-form-item>
            <div class="regis-xian"></div>
          </template>
        </div>

        <div class="informa">关联母公司信息</div>
        <el-form-item label="有无关联母公司" prop="isParentCompany" style="width:100%">
          <el-radio-group
            type="kind"
            style="margin-top:14px;"
            v-model="ruleForm.isParentCompany"
            @change="inparChange"
          >
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="isParentCompanys">
          <el-form-item label="关联母公司名称" prop="parentCompanyName" style="width:45%">
            <el-select
              size="mini"
              v-model="ruleForm.parentCompanyName"
              @change="CompanyNameChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in CompanyNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法定代表人" prop="parentCompanyCeo" style="width:45%">
            <el-input size="mini" disabled v-model="ruleForm.parentCompanyCeo"></el-input>
          </el-form-item>

          <el-form-item
            label="注册地址"
            prop="parentCompanyRegisterAddress"
            label-width="160px"
            style="width:41.6%"
          >
            <el-input size="mini" disabled v-model="ruleForm.parentCompanyRegisterAddress"></el-input>
          </el-form-item>

          <el-form-item
            label="营业执照号/统一社会信用代码"
            label-width="200px"
            prop="parentCompanyLicenseNumber"
            style="width:33%"
          >
            <el-input size="mini" disabled v-model="ruleForm.parentCompanyLicenseNumber"></el-input>
          </el-form-item>
        </template>

        <div class="informa">备注</div>

        <el-form-item label-width="0px" class="desc" prop="desc" style="width:100%;height:130px">
          <el-input
            size="mini"
            v-model="ruleForm.supplierRemark1"
            class="infor-textarea"
            type="textarea"
          ></el-input>
        </el-form-item>

        <div class="oneButton" v-if="btnHidden">
          <el-button type="primary" size="mini" @click="preservation('ruleForm') ">保存</el-button>
          <el-button type="primary" size="mini" @click="preservation('ruleForm', 'next') ">下一步</el-button>
        </div>
      </el-form>
    </template>

    <template v-if="indexActive==1">
      <el-form
        :disabled="isLook"
        align="left"
        label-width="10px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <div class="informa">
          外部业绩信息
          <el-button type="primary" size="mini" @click="addKpi">新增</el-button>
        </div>

        <div
          v-for="(item,index) in kpiForm"
          :key="'yj'+index"
          style="width: 100%; display: flex; flex-wrap: wrap; "
        >
          <el-form-item label="合作单位名称" label-width="160px" style="width:45%">
            <el-input size="mini" v-model="item.performanceCooperationCompany"></el-input>
          </el-form-item>

          <el-form-item label="合作项目" label-width="160px" style="width:45%">
            <el-input size="mini" v-model="item.performanceCooperationItem"></el-input>
          </el-form-item>

          <el-form-item label="项目规模" label-width="160px" style="width:45%">
            <el-input size="mini" v-model="item.performanceCooperationSize"></el-input>
          </el-form-item>

          <el-form-item label="合作范围" label-width="160px" style="width:45%">
            <el-input size="mini" v-model="item.performanceCooperationRange"></el-input>
          </el-form-item>
          <el-form-item label="合作区域" label-width="160px" style="width:45%">
            <el-input size="mini" v-model="item.performanceCooperationRegion"></el-input>
          </el-form-item>

          <el-form-item class="offInputs" label="合作额度" label-width="160px" style="width:45%">
            <el-input size="mini" class="offInput" v-model="item.performanceCooperationAmount"></el-input>
            <span style="color:#606266;">万元</span>
          </el-form-item>

          <el-button type="primary" size="mini" @click="deleteKpi(index)" style="height:28px">删除</el-button>

          <el-form-item label="合作附件" label-width="160px" style="width:50%">
            <el-upload
              class="upload-demo parentkpi"
              :action="uploadAction"
              :data="hzFileData"
              :on-preview="handlePreviews"
              :on-remove="(file, fileList)=> handleRemoves(file, fileList, index)"
              :on-success="(res, file, fileList)=> fileKpisucc(res, file, fileList, index)"
              :on-error="fileKpierror"
              multiple
              :limit="300"
              :file-list="item.fileKpi"
            >
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <div class="regis-xian"></div>
        </div>
        <div class="informa">内部业绩信息</div>
        <el-form-item label="内部业绩信息:" label-width="160px" style="width:100%">无</el-form-item>

        <div class="oneButton" v-if="btnHidden">
          <el-button type="primary" size="mini" @click="goBack">上一步</el-button>
          <el-button type="primary" size="mini" @click="preservation('kpi') ">保存</el-button>
          <el-button type="primary" size="mini" @click="preservation('kpi', 'next') ">下一步</el-button>
        </div>
      </el-form>
    </template>

    <template v-if="indexActive==2">
      <el-table
        size="mini"
        :data="tableForm"
        border
        style="width: 96%; margin-bottom: 20px; margin-left: 2%;"
      >
        <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
        <el-table-column prop="spName" label="名称" width="240" align="center"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-upload
              :disabled="isLook"
              :action="uploadAction"
              list-type="picture-card"
              :auto-upload="true"
              :data="uploadData2"
              :on-success="(res, file, fileList)=>onChangeFile2(res, file, fileList,scope.row.id)"
              ref="uploadFile"
              :file-list="scope.row.fileList2"
            >
              <i slot="default">点击上传</i>
              <div slot="file" slot-scope="{file}">
                <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt /> -->
                <div
                  style="font-size:12px;  display: flex;
                   justify-content: center;flex-wrap:wrap;    height: 100%;
                    align-items: center;"
                >{{file.name}}</div>
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabledImg"
                    class="el-upload-list__item-delete"
                    @click="handleDownloadImg(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabledImg"
                    class="el-upload-list__item-delete"
                    @click="removeFile2(file,scope.$index)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </template>
        </el-table-column>
        <!-- 图片放大弹窗 -->

        <el-table-column label="查看示例" width="240">
          <template slot-scope="scope">
            <el-button
              type="primary"
              :disabled="isLook"
              size="mini"
              @click="seeClick(scope.row.id)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="示例图片" :visible="isSee" width="33%" :before-close="handleClose">
        <img style="width:100%;height:100%" alt :src="seeImageUrl" />
      </el-dialog>

      <div class="oneButton" v-if="btnHidden">
        <el-button type="primary" :disabled="isLook" size="mini" @click="goBack">上一步</el-button>

        <el-button type="primary" :disabled="isLook" size="mini" @click="preservation('table') ">保存</el-button>

        <el-button
          type="primary"
          :disabled="isLook"
          size="mini"
          @click="preservation('table', 'next') "
        >下一步</el-button>
      </div>
      <span
        v-if="indexActive==2"
        style="color:#CC3333;display:block;text-align:center;"
      >（上面名称附件可以上传多个）</span>
    </template>
    <template v-if="indexActive==3">
      <div class="informa">
        银行信息
        <el-button type="primary" size="mini" @click="addBank">新增</el-button>
      </div>
      <el-form
        :disabled="isLook"
        align="left"
        label-width="120px"
        class="demo-ruleForm"
        ref="ruleMoney"
      >
        <div
          v-for="(pro, index) in moeneyForm"
          :key="'444'+ index"
          style="width: 100%; display: flex; flex-wrap: wrap; "
        >
          <el-form-item label="开户行类型" label-width="160px" required style="width:45%">
            <el-select size="mini" v-model="pro.bankOpenName" placeholder="请选择">
              <el-option
                v-for="item in bankOpenOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户行" label-width="160px" required style="width:45%">
            <el-select size="mini" v-model="pro.bankName" placeholder="请选择">
              <el-option
                v-for="item in bankOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <input
            @change="radioChange(index)"
            :checked="pro.bankDefault == 'Y'"
            type="radio"
            class="radioClass"
            :id="'zhId' + index"
            name="radio"
          />
          <label :for="'zhId' + index">默认</label>
          <!-- <el-radio v-model="" type="radio" name="radio" label="Y">默认</el-radio> -->
          <el-form-item label="银行账户" label-width="160px" required style="width:45%">
            <el-input size="mini" v-model="pro.bankNumber" :value="pro.bankNumber"></el-input>
          </el-form-item>
          <el-form-item label="币种" label-width="160px" required style="width:45%">
            <el-select size="mini" v-model="pro.bankCurrency" placeholder="请选择">
              <el-option
                v-for="item in currencyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="mini" style="height: 28px;" @click="delectBank(index) ">删除</el-button>
          <div class="regis-xian"></div>
        </div>
        <p class="moneyP">重要声明：本公司确认以上信息真实有效，无虚假欺诈情况，否则一切后果由本公司负责！</p>
        <div class="oneButton" v-if="btnHidden">
          <el-button size="mini" type="primary" @click="goBack">上一步</el-button>

          <el-button type="primary" size="mini" @click="preservation('ruleMoney') ">保存</el-button>

          <el-button
            type="primary"
            size="mini"
            @click="preservation('ruleMoney', 'next', 'over') "
          >完成提交</el-button>
        </div>
      </el-form>
    </template>
  </div>
</template>

<script>
import base from "../api/base";
import citylist from "../utils/commit";
import itemCenter from "../components/itemCenter";
export default {
  data() {
    return {
      status: '',
      zizhiFileDelect: [], // 资质证照
      zizhiFileAdd: [], //
      blacklistCode: "", // 黑名单编号
      blackToQzCode: "", // 黑名单转潜在编号
      changeList: [], // 变更历史列表
      hzFileData: {
        fileType: "16",
        headCode: "",
        fileDescription: "",
      },
      qiyezhuangkuang: [
        {
          value: "异常",
        },
        {
          value: "在营",
        },
        {
          value: "注销",
        },
      ], //企业状况
      pgShow: false, // 评估详情
      pgData: [],
      shenpiList: [], // shenpi list
      rukuShow: false,
      dyList: [], //单元list
      scForm: {
        supplierCode: "",
        supplierExamineOpinion: "",
        supplierSort: "",
        supplierCostCenter: "",
        supplerScheduleStatus: "1",
      },
      zhuanTitle: "",
      btnHidden: true,
      scShow: false,
      zztShow: false,
      icredit: true,
      isButton: true,
      isLook: false,
      seeimgList: [
        {
          id: 1,
          src:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          id: 2,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 3,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 4,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 5,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 6,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 7,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 8,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 9,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 10,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
        {
          id: 11,
          src:
            "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1594630667&di=0f4b6a36daeb24637dbafff95a7ba266&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
        },
      ],
      isSee: false,
      uploadData2: {
        productCode: "",
        fileType: "2",
      },
      seeImageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      // 发送验证码
      buttonName: "发送短信",
      isDisabled: false,
      dialogSee: false,
      disabledImg: false,
      seeImg: "",
      time: 60,
      // : JSON.parse(JSON.stringify(treeData)),
      treeData: [],
      AmountList: [],
      count: 1,
      isClass: true,

      // 控制步骤
      indexActive: 0,
      uploadAction: base.fileUpload,
      kpiForm: [
        {
          performanceCooperationAmount: "",
          performanceCooperationCompany: "",
          performanceCooperationItem: "",
          performanceCooperationRange: "",
          performanceCooperationRegion: "",
          performanceCooperationSize: "",
          supplierCode: "",
          fileKpi: [],
          dealFileCode: "",
        },
      ],

      tableForm: [
        {
          id: 1,
          spType: "1",
          spName: "营业执照/统一社会信用代码",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 2,
          spType: "2",
          spName: "增值税纳税人申请认定表",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 3,
          spType: "3",
          spName: "上年审计报告或年营业额证明文件",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 4,
          spType: "4",
          spName: "安全生产许可证",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 5,
          spType: "5",
          spName: "生产经营许可证",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 6,
          spType: "6",
          spName: "资质等级证书",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 7,
          spType: "7",
          spName: "管理体系认证",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 8,
          spType: "8",
          spName: "认证或是荣誉证书",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 9,
          spType: "9",
          spName: "供方名称变更单（工商局盖章版）",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 10,
          spType: "10",
          spName: "联系人社保证明",
          fileList2: [],
          delectZZ: [],
        },
        {
          id: 11,
          spType: "11",
          spName: "其他附件",
          fileList2: [],
          delectZZ: [],
        },
      ],
      moeneyForm: [
        {
          bankCurrency: "",
          bankName: "",
          bankNumber: "",
          bankOpenName: "",
          supplierCode: "",
          bankDefault: "Y",
        },
      ],

      isGrade: true,
      isOther: false,
      // 禁用单选
      radioCredit: 1,
      propsArea: { multiple: true, checkStrictly: true, emitPath: false },
      propsType: {
        multiple: true,
        children: "nodeList",
        label: "name",
        value: "id",
      },
      isParentCompanys: true,
      sso_sessionid: '',

      buttons: [
        {
          id: 1,
          name: "基本信息",
        },
        {
          id: 2,
          name: "业绩信息",
        },
        {
          id: 3,
          name: "资质证照",
        },
        {
          id: 4,
          name: "银行信息",
        },
      ],
      optionsSort: [],
      optionsCity: [],
      // 验证码
      byStr: "111",
      cityListBig: [],
      times: [],
      ruleForm: {
        // 备注
        supplierRemark1: "",
        brandDescription: "",
        ceoId: "",
        ceoName: "",
        cooperateStatus: "",

        createdDate: "",
        establishmentFoundDate: "",
        establishmentNatures: "",
        establishmentNature: "",
        establishmentRegisterAddress: "",
        establishmentStatus: "在营",
        headquartersAddress: "",
        inside: "N",

        isParentCompany: "N",
        licenseValidBegin: "",
        licenseValidEnd: "",
        officeAddress: "",
        officeArea: "",
        operateRange: "",
        parentCompanyCeo: "",
        parentCompanyLicenseNumber: "",
        parentCompanyName: "",
        parentCompanyRegisterAddress: "",
        peopleNum: "",
        registeredCapital: "",
        stockCode: "",

        supplierInArea: "",
        supplierLicenseNumber: "",
        supplierListed: "N",
        supplierLogin: {
          slCode: ''
        },
        supplierServiceregion: "",
        supplierSort: "",
        supplierStar: "",
        supplierStatus: "",
        supplierType: "33",
        taxpayerType: "",
        webAddress: "",
        supplierName: "",
        shareholderList: [
          {
            peopleName: "",
            peopleIdCode: "",
            peopleType: "3",
          },
        ],
        supplierPeopleList: [
          {
            createdDate: "",
            peopleCellPhone: "",
            peopleEmail: "",
            peopleName: "",
            peoplePhone: "",
            peoplePosition: "",
            peopleType: "1",
          },
        ],
        supplierQualifications: [],
      },
      // 银行验证
      rulesMoney: {
        bankNumber: [
          { required: true, message: "请输入银行账户", trigger: "blur" },
        ],
        bankCurrency: [
          { required: true, message: "请输入选择币种", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请选择开户行", trigger: "blur" },
        ],
        bankOpenName: [
          { required: true, message: "请选择开户行类型", trigger: "blur" },
        ],
      },
      // 验证规则

      rules: {
        supplierListed: [
          { required: true, message: "请选择是否上市", trigger: "change" },
        ],
        supplierSort: [
          {
            required: true,
            message: "请输入选中的供应商类别",
            trigger: "change",
          },
        ],
        establishmentNatures: [
          { required: true, message: "请输入企业性质", trigger: "blur" },
        ],
        establishmentNature: [
          { required: true, message: "请选择企业性质", trigger: "change" },
        ],
        taxpayerType: [
          { required: true, message: "请选择纳税人状态", trigger: "change" },
        ],
        supplierServiceregion: [
          { required: true, message: "请选择服务区域", trigger: "change" },
        ],
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        operateRange: [
          { required: true, message: "请输入供应商范围", trigger: "blur" },
        ],

        cooperateStatus: [
          { required: true, message: "请输入合作状态", trigger: "change" },
        ],
        headquartersAddress: [
          { required: true, message: "请输入总部地址", trigger: "blur" },
        ],
        establishmentRegisterAddress: [
          { required: true, message: "请输入企业注册地址", trigger: "blur" },
        ],

        peopleNum: [
          { required: true, message: "请输入员工人数", trigger: "blur" },
        ],

        supplierLicenseNumber: [
          {
            required: true,
            message: "请选择营业执照号或统一信用代码",
            trigger: "blur",
          },
          {
            min: 13,
            max: 18,
            message: "请输入13位到18位的数字或字母",
            trigger: "blur",
          },
        ],
        registeredCapital: [
          { required: true, message: "请输入注册资金", trigger: "blur" },
        ],
        ceoId: [
          { required: true, message: "请输入代表人身份证号", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
            trigger: "blur",
          },
        ],
        ceoName: [
          { required: true, message: "请输入法定代表人", trigger: "blur" },
        ],

        inside: [
          { required: true, message: "请选择是否内部公司", trigger: "change" },
        ],

        peopleName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        peopleCellPhone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
        ],
        peopleEmail: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" },
        ],
        peoplePosition: [
          { required: true, message: "请输入联系人职务", trigger: "blur" },
        ],

        officeArea: [
          { required: true, message: "请输入办公面积", trigger: "blur" },
        ],

        supplierInArea: [
          { required: true, message: "请输入所在区域", trigger: "blur" },
        ],
        licenseValidBegin: [
          { required: true, message: "请输入开始日期", trigger: "change" },
        ],
        licenseValidEnd: [
          { required: true, message: "请输入结束日期", trigger: "change" },
        ],
      },
      CompanyNameOptions: [
        {
          value: "公司",
          label: "公司",
        },
      ],
      cooperOptions: [
        {
          value: "合作中",
          label: "合作中",
        },
        {
          value: "终止合作",
          label: "终止合作",
        },
        {
          value: "未合作",
          label: "未合作",
        },
      ],
      currencyOptions: [
        {
          value: "人民币",
          label: "人民币",
        },
        {
          value: "美元",
          label: "美元",
        },
        {
          value: "英镑",
          label: "英镑",
        },
      ],
      bankOptions: [
        {
          value: "中国银行",
          label: "中国银行",
        },
        {
          value: "工商银行",
          label: "工商银行",
        },
        {
          value: "农业银行",
          label: "农业银行",
        },
        {
          value: "建设银行",
          label: "建设银行",
        },
        {
          value: "邮政储蓄银行",
          label: "邮政储蓄银行",
        },
        {
          value: "交通银行",
          label: "交通银行",
        },
        {
          value: "招商银行",
          label: "招商银行",
        },
        {
          value: "浦发银行",
          label: "浦发银行",
        },
        {
          value: "中信银行",
          label: "中信银行",
        },
        {
          value: "光大银行",
          label: "光大银行",
        },
        {
          value: "民生银行",
          label: "民生银行",
        },
        {
          value: "广发银行",
          label: "广发银行",
        },
      ],
      bankOpenOptions: [
        {
          value: "国内",
          label: "国内",
        },
        {
          value: "国外",
          label: "国外",
        },
      ],
      taxpayerOptions: [
        {
          value: "增值税一般纳税人",
          label: "增值税一般纳税人",
        },
        {
          value: "增值税小规模纳税人",
          label: "增值税小规模纳税人",
        },
      ],
      estabOptions: [
        {
          value: "国有企业",
          label: "国有企业",
        },

        {
          value: " 中外合资企业",
          label: " 中外合资企业",
        },
        {
          value: "外商独资企业",
          label: "外商独资企业",
        },
        {
          value: "私营企业",
          label: "私营企业",
        },

        {
          value: "其他",
          label: "其他",
        },
      ],
      value: "",
      supplierCode: "",
      getCodesterType: "",
      changeOldData: {},
      updateRemark: "",
      updateHeadCode: "",
      changeOldKpi: [],
      changeOldBank: [],
      changeOldQua: [],
      delectKpi: [],
    };
  },
  watch: {
    "ruleForm.supplierQualifications.length": {
      handler(n, o) {
        if (n <= 0) {
          this.isGrade = true;
        } else {
          this.isGrade = false;
        }
      },
    },
  },
  mounted() {
    //   89f8c8b0-df87-4bda-b6ab-9044c0e59feb
    var hash = window.location.hash;
    console.log('==================' + hash);
    var index = hash.indexOf('code');
    var typeIndex = hash.indexOf('type');
    var statusIndex = hash.indexOf('status');
    if(index!= -1){
        this.ruleForm.supplierLogin.slCode = hash.substring(index + 5, hash.length);
    } else {
        this.ruleForm.supplierLogin.slCode = '';
    }
    if(typeIndex!= -1){
        var type = hash.substring(typeIndex + 5, hash.indexOf('code=')-1);
    } else {
        var type = '';
    }
    if(statusIndex!= -1){
        this.status = hash.substring(statusIndex + 7, statusIndex + 8);
    } else {
        this.status = 'N';
    }
    console.log(this.status, hash, )
    this.optionsCity = citylist;
    this.inparChange(); // 有无关联母公司
    this.getsuppType(); // 供应商类别
    if(this.status == 'Y'){
      this.getCodester();
      this.isButton = false;
    }
    // this.isButton = false;
    if (type == "look") {
      this.isButton = false;
      this.isLook = true;
    }
  },
  methods: {
    goBackYe() {
      window.location.href = "about:blank";
      window.close();
    },
    buttonClick(id) {
      this.indexActive = id - 1;
      console.log(id);
      switch (id) {
        case 1:
          this.getCodester();
          break;
        case 2:
          this.getKpi();
          break;
        case 3:
          this.supplierQualifications();
          break;
        case 4:
          this.getMoney();
          break;
      }
    },
    licenseValidBegin(value) {
      this.ruleForm.licenseValidBegin = value[0];
      this.ruleForm.licenseValidEnd = value[1];
    },
    // 资质证照
    removeFile2(file, id) {
      console.log(file, id);
      var form = this.tableForm;
      for (var i in form[id].fileList2) {
        if (form[id].fileList2[i].serviceCode == file.serviceCode) {
          form[id].delectZZ.push(file);
          form[id].fileList2.splice(i, 1);
        }
      }
      let params = file.serviceCode;
      this.api.deleteDelSupplie(this.sso_sessionid, params).then((res) => {
        this.$message.success("删除成功！");
      });
    },
    onChangeFile2(res, file, fileList, id) {
      this.tableForm[id - 1].fileList2.push({
        name: file.name,
        serviceCode: file.response.message,
      });
    },
    // 统一社会信用代码
    icreditChange(value) {
      if (value == "1") {
        this.icredit = true;
      } else {
        this.icredit = false;
      }
    },
    // 字母公司
    CompanyNameChange() {},
    //删除图片
    handleRemoveImg(file) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
      for (const i in this.fileList) {
        if (this.fileList[i].key === file.uid) {
          this.fileList.splice(i, 1);
        }
      }
    },
    uploadAvatar(item) {
      const formData = new FormData();
      formData.append("file", item.file);
      const uid = item.file.uid;
      console.log(item);
    },
    // 下载图片
    handleDownloadImg(file) {
      console.log(file);
      console.log("下载图片");
      var a = document.createElement("a");
      a.download = file.name; // 设置图片地址
      a.href = file.url;
      a.click();
    },
    handleClose() {
      this.isSee = false;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPng) {
        this.$message.error("上传图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isPng) && isLt2M;
    },
    handleRemove(file, fileList) {
      for (const i in this.picList) {
        if (this.picList[i].key === file.uid) {
          this.picList.splice(i, 1);
        }
      }
    },

    /**
     * 清空上传组件
     */
    emptyUpload() {
      const mainImg = this.$refs.upload;
      if (mainImg) {
        if (mainImg.length) {
          mainImg.forEach((item) => {
            item.clearFiles();
          });
        } else {
          this.$refs.upload.clearFiles();
        }
      }
    },

    changeAmoun(file, filelist) {
      console.log(file);
      console.log(file);
    },
    // 供应商类别
    getsuppType() {
      this.api.outRequestTree().then((res) => {
        var data = res.data.data.data.nodeList[0].nodeList;
        for (var i in data) {
          if (data[i].nodeList.length == 0) {
            delete data[i].nodeList;
          } else {
            var list = data[i].nodeList;
            for (let j in list) {
              var list2 = list[j].nodeList;
              if (list2.length == 0) {
                delete list[j].nodeList;
              } else {
                for (let k in list2) {
                  var list3 = list2[k].nodeList;
                  if (list3.length == 0) {
                    delete list2[k].nodeList;
                  }
                }
              }
            }
          }
        }
        this.optionsSort = data;
      });
    },

    fileKpisucc(res, file, fileList, index) {
      if (fileList.length > 0) {
        var arr = [];
        var str = "";
        for (var i in fileList) {
          if (fileList[i].response) {
            var code = fileList[i].response.message;
          } else {
            var code = fileList[i].code;
          }
          arr.push(code);
        }
        this.kpiForm[index].dealFileCode = arr.join(",");
        this.kpiForm[index].fileKpi = fileList;
      }
      //文件上传成功的回调
    },
    fileKpierror(file) {
      console.log(file);
      console.log("文件上传shibai的回调");
      // this.fileKpi.push({

      // })
    },

    surTime() {
      var list = this.ruleForm.supplierQualifications;
      for (let i in list) {
        var date = new Date(list[i].spDate);
        var diff = date.getTime() - Date.now();
        var days = parseInt(diff / (1000 * 60 * 60 * 24));
        console.log(days);
      }
    },
    // 选择服务区域
    suppChange(event) {
      console.log(event);
      this.ruleForm.supplierServiceregion = event;
    },
    // 选择供应商类别
    sortChange(event) {
      console.log(event);
      this.ruleForm.supplierSort = event;
    },
    // 选择供应商类别
    sortChangeSc(event) {
      console.log(event);
      this.scForm.supplierSort = event;
      this.ruleForm.supplierSort = event;
    },
    // 资质证照 查看示例
    seeClick(id) {
      this.isSee = true;
      let list = this.seeimgList;
      this.seeImageUrl = list[id - 1].src;
    },
    handleRemoves(file, fileList, index) {
      if (!file.code) {
        file.code = file.response.message;
      }
      if (!this.kpiForm[index].yejiFileDelect) {
        this.kpiForm[index].yejiFileDelect = [];
      }
      this.kpiForm[index].yejiFileDelect.push(file);
      this.kpiForm[index].fileKpi = fileList;
      if (fileList.length > 0) {
        var arr = [];
        for (var i in fileList) {
          var code = fileList[i].code || fileList[i].response.message;
          arr.push(code);
        }
        this.kpiForm[index].dealFileCode = arr.join(",");
      } else {
        this.kpiForm[index].dealFileCode = "";
      }
    },
    handlePreviews(file) {
      console.log(file);
    },
    // beforeRemoves(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    //企业类型
    changEsOptions(value) {
      this.ruleForm.establishmentNature = value;
      if (value == "其他") {
        this.isOther = true;
        this.isClass = false;
      } else {
        this.isOther = false;
        this.isClass = true;
      }
    },
    //纳税
    changOptions(value) {
      this.ruleForm.taxpayerType = value;
    },
    cooperChange(value) {
      this.ruleForm.cooperateStatus = value;
    },
    //内部公司
    insideChange(value) {
      console.log(value);
      this.ruleForm.inside = value;
    },
    // 上市公司
    insuppChange(value) {
      console.log(value);
      this.ruleForm.supplierListed = value;
    },
    // 子母公司
    inparChange(value) {
      this.ruleForm.isParentCompany = value || this.ruleForm.isParentCompany;
      if (this.ruleForm.isParentCompany === "Y") {
        this.isParentCompanys = true;
      } else {
        this.isParentCompanys = false;
      }
    },
    // 新增资质等级
    addSupplier() {
      let list = this.ruleForm.supplierQualifications;
      list.push({
        spLevel: "",
        spLimit: "",
        spName: "",
        spNumber: "",
        spType: "0",
        createdDate: "",
        // createdDate: Date.now(),
      });
      console.log(this.ruleForm.supplierQualifications);
    },
    // 删除资质等级
    deleteSupplier(id) {
      let list = this.ruleForm.supplierQualifications;
      list.splice(id, 1);
      console.log(this.ruleForm.supplierQualifications);
    },
    // 股东
    addShare() {
      this.ruleForm.shareholderList.push({
        peopleName: "",
        peopleIdCode: "",
        peopleType: "3",
      });
    },
    deleteShare(id) {
      let list = this.ruleForm.shareholderList;
      list.splice(id, 1);
    },
    // 联系人
    addContacts() {
      let list = this.ruleForm.supplierPeopleList;
      console.log(list);
      list.push({
        createdDate: Date.now(),
        peopleCellPhone: "",
        peopleEmail: "",
        peopleName: "",
        peoplePhone: "",
        peoplePosition: "",
        peopleType: "2",
      });
    },
    deleteContacts(id) {
      let list = this.ruleForm.supplierPeopleList;
      list.splice(id, 1);
      console.log(this.ruleForm.supplierPeopleList);
    },
    // 新增银行信息
    addBank() {
      this.moeneyForm.push({
        bankCurrency: "",
        bankName: "",
        bankNumber: "",
        bankOpenName: "",
        supplierCode: this.supplierCode,
        bankDefault: "N",
      });
    },
    // 删除银行信息
    delectBank(index) {
      if (this.moeneyForm.length > 1) {
        this.moeneyForm.splice(index, 1);
      } else {
        this.$message.error("最少一组保留银行信息");
      }
    },
    // 新增外部信息
    addKpi() {
      let list = this.kpiForm;
      list.push({
        performanceCooperationAmount: "",
        performanceCooperationCompany: "",
        performanceCooperationItem: "",
        performanceCooperationRange: "",
        performanceCooperationRegion: "",
        performanceCooperationSize: "",
        dealFileCode: "",
        fileKpi: [],
      });
      console.log(list);
    },
    deleteKpi(id) {
      let list = this.kpiForm;
      //
      if (list[id].performanceCode) {
        this.delectKpi.push(list[id]);
        this.changeOldKpi.splice(id, 1);
      }
      list.splice(id, 1);
    },

    // 上一步
    goBack() {
      this.indexActive -= 1;
      if (this.indexActive == 0) {
        this.indexActive = 0;
      }
      this.buttonClick(Number(this.indexActive) + 1);
    },
    // 保存
    preservation(type, ifGo, over) {
      if (type == "ruleForm") {
        this.saveInfo(type, ifGo);
      } else if (type == "kpi") {
        this.saveYeJi(type, ifGo);
      } else if (type == "table") {
        this.saveZiZhi(type, ifGo);
      } else if (type == "ruleMoney") {
        this.savebank(type, ifGo, over);
      }
    },
    // 保存基本信息
    saveInfo(type, ifGo) {
      this.$refs[type].validate((valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.ruleForm));
          var city = params.supplierServiceregion;

          if (typeof city == "string") {
            params.supplierServiceregion = city;
          } else {
            var citylist = "";
            for (let i in city) {
              if (i != city.length - 1) {
                // citylist = city[i].join("-") + "," + citylist;
                citylist = city[i] + "," + citylist;
              } else {
                // citylist = citylist + city[i].join("-");
                citylist = citylist + city[i];
              }
            }
            params.supplierServiceregion = citylist;
          }

          var supp = params.supplierSort;
          var sortArr = [];
          for (let j in supp) {
            sortArr.push(supp[j].join("_"));
          }
          params.supplierSort = sortArr.join(",");
          console.log(params.supplierSort);
          // return false;
          if (this.ruleForm.establishmentNature == "其他") {
            params.establishmentNature = params.establishmentNatures;
          } else {
            params.establishmentNature = params.establishmentNature;
          }
          if (!params.supplierCode) {
            params.supplierCode = this.supplierCode;
          }
          for (var sp = params.supplierPeopleList.length - 1; sp > -1; sp--) {
            console.log(params.supplierPeopleList[sp]);
            if (params.supplierPeopleList[sp].peopleType == 3) {
              params.supplierPeopleList.splice(sp, 1);
            }
          }
          for (var p = 0; p < params.shareholderList.length; p++) {
            if (
              params.shareholderList[p].peopleName &&
              params.shareholderList[p].peopleIdCode
            ) {
              params.supplierPeopleList.push(params.shareholderList[p]);
            }
          }
          for (var p = 0; p < params.supplierQualifications.length; p++) {
            console.log(params.supplierQualifications[p]);
            if (
              params.supplierQualifications[p].spName &&
              params.supplierQualifications[p].spDate &&
              params.supplierQualifications[p].spNumber
            ) {
            } else {
              this.$message.error("资质等级中名称、编号、有效期为必填项！");
              return false;
            }
          }
          this.api.addSuppierInfo(params).then((res) => {
            if (res.data.returnCode == 0) {
              this.supplierCode = res.data.message
                .split(",")[0]
                .split("supplierCode:")[1];
              this.hzFileData.headCode = this.supplierCode;// 合作附件
              let loginCode = res.data.message
                .split(",")[1]
                .split("loginCode:")[1];
              // 登录用户CODE
              sessionStorage.setItem("loginCode", loginCode);
              if (!ifGo) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              } else {
                this.indexActive = 1;
                this.buttonClick(Number(this.indexActive) + 1);
              }
            } else {
              this.$message({
                message: "请将信息填写完整",
                type: "warning",
              });
            }
          });
        } else {
          this.$message({
            message: "请将信息填写完整",
            type: "warning",
          });
          return false;
        }
      });
    },
    // 保存业绩信息
    saveYeJi(type, ifGo) {
      // 业绩信息
      let params = this.kpiForm;
      for (let i in params) {
        params[i].supplierCode = this.supplierCode;
      }
      this.api.addKpi(this.sso_sessionid, params).then((res) => {
        if (!ifGo) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.indexActive = 2;
          this.buttonClick(Number(this.indexActive) + 1);
        }
      });
    },
    // 保存资质证照
    saveZiZhi(type, ifGo) {
      // 表格
      let table = this.tableForm;
      var arr1 = [];
      for (let i in table) {
        if (table[i].spType == "1") {
          if (table[i].fileList2.length == 0) {
            this.$message.error("营业执照相关附件不能为空！");
            return;
          }
        }
        let list = table[i].fileList2;
        for (let j in list) {
          var params = {
            spSeverFileCode: list[j].serviceCode,
            spType: table[i].spType,
            spName: table[i].spName,
            supplierCode: this.supplierCode,
          };
          arr1.push(params);
        }
      }
      this.api.addlicence(this.sso_sessionid, arr1).then((res) => {
        if (!ifGo) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.indexActive = 3;
          this.buttonClick(Number(this.indexActive) + 1);
        }
      });
    },
    // 保存银行信息
    savebank(type, ifGo, over) {
      let params = this.moeneyForm;
      // 添加	供应商code
      for (var i in params) {
        params[i].supplierCode = this.supplierCode;
        params[i].supplierStatus = "1";
        if (!params[i].bankOpenName) {
          this.$message.error("开户行类型不能为空！");
          return false;
        }
        if (!params[i].bankName) {
          this.$message.error("开户行不能为空！");
          return false;
        }
        if (!params[i].bankNumber) {
          this.$message.error("银行账户不能为空！");
          return false;
        }
        if (!params[i].bankCurrency) {
          this.$message.error("币种不能为空！");
          return false;
        }
      }
      if (over) {
        var submit = "Y";
      } else {
        var submit = "N";
      }
      this.api.addMoney(this.sso_sessionid, params, submit).then((res) => {
        if (!ifGo) {
          this.$message({
            message: "提交成功",
            type: "success",
          });
        } else {
          window.location.href = "about:blank";
          window.close();
        }
      });
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },

    // 请求接口 渲染数据
    // 资质证书
    supplierQualifications() {
      this.api
        .getQualificationBySupplierCode(this.sso_sessionid, {
          supplierCode: this.supplierCode,
        })
        .then((res) => {
          var data = res.data.data;
          if (data.length > 0) {
            for (var k in this.tableForm) {
              this.tableForm[k].fileList2 = [];
            }
            for (var i in data) {
              for (var j in this.tableForm) {
                if (data[i].SP_TYPE == this.tableForm[j].spType) {
                  this.tableForm[j].spCode = data[i].SP_CODE;
                  this.tableForm[j].fileList2.push({
                    name: data[i].FILE_NAME,
                    serviceCode: data[i].SP_SEVER_FILE_CODE,
                  });
                }
              }
            }
          }
        });
    },
    // 根据供应商code查询业绩信息
    getKpi() {
      let params = this.supplierCode;
      this.api.getKpi(this.sso_sessionid, params).then((res) => {
        var data = res.data.data;
        if (data.length <= 0) {
          this.kpiForm = [
            {
              performanceCooperationAmount: "",
              performanceCooperationCompany: "",
              performanceCooperationItem: "",
              performanceCooperationRange: "",
              performanceCooperationRegion: "",
              performanceCooperationSize: "",
              supplierCode: "",
              fileKpi: [],
              dealFileCode: "",
            },
          ];
        } else {
          this.kpiForm = [];
          var t = 0;
          this.kpiForm.push(data[0]);
          this.kpiForm[t].fileKpi = [];
          if (data[0].fileName) {
            this.kpiForm[t].fileKpi.push({
              name: data[0].fileName,
              code: data[0].dealFileCode,
            });
          }
          for (var i in data) {
            if (i != data.length - 1) {
              var s = Number(i) + 1;
              if (data[i].performanceId == data[s].performanceId) {
                if (data[s].fileName) {
                  this.kpiForm[t].fileKpi.push({
                    name: data[s].fileName,
                    code: data[s].dealFileCode,
                  });
                }
              } else {
                t++;
                this.kpiForm.push(data[s]);
                this.kpiForm[t].fileKpi = [];
                if (data[s].fileName) {
                  this.kpiForm[t].fileKpi.push({
                    name: data[s].fileName,
                    code: data[s].dealFileCoder,
                  });
                }
              }
            }
          }
        }
      });
    },
    // 根据code获取供应商基本信息
    getCodester() {
      var _this = this;
      let params = {
        loginCode: this.ruleForm.supplierLogin.slCode
      };
      this.api.getSupplierByLogin(params).then((res) => {
        this.supplierCode = res.data.data.supplier[0].supplierCode;
        this.ruleForm = Object.assign(
          this.ruleForm,
          res.data.data.supplier[0]
        );
        this.ruleForm.shareholderList = [];
        for (var i in res.data.data.supplierPeople) {
          if (res.data.data.supplierPeople[i].peopleType == "3") {
            this.ruleForm.shareholderList.push(
              res.data.data.supplierPeople[i]
            );
          }
        }
        if (this.ruleForm.shareholderList.length == 0) {
          this.ruleForm.shareholderList.push({
            peopleName: "",
            peopleIdCode: "",
            peopleType: "3",
          });
        }
        this.ruleForm.supplierPeopleList = res.data.data.supplierPeople;
        this.ruleForm.supplierQualifications =
          res.data.data.supplierQualifications;
        // 所属单元
        this.scForm.supplierCostCenter =
          res.data.data.supplier[0].supplierCostCenter;
        // 营业期限
        this.times.push(
          res.data.data.supplier[0].licenseValidBegin,
          res.data.data.supplier[0].licenseValidEnd
        );
        // 城市回显
        if (res.data.data.supplier[0].supplierServiceregion) {
          var city = res.data.data.supplier[0].supplierServiceregion.split(
            ","
          );
        } else {
          var city = "";
        }
        if (city) {
          if (city.length > 0) {
            for (var c = 0; c < city.length; c++) {
              city[c] = city[c].split("-");
            }
          }
        }
        this.cityListBig = city;
        this.ruleForm.supplierServiceregion = city;

        // 供应商类别回显
        if (res.data.data.supplier[0].supplierSort) {
          var lb = res.data.data.supplier[0].supplierSort.split(",");
          if (lb.length > 0) {
            for (var b = 0; b < lb.length; b++) {
              lb[b] = lb[b].split("_");
            }
          }
          this.ruleForm.supplierSort = lb;
          this.scForm.supplierSort = lb;
        } else {
          this.ruleForm.supplierSort = "";
          this.scForm.supplierSort = "";
        }
      })
    },
    // 根据code获取银行信息
    getMoney() {
      let params = this.supplierCode;
      this.api.getMoney(this.sso_sessionid, params).then((res) => {
        if (res.data.data.length <= 0) {
          this.moeneyForm = [
            {
              bankCurrency: "",
              bankName: "",
              bankNumber: "",
              bankOpenName: "",
              supplierCode: "",
              bankDefault: "Y",
            },
          ];
        } else {
          if (res.data.returnCode == 0) {
            this.moeneyForm = res.data.data;
          }
        }
      });
    },
    // 开户行
    radioChange(index) {
      this.moeneyForm[index].bankDefault = "Y";
      for (var i in this.moeneyForm) {
        if (i != index) {
          this.moeneyForm[i].bankDefault = "N";
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "../assets/utils.less";
.dialogPg {
  .el-dialog {
    padding-bottom: 20px;
    margin-top: 5vh !important;
    .el-dialog__header {
      padding: 10px;
      .el-dialog__headerbtn .el-dialog__close {
        margin-top: 5px;
        margin-right: -8px;
      }
    }
    .el-input__inner {
      width: 100%;
    }
  }
}
.info-dialog {
  width: 1200px;
  margin: 4px auto;
  min-height: 100vh;
  background: #ffffff;
  .el-textarea__inner {
    width: 90%;
    margin: 20px auto;
    height: 100px;
  }
  .ruku {
    padding-bottom: 32px;
    .el-textarea__inner {
      width: 94%;
      margin: 0;
      height: 70px;
      float: left;
    }
  }
  .back-ye {
    .flex();
    align-items: center;
    .el-button--mini {
      font-size: 14px !important;
    }
  }
  .el-range-editor--mini {
    width: 230px !important;
    margin-top: 6px !important;
    .el-range-separator {
      width: 10% !important;
    }
    & input {
      width: 38% !important ;
    }
  }
  .el-list-enter-to {
    & > div {
      height: 100%;
    }
  }
  .suppli-num {
    .el-form-item__error {
      left: 300px;
    }
  }
  .is-ready {
    & > div {
      height: 100%;
    }
  }
  .el-upload--picture-card {
    background-color: @color !important;
    border: none !important;
  }
  .el-upload--picture-card i {
    font-size: 12px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-style: normal;
  }
  .establishmentNature {
    .el-input__inner {
      width: 230px;
    }
  }
  .establishmentNature-s {
    .el-input__inner {
      width: 100px;
    }
  }
  .establishmentNature-s-t {
    .el-input__inner {
      width: 130px;
    }
  }
  .el-upload--picture-card {
    width: 80px !important;
    height: 30px !important;
  }
  .el-upload-list__item {
    height: 30px !important;
    margin: 0px 8px 0px 0px !important;
  }
  .offInput {
    .el-input {
      width: auto !important;
    }
    .el-input__inner {
      width: 190px !important;
      margin-right: 10px;
    }
  }
  .offInputs {
    .el-input {
      width: auto !important;
    }
  }
  .parentkpi {
    .el-upload-list__item {
      margin-top: 7px !important;
    }
  }
  .el-cascader__tags {
    width: 100% !important;
  }

  .desc {
    textarea {
      resize: none;
    }
  }
  .describe {
    textarea {
      min-height: 30px;
      height: 50px;
      resize: none;
    }

    .el-form-item__content {
      height: 100% !important;
    }
    .el-textarea__inner {
      margin: 0px !important;
    }
    .el-input__inner {
      width: 1010px !important;
    }
  }
  .el-cascader {
    .el-input--suffix {
      width: 100%;
      margin: 6px 0;
    }
  }
  .upload-demo {
    display: flex;
  }
  .moneyP {
    color: #ff3a00;
    width: 100%;
    text-align: center;
    margin: 20px 0 16px 0;
  }
  .regis-xian {
    width: 98%;
    border-top: 1px dashed #d9d9d9;
    background: #dcdfe6;
    margin: 10px auto;
  }

  .oneButton {
    width: 100%;
    .flex(center);
    margin: 14px 0;
    & button {
      margin: 0 40px;
    }
  }
  .el-radio-group {
    display: flex;
    align-items: center;
  }
  .active {
    background: #66b1ff !important;
    border: 1px solid #66b1ff !important;
  }
  .infoma-header {
    background: #bbbbbb;
    padding: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  .el-form-item {
    margin-bottom: 8px;
    padding: 2px 0;
  }
  .operate {
    .el-form-item__content {
      margin-left: 0px !important;
      height: 100%;
    }
  }
  .el-form-item__content {
    display: flex;
    height: auto;
    & > label {
      margin: auto 20px;
    }
  }
  .button {
    padding: 10px !important;
  }
  .el-dialog__header {
    padding: 5px;
  }
  .el-form-items-p span {
    color: @color;
  }
  .el-dialog__headerbtn {
    top: 6px !important;
  }
  .supplierSort {
    .el-form-item__content {
      height: 100% !important;
    }
    .el-form-item__error {
      top: 94% !important;
    }
  }
  .el-dialog__body {
    padding: 0px !important;
  }
  .el-dialog__title {
    font-size: 16px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #000 !important;
  }
  .el-input__inner {
    width: 230px;
  }

  .informa {
    background: rgb(217, 217, 217);
    padding: 5px;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-form-item__error {
    top: 80% !important;
  }

  .informaT {
    background: rgb(242, 242, 242);
    padding: 5px;
    width: 100%;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
  }
  .el-form-item__label {
    float: left !important;
  }
  .demo-ruleForm {
    padding: 10px !important;
    display: flex;
    flex-wrap: wrap;
  }
  .radioClass {
    margin-top: 16px;
  }
  .radioClass + label {
    margin-top: 14px;
    font-size: 12px;
    margin-left: 6px;
  }
  .radioClass + label:hover,
  .radioClass:hover {
    cursor: pointer;
  }
}
</style>