<template>
  <div class="info-dialog">
    <!-- 第一步-->

    <div class="infoma-header back-ye">
      <el-button icon="el-icon-back" type="primary" size="mini" @click="goBackYe"></el-button>
      <p>供应商信息</p>
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
          <el-select size="mini" v-model="ruleForm.supplierInArea" placeholder="请选择">
            <el-option
              v-for="item in quyuList"
              :key="item.DS_VALUE_CODE"
              :label="item.DS_VALUE_NAME"
              :value="item.DS_VALUE_CODE"
            ></el-option>
          </el-select>
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
              :key="item.DS_VALUE_CODE"
              :label="item.DS_VALUE_NAME"
              :value="item.DS_VALUE_CODE"
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

        <el-form-item label="推荐人" ref="supplierReferrer" style="width:33%">
          <el-input size="mini" v-model="ruleForm.supplierReferrer"></el-input>
        </el-form-item>

        <el-form-item label="推荐部门/单位" ref="supplierRecommendCompany" style="width:33%">
          <el-input size="mini" v-model="ruleForm.supplierRecommendCompany"></el-input>
        </el-form-item>

        <el-form-item label="" style="width:33%">
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
              :key="item.DS_VALUE_CODE"
              :label="item.DS_VALUE_NAME"
              :value="item.DS_VALUE_CODE"
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
          ref="officeArea"
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
          <el-select size="mini" v-model="ruleForm.inside" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="不是内部公司" value="0"></el-option>
            <el-option label="资产内部公司" value="1"></el-option>
            <el-option label="集团内部公司" value="2"></el-option>
          </el-select>
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
          v-for="(item,index) in ruleForm.supplierQualificationsList"
          :key="item.id"
          style="width: 100%; display: flex; flex-wrap: wrap;"
        >
          <el-form-item
            label="资质名称"
            ref="spName"
            :prop="'supplierQualificationsList.' + index + '.spName'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spName"></el-input>
          </el-form-item>
          <el-form-item
            label="资质证书编号"
            ref="spNumber"
            :prop="'supplierQualificationsList.' + index + '.spNumber'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spNumber"></el-input>
          </el-form-item>
          <el-form-item
            label="资质证书有效期"
            ref="spDate"
            :prop="'supplierQualificationsList.' + index + '.spDate'"
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
            :prop="'supplierQualificationsList.' + index + '.spLevel'"
            style="width:33%"
          >
            <el-input size="mini" v-model="item.spLevel"></el-input>
          </el-form-item>
          <el-form-item
            label="可承接范围"
            ref="spLimit"
            :prop="'supplierQualificationsList.' + index+ '.spLimit'"
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
              label="身份证号码"
              ref="peopleIdCode"
              :prop="'supplierPeopleList.' + index + '.peopleIdCode'"
              style="width:33%"
              :rules="[{ required: true, message: '请输入主联系人身份证号码', trigger: 'blur' },
                 {
                  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                  message: '证件号码格式有误！',
                  trigger: 'blur',
                }
              ]"
            >
              <el-input size="mini" v-model="item.peopleIdCode"></el-input>
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
            <el-form-item
              label="电话"
              ref="peoplePhone"
              :prop="'supplierPeopleList.' + index + '.peoplePhone'"
              style="width:33%"
            >
              <el-input size="mini" v-model="item.peoplePhone"></el-input>
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

        <el-form-item
          label-width="0px"
          ref="supplierRemark1"
          class="desc"
          prop="desc"
          style="width:100%;height:130px"
        >
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
      </el-form>
        <div class="informa">内部业绩信息</div>
        <div v-if="!zcIn && !htIn" style="width:100%">
          <span style="margin: 15px; float:left;">内部业绩信息:暂无</span>
        </div>
        <!-- 支出凭单表格 -->
        <div class="yj" v-if="zcIn || htIn">
          <span class="yejiSpan">支出凭单</span>
          <el-table
            :data="expenditureList"
            border
            size="mini"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column label="时间" align="center" width="100">
              <template slot-scope="scope">
                <span>{{returnDate(scope.row.CREATED_DATE)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ESTIMATE_SCORE" label="评估得分" align="center"></el-table-column>
            <el-table-column prop="FK_MEMO" label="付款用途" align="center"></el-table-column>
            <el-table-column prop="COMPANY_NAME" label="付款公司" align="center"></el-table-column>
            <el-table-column prop="SIGN_AMOUNT" label="付款金额（元）" align="center"></el-table-column>
            <!-- <el-table-column prop="" label="收款公司" align="center"></el-table-column> -->
          </el-table>
          <Pagination :currentPage="expenditurePage" :total="expenditureTotal" @changePage="changePageZC"></Pagination>

          <!-- 合同审定表格 -->
          <span class="yejiSpan">合同审定（点击评估得分可查看该合同审定的合同付款、结算信息）</span>
          <el-table
            :data="contractList"
            border
            size="mini"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column label="时间" align="center" width="100">
              <template slot-scope="scope">
                <span>{{returnDate(scope.row.CREATED_DATE)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估得分" align="center">
              <template slot-scope="scope">
                <el-button @click="clickScore(1, scope.row.FK_NUMBER)" type="text" size="mini">{{scope.row.ESTIMATE_SCORE}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="COMPANY_NAME" label="公司名称" align="center"></el-table-column>
            <el-table-column prop="FK_NAME" label="合同名称" align="center"></el-table-column>
            <!-- <el-table-column prop="" label="承包单位" align="center"></el-table-column> -->
            <el-table-column prop="SIGN_AMOUNT" label="签订金额（元）" align="center"></el-table-column>
          </el-table>
          <Pagination :currentPage="contractPage" :total="contractTotal" @changePage="changePageHT"></Pagination>
        </div>
        <div class="oneButton" v-if="btnHidden">
          <el-button type="primary" size="mini" @click="goBack">上一步</el-button>
          <el-button type="primary" size="mini" @click="preservation('kpi') ">保存</el-button>
          <el-button type="primary" size="mini" @click="preservation('kpi', 'next') ">下一步</el-button>
        </div>
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
        
          <el-form-item label="供应商银行账户名称" label-width="160px" required style="width:90%">
            <el-input size="mini" :disabled="true" :value="supplierName"></el-input>
            <span
              style="float: left;margin-left: -660px;font-size: 12px;color: #999;"
            >这是供应商名称，如果名称不对请返回基本信息处修改！</span>
          </el-form-item>
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
                :key="item.DS_VALUE_CODE"
                :label="item.DS_VALUE_NAME"
                :value="item.DS_VALUE_CODE"
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
          <el-form-item label="银行账号" label-width="160px" required style="width:45%">
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

          <el-form-item label="开户支行" label-width="160px" required style="width:45%">
            <el-input size="mini" v-model="pro.bankBranchName" :value="pro.bankBranchName"></el-input>
          </el-form-item>
          <el-form-item label="开户支行行号" label-width="160px" style="width:45%">
            <el-input size="mini" v-model="pro.bankBranchNumber" :value="pro.bankBranchNumber"></el-input>
          </el-form-item>
          <el-form-item label="上传附件" required label-width="160px" style="width:90%">
            <el-upload
              class="upload-demo parentkpi"
              :action="uploadAction"
              :data="bankFileData"
              :on-preview="handlePreviewsBank"
              :on-remove="(file, fileList)=> handleRemovesBank(file, fileList, index)"
              :on-success="(res, file, fileList)=> fileKpisuccBank(res, file, fileList, index)"
              multiple
              :limit="300"
              :file-list="pro.fileBank"
            >
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
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

    <template v-if="indexActive==4">
      <el-table
        :data="ksBaogaoList"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        class="listTable"
        style="width: 98%; margin: 10px auto;"
      >
        <!-- <template slot-scope="scope"></template> -->
        <el-table-column type="index" label="序号" align="center" width="50">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="left" label="考察项目">
          <template slot-scope="scope">{{scope.row.INSPECT_ITEM}}</template>
        </el-table-column>
        <el-table-column align="left" label="考察组长">
          <template slot-scope="scope">{{zyReturn(scope.row.INSPECT_LEADER)}}</template>
        </el-table-column>
        <el-table-column align="left" label="考察组员">
          <template slot-scope="scope">{{zyReturn(scope.row.INSPECT_MEMBERS)}}</template>
        </el-table-column>
        <el-table-column align="center" label="考察得分">
          <template slot-scope="scope">{{scope.row.INSPECT_SCORE}}</template>
        </el-table-column>
        <el-table-column align="left" label="考察意见">
          <template slot-scope="scope">{{scope.row.INSPECT_OPINION}}</template>
        </el-table-column>
        <el-table-column align="center" label="考察时间">
          <template slot-scope="scope">{{scope.row.INSPECT_DATE}}</template>
        </el-table-column>
        <el-table-column align="left" label="考察报告">
          <template slot-scope="scope">{{scope.row.FILE_NAME}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="lookBg(scope.row)">查看报告</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="indexActive==5">
      <el-table
        :data="shenpiList"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        class="listTable"
        style="width: 98%; margin: 10px auto;"
      >
        <!-- <template slot-scope="scope"></template> -->
        <el-table-column prop="supplerRowNum" align="center" label="节点">
          <template slot-scope="scope">{{returnJD(scope.row.supplerRowNum)}}</template>
        </el-table-column>
        <el-table-column align="left" label="审批意见">
          <template slot-scope="scope">{{(scope.row.supplerScheduleContent)}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作人">
          <template slot-scope="scope">{{(scope.row.createdName)}}</template>
        </el-table-column>
        <el-table-column prop="createdDate" align="center" label="操作时间">
          <template slot-scope="scope">{{returnDate(scope.row.createdDate, 'cc')}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作历史">
          <template slot-scope="scope">
            <span>{{returnLS(scope.row.supplerScheduleStatus)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <h6 style="padding-left:12px">审批列表</h6>
      <el-table
        :data="approveList"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        class="listTable"
        style="width: 98%; margin: 10px auto;"
      >
        <el-table-column prop="SUPPLIER_NAME" align="center" label="供应商名称"></el-table-column>
        <el-table-column prop="sortName" align="center" label="供应商类型" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="审批编号">
          <template slot-scope="scope">
            <a
              :href="scope.row.APPROVEURL"
              target="_blank"
              rel="noopener noreferrer"
            >{{scope.row.APPROVE_NUMBER}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="STATUS_DESC" align="center" label="审定状态"></el-table-column>
        <el-table-column prop="NEXT_TASK_NAME" align="center" label="下一环节审批人"></el-table-column>

        <el-table-column prop="ASSIGNEE_NAME" align="center" label="当前审批人"></el-table-column>
        <el-table-column prop="APPROVE_URGENT" align="center" label="是否加急"></el-table-column>
        <el-table-column prop="APPROVE_TITLE" align="center" label="审定标题"></el-table-column>
        <el-table-column prop="APPROVE_CONTENT" align="center" label="审定内容"></el-table-column>
      </el-table>
      <Pagination :currentPage="currentPage" :total="total" @changePage="changePage"></Pagination>
    </template>
    <template v-if="indexActive==6">
      <el-table
        :data="changeList"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        class="listTable"
        style="width: 98%; margin: 10px auto;"
      >
        <el-table-column type="index" label="序号" align="center" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="UPDATE_FIELD_NAME" align="center" width="120" label="字段名称">
          <template slot-scope="scope">
            {{scope.row.UPDATE_FIELD_NAME}}
          </template>
        </el-table-column>
        <el-table-column prop="UPDATE_BEGIN" align="left" label="修改前">
          <template slot-scope="scope"><span v-html="changeValue(scope.row, scope.row.UPDATE_BEGIN)"></span></template>
        </el-table-column>
        <el-table-column prop="UPDATE_AFTER" align="left" label="修改后">
          <template slot-scope="scope"><span v-html="changeValue(scope.row, scope.row.UPDATE_AFTER)"></span></template>
        </el-table-column>
        <el-table-column prop="CREATED_NAME" align="center" width="100" label="修改人">
          <template slot-scope="scope">
            {{scope.row.CREATED_NAME}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改时间" width="100">
          <template slot-scope="scope">{{returnDate(scope.row.CREATED_DATE)}}</template>
        </el-table-column>
        <el-table-column prop="UPDATED_NAME" align="center" label="审核人" width="100">
          <template slot-scope="scope">
            {{scope.row.UPDATED_NAME}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态" width="80">
          <template slot-scope="scope">{{returnStatus(scope.row.APPROVE_STATUS)}}</template>
        </el-table-column>
        <el-table-column align="center" label="审核时间" width="100">
          <template slot-scope="scope">{{returnDate(scope.row.UPDATED_DATE)}}</template>
        </el-table-column>
      </el-table>
    </template>
    <div v-if="scShow">
      <div class="informa" style="width: calc(100% - 20px); margin-left: 10px;">资质审查</div>
      <el-form inline>
        <el-form-item label="所属单元" label-width="160px" style="width:45%">
          <el-select v-model="scForm.supplierCostCenter" size="mini" filterable placeholder="请选择">
            <el-option
              v-for="item in dyList"
              :key="item.STRUCTURE_CODE"
              :label="item.ORS_NAME"
              :value="item.STRUCTURE_CODE"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商类别" required label-width="160px" style="width:45%">
          <el-cascader
            size="mini"
            :options="optionsSort"
            :props="propsType"
            clearable
            v-model="ruleForm.supplierSort"
            @change="sortChangeSc"
            collapse-tags
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div class="informa" style="width: calc(100% - 20px); margin-left: 10px;">资质审查意见</div>
      <div label-width="0px" class="desc" style="width:100%;height:130px">
        <el-input
          size="mini"
          v-model="scForm.supplierExamineOpinion"
          class="infor-textarea"
          type="textarea"
        ></el-input>
      </div>
      <div class="oneButton">
        <el-button type="primary" size="mini" @click="scFn('th')">退回修改</el-button>
        <el-button type="primary" size="mini" @click="scFn">审核通过</el-button>
      </div>
    </div>
    <div v-if="zztShow">
      <div class="informa" style="width: calc(100% - 20px); margin-left: 10px;">{{zhuanTitle}}意见</div>
      <div label-width="0px" class="desc" style="width:100%;height:130px">
        <el-input
          size="mini"
          v-model="zztForm.supplierOption"
          class="infor-textarea"
          type="textarea"
        ></el-input>
      </div>
      <div class="oneButton">
        <el-button type="primary" size="mini" @click="goBackYe ">返回</el-button>
        <el-button type="primary" size="mini" @click="zztFn">{{zhuanTitle}}</el-button>
      </div>
    </div>

    <div v-if="rukuShow">
      <div class="informa" style="width: calc(100% - 20px); margin-left: 10px;">入库审批</div>
      <el-form class="ruku">
        <el-form-item label="入库评估评分" label-width="160px">
          <el-input size="mini" v-model="rukuForm.supplierScore" readonly></el-input>
          <el-button
            style="position: absolute; left:240px; top:7px;"
            type="text"
            size="mini"
            @click="pgDetail"
          >评估详情</el-button>
        </el-form-item>
        <el-form-item label="入库审查意见" label-width="160px">
          <el-input size="mini" v-model="rukuForm.estimateHeadRemark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="oneButton">
        <el-button type="primary" size="mini" @click="goBackYe ">返回</el-button>
        <el-button type="primary" size="mini" @click="rukuFn">发起入库审批</el-button>
      </div>
    </div>

    <div v-if="changeIf">
      <div class="oneButton">
        <el-button type="primary" size="mini" @click="changeFn">发起变更申请</el-button>
      </div>
    </div>
    <el-dialog title="评估详情" :visible.sync="pgShow" class="dialogPg">
      <el-table :data="pgData" border size="mini" style="width: 96%;margin: 10px auto;">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column property="ITEM_INDEX" label="入库评估指标" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column
          label="评估规则"
        >
        <template slot-scope="scope">
          <!-- {{scope.row.xize}} -->
          <el-radio-group v-model="scope.row.score" size="mini">
            <el-radio
              class="radioRoup"
              v-for="(item, index) in scope.row.xize"
              :key="index"
              :label="item.score"
            >{{item.score}}{{item.title}}</el-radio>
          </el-radio-group>
        </template>
        </el-table-column>
        <!-- <el-table-column property="ITEM_SCORE" label="得分标准" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="实际得分" align="center" width="100">
          <template slot-scope="scope">
            {{scope.row.score}}
            <!-- <el-input v-model.number="scope.row.ESTIMATE_LINE_SCORE" size="mini"></el-input> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="oneButton">
        <el-button type="primary" size="mini" @click="pgShow = false">取消</el-button>
        <el-button type="primary" size="mini" @click="saveKu">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="htsd" title="合同审定" :visible.sync="contractListShow" width="1000px">
      <el-table
        :data="contractDetailList"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column label="时间" align="center" width="100">
          <template slot-scope="scope">
                <span>{{returnDate(scope.row.CREATED_DATE)}}</span>
              </template>
        </el-table-column>
        <el-table-column prop="FK_TYPE" label="合同类型" align="center"></el-table-column>
        <el-table-column prop="ESTIMATE_SCORE" label="评估得分" align="center"></el-table-column>
        <el-table-column prop="COMPANY_NAME" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="FK_NAME" label="合同名称" align="center"></el-table-column>
        <!-- <el-table-column prop="" label="承包单位" align="center"></el-table-column> -->
        <el-table-column prop="SIGN_AMOUNT" label="合同付款金额（元）" align="center"></el-table-column>
        <el-table-column prop="APPLY_AMOUNT" label="申请付款金额（元）" align="center"></el-table-column>
      </el-table>
      <Pagination :currentPage="dtPage" :total="dtTotal" @changePage="changePageDT"></Pagination>
        
    </el-dialog>
  </div>
</template>

<script>
import base from "../../api/base";
import citylist from "../../utils/commit";
import itemCenter from "../../components/itemCenter";
import Pagination from "../../components/pagination";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.slPassowrd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      contractDetailList: [], // 合同审定详情列表
      contractListShow: false, // 合同审定详情列表是否显示
      expenditureList: [], //内部业绩信息-支出
      zcIn: true,
      htIn: true,
      zcListParams: {
        supplierCode: '',
        estimateHeadType: '',
        headType: '',
        pageNum: 1,
        size: 10
      },
      contractList: [],//内部业绩信息-hetong
      expenditurePage: 1,
      contractPage: 1,
      currentPage: 1,
      dtPage: 1,
      dtTotal: 0,
      total: 0,
      expenditureTotal: 0,
      contractTotal: 0,
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
      bankFileData: {
        fileType: "18",
        headCode: "",
        fileDescription: "",
      },
      
      qiyezhuangkuang: [
    
      ], 
      pgShow: false, // 评估详情
      pgData: [],
      ksBaogaoList: [], // 考察报告list
      shenpiList: [], // shenpi list
      approveList: [],
      rukuShow: false,
      rukuForm: {
        supplierScore: "",
        estimateHeadRemark: "",
      },
      dyList: [], //单元list
      scForm: {
        supplierCode: "",
        supplierExamineOpinion: "",
        supplierSort: "",
        supplierCostCenter: "",
        supplerScheduleStatus: "1",
      },
      zztForm: {
        supplierStatus: "", //供应商状态:2:备选;4:不合格
        updatedName: "", // 供应商名称
        supplierOption: "", // 意见
        supplierCode: "",
        supplerScheduleStatus: "", //流程状态：4：转备选；转不合格；
        checkStatus: "", //操作状态:7：转不合格;8：转备选
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
      uploadAction:
        base.fileUpload +
        "?sso_sessionid=" +
        sessionStorage.getItem("sso_sessionid"),
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
      sso_sessionid: sessionStorage.getItem("sso_sessionid"),

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
        supplierRecommendCompany: '',
        supplierReferrer: '',
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
        establishmentStatus: "",
        headquartersAddress: "",
        inside: "",

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
            peopleIdCode: "",
            peoplePosition: "",
            peopleType: "1",
          },
        ],
        supplierQualificationsList: [],
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
        slPassowrd: [
          { validator: validatePass, trigger: "blur", required: true },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur", required: true },
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
        peopleIdCode: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
            trigger: "blur",
          },
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
          label: "合作中",
          value: "InCooperation",
        },
        {
          label: "终止合作",
          value: "EndCooperation",
        },
        {
          label: "未合作",
          value: "NoCooperation",
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
      bankOptions: [],
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
      // taxpayerOptions: [
      //   {
      //     value: "个体工商户",
      //     label: "增值税一般纳税人",
      //   },
      //   {
      //     value: "小规模纳税人",
      //     label: "增值税小规模纳税人",
      //   },
      //   {
      //     value: "一般纳税人",
      //     label: "CommonTaxPayer",
      //   },
      //   {
      //     value: "其他",
      //     label: "Other",
      //   },
      // ],
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
      estimateHeadCode: "",
      getCodesterType: "",
      changeIf: false,
      changeOldData: {},
      updateRemark: "",
      updateHeadCode: "",
      changeOldKpi: [],
      changeOldBank: [],
      changeOldQua: [],
      delectKpi: [],
      supplierName: "",
      delectBankArr: [],
      fkNumber: '', //点击合同分数
      quyuList: [],
    };
  },
  watch: {
    "ruleForm.supplierQualificationsList.length": {
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
this.getSupplierEstablishment();
this.getSupplierCooperateStatus()
    this.optionsCity = citylist;
    this.inparChange(); // 有无关联母公司
    this.getsuppType(); // 供应商类别
    this.getSupplierInArea(); //获取所在区域
    this.getBankListByKey(); // 开户行列表
    this.supplierCode = this.$route.query.supplierCode || "";
    this.hzFileData.headCode = this.supplierCode;
    this.bankFileData.headCode = this.supplierCode;
    this.zhuanTitle = this.$route.query.InspectStatusName || "";
    var type = this.$route.query.type;
    if (type == "add") {
    } else if (type == "edit") {
      this.getCodester();
      this.isButton = false;
    } else if (type == "look") {
      this.isButton = false;
      this.isLook = true;
      this.pushBtn();
      this.getCodester();
    } else if (type == "sc") {
      this.pushBtn();
      this.getCodester();
      this.isLook = true;
      this.btnHidden = false;
      this.isButton = false;
      this.scShow = true;
      var params = {
        orsName: "",
        structureCode: "",
      };
      this.api.getOrgStructureList(this.sso_sessionid, params).then((res) => {
        console.log(res);
        this.dyList = res.data.data;
      });
    } else if (type == "zzt") {
      this.pushBtn();
      this.isLook = true;
      this.btnHidden = false;
      this.isButton = false;
      this.zztShow = true;
      if (this.$route.query.InspectStatusName == "转黑库") {
        this.getCodesterType = "Blacklist";
      }
      if (this.$route.query.InspectStatusName == "转潜在") {
        if(this.$route.query.whereFrom == 'lang'){
          this.getCodesterType = "BlacklistOut";
        }
      }
      this.getCodester();
    } else if (type == "cksp") {
      this.indexActive = 5;
      this.pushBtn();
      this.isLook = true;
      this.btnHidden = false;
      this.isButton = false;
      this.getInspectByCheck();
    } else if (type == "rukuSp") {
      this.getCodesterType = "Stock";
      this.getCodester();
      this.pushBtn();
      this.isLook = true;
      this.btnHidden = false;
      this.isButton = false;
      this.rukuShow = true;
    } else if (type == "change") {
      this.getCodester();
      // this.pushBtn();
      this.btnHidden = false;
      this.isButton = false;
      this.changeIf = true;
    }
  },
  components: {
    Pagination,
  },
  methods: {

    getSupplierCooperateStatus(){
       this.api
          .getSupplierCooperateStatus()
          .then((res) => {
            console.log(res)
            if(res.data.returnCode==0){
              this.cooperOptions=res.data.data
            }

          })
    },
    // getSupplierEstablishment
    getSupplierEstablishment(){
          this.api
          .getSupplierEstablishment()
          .then((res) => {
         
            if(res.data.returnCode==0){
              this.qiyezhuangkuang=res.data.data
            }

          })
    },
    getSupplierInArea(){
      this.api.getSupplierInArea().then((res) => {
        this.quyuList = res.data.data;
      });
    },
    // 考察报告组长组员数据返回
    zyReturn(value) {
      if(!value) {
        return '';
      }
      var arr = value.split(",");
      var str = [];
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split(":");
        str.push(arr2[1]);
      }
      return str.join(",");
    },
    // .供应商资质审查--通过
    scFn(type) {
      if (type == "th") {
        this.scForm.supplerScheduleStatus = "2";
        this.scForm.supplierSort = "";
      } else {
        this.scForm.supplerScheduleStatus = "1";
        // if (!this.scForm.supplierCostCenter) {
        //   this.$message.error("所属单元不能为空");
        //   return false;
        // }
        // 供应商类别需要拼接
        var supp = this.scForm.supplierSort;
        if (supp.length == 0) {
          this.$message.error("供应商类别不能为空！");
          return false;
        }
        var sortArr = [];
        console.log(supp);
        for (let j in supp) {
          // sortArr.push(supp[j].join("_"));
          sortArr.push(supp[j][supp[j].length-1]);
        }
        var sss = sortArr.join(",");
        if (this.scForm.supplierExamineOpinion == "") {
          this.$message.error("审查意见不能为空");
          return false;
        }
      }
      this.scForm.supplierCode = this.supplierCode;
      var params = {
        supplerScheduleStatus: this.scForm.supplerScheduleStatus,
        supplierCostCenter: this.scForm.supplierCostCenter,
        supplierCode: this.scForm.supplierCode,
        supplierExamineOpinion: this.scForm.supplierExamineOpinion,
        supplierSort: sss,
      }
      this.api.supplierScPass(this.sso_sessionid, params).then((res) => {
        console.log(res);
        params = {};
        this.$message.success("操作成功！");
        this.goBackYe();
      });
    },
    pushBtn() {
      this.buttons.push(
        {
          id: 5,
          name: "考察报告",
        },
        {
          id: 6,
          name: "审批历程",
        },
        {
          id: 7,
          name: "变更历史",
        }
      );
    },
    // .供应商转状态
    zztFn() {
      this.zztForm.supplierCode = this.supplierCode;
      this.zztForm.updatedName = this.ruleForm.supplierName;
      var InspectStatusName = this.$route.query.InspectStatusName;
      var index = this.$route.query.index;
      if (InspectStatusName == "转备选") {
        this.zztForm.checkStatus = "8";
        this.zztForm.supplierStatus = "2";
        this.zztForm.supplerScheduleStatus = "13";
        this.zztForm.supplerRowNum = '4';
      } else if (InspectStatusName == "转潜在") {
        this.zztForm.supplerRowNum = "6";
        this.zztForm.supplierStatus = "1";
        this.zztForm.supplerScheduleStatus = "14";
      } else if (InspectStatusName == "转不合格") {
        this.zztForm.checkStatus = "7";
        this.zztForm.supplierStatus = "4";
        this.zztForm.supplerScheduleStatus = "12";
        if(index == 3){
          this.zztForm.supplerRowNum = '4';
        } else if(index == 1){
          this.zztForm.supplerRowNum = '2';
        } else if(index == 2){
          this.zztForm.supplerRowNum = '5';
        }
      }
      this.zztForm.inspectCode = this.ruleForm.inspectCode;
      console.log(this.zztForm);
      var whereFrom = this.$route.query.whereFrom;
      // if(whereFrom == 'lang'){}
      if (InspectStatusName != "转黑库" && whereFrom != "lang") {
        this.api
          .updateSupplierByStatus(this.sso_sessionid, this.zztForm)
          .then((res) => {
            console.log(res);
            this.$message.success("操作成功！");
            this.goBackYe();
          });
      } else {
        if (whereFrom == "lang") {
          var params = {
            approveContent: "转潜在-内容---内容待定",
            approveTitle: "转潜在-标题",
            approveHeadCode: this.blacklistCode,
            supplierCode: this.zztForm.supplierCode,
            blacklistAddReason: this.zztForm.supplierOption,
            approveType: "OUT",
          };
        } else {
          if(index == 4){
            var params = {
              approveContent: "转黑库-内容",
              approveTitle: "转黑库-标题",
              approveHeadCode: this.blacklistCode,
              supplierCode: this.zztForm.supplierCode,
              blacklistAddReason: this.zztForm.supplierOption,
              approveType: "",
              supplierRowNum: 6,
            };
          } else {
            var params = {
              approveContent: "转黑库-内容",
              approveTitle: "转黑库-标题",
              approveHeadCode: this.blacklistCode,
              supplierCode: this.zztForm.supplierCode,
              blacklistAddReason: this.zztForm.supplierOption,
              approveType: "",
            };
          }
        }
        this.api.approveByBlacklist(this.sso_sessionid, params).then((res) => {
          // setTimeout(() => {
          //   window.location.href = "about:blank";
          //   window.close();
          // }, 100);
          window.open(res.data.message);
        });
      }
    },

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
        case 5:
          this.baogaoList();
          break;
        case 6:
          this.getInspectByCheck();
          break;
        case 7:
          this.historyList();
          break;
      }
    },
    licenseValidBegin(value) {
      this.ruleForm.licenseValidBegin = value[0];
      this.ruleForm.licenseValidEnd = value[1];
    },

    removeFileFn(code) {
      var params = {
        // serviceFileCode: code
      };
    },
    removeFile2(file, id) {
      console.log(file, id);
      var form = this.tableForm;
      for (var i in form[id].fileList2) {
        if (form[id].fileList2[i].serviceCode == file.serviceCode) {
          form[id].delectZZ.push(file);
          form[id].fileList2.splice(i, 1);
        }
      }
      if (!this.changeIf) {
        let params = file.serviceCode;
        this.api.deleteDelSupplie(this.sso_sessionid, params).then((res) => {
          this.$message.success("删除成功！");
        });
      }
    },
    onChangeFile2(res, file, fileList, id) {
      this.tableForm[id - 1].fileList2.push({
        name: file.name,
        serviceCode: file.response.message,
      });
    },
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
      this.api.getSupplierCategoryTree(this.sso_sessionid).then((res) => {
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
    // 也即信息上传文件
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
    // 银行信息上缠文件
    fileKpisuccBank(res, file, fileList, index) {
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
        this.moeneyForm[index].bankFileCode = arr.join(",");
        this.moeneyForm[index].fileBank = fileList;
      }
      //文件上传成功的回调
    },
    fileKpierror(file) {
      console.log(file);
      console.log("文件上传shibai的回调");
      // this.fileKpi.push({

      // })
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data);
    },
    surTime() {
      var list = this.ruleForm.supplierQualificationsList;
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
    seeClick(id) {
      this.isSee = true;
      let list = this.seeimgList;
      this.seeImageUrl = list[id - 1].src;
    },
    // 也即信息删除文件
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
    // 银行信息删除文件
    handleRemovesBank(file, fileList, index) {
      if (!file.code) {
        file.code = file.response.message;
      }
      if (!this.moeneyForm[index].bankFileDelect) {
        this.moeneyForm[index].bankFileDelect = [];
      }
      this.moeneyForm[index].bankFileDelect.push(file);
      this.moeneyForm[index].fileBank = fileList;
      if (fileList.length > 0) {
        var arr = [];
        for (var i in fileList) {
          var code = fileList[i].code || fileList[i].response.message;
          arr.push(code);
        }
        this.moeneyForm[index].bankFileCode = arr.join(",");
      } else {
        this.moeneyForm[index].bankFileCode = "";
      }
    },
    handlePreviews(file) {
      console.log(file);
      if (file.url) {
        window.open(file.url);
      }
    },
    handlePreviewsBank(file) {
      console.log(file);
      if (file.url) {
        window.open(file.url);
      }
    },
    // beforeRemoves(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    // 银行列表
    getBankListByKey(){
      this.api.getBankListByKey(this.sso_sessionid).then((res) => {
        this.bankOptions = res.data.data;
      })
    },
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
      let list = this.ruleForm.supplierQualificationsList;
      list.push({
        spLevel: "",
        spLimit: "",
        spName: "",
        spNumber: "",
        spType: "0",
        createdDate: "",
        // createdDate: Date.now(),
      });
      console.log(this.ruleForm.supplierQualificationsList);
    },
    // 删除资质等级
    deleteSupplier(id) {
      let list = this.ruleForm.supplierQualificationsList;
      list.splice(id, 1);
      console.log(this.ruleForm.supplierQualificationsList);
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
      for(let i in this.ruleForm.supplierPeopleList){
        if(this.ruleForm.supplierPeopleList[i].peopleCode == list[i].peopleCode){
          this.ruleForm.supplierPeopleList.splice(i, 1);
        }
      }
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
      let list = this.moeneyForm;
      //
      if (list.length > 1) {
        if (list[index].bankCode) {
          this.delectBankArr.push(list[index]);
          this.changeOldBank.splice(index, 1);
        }
        list.splice(index, 1);
      } else {
        this.$message.error("最少保留一组银行信息");
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
          for (var p = 0; p < params.supplierQualificationsList.length; p++) {
            console.log(params.supplierQualificationsList[p]);
            if (
              params.supplierQualificationsList[p].spName &&
              params.supplierQualificationsList[p].spDate &&
              params.supplierQualificationsList[p].spNumber
            ) {
            } else {
              this.$message.error("资质等级中名称、编号、有效期为必填项！");
              return false;
            }
          }
          var supp = params.supplierSort;
          var sortArr = [];
          for (let j in supp) {
            // sortArr.push(supp[j].join("_"));
            sortArr.push(supp[j][supp[j].length-1]);
          }
          params.supplierSort = sortArr.join(",");
          this.api.getRegister(this.sso_sessionid, params).then((res) => {
            if (res.data.returnCode == 0) {
              this.supplierCode = res.data.message
                .split(",")[0]
                .split("supplierCode:")[1];
              this.hzFileData.headCode = this.supplierCode;
              this.bankFileData.headCode = this.supplierCode;
              this.supplierName = params.supplierName || "";
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
          this.$message.error("银行账号不能为空！");
          return false;
        }
        if (!params[i].bankCurrency) {
          this.$message.error("币种不能为空！");
          return false;
        }
        if (!params[i].bankBranchName) {
          this.$message.error("开户支行不能为空！");
          return false;
        }
        if (!params[i].bankFileCode) {
          this.$message.error("相关附件不能为空！");
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
    // 变更历史列表 转换状态字段  pass stop
    returnStatus(value) {
      if (value == "PASS") {
        return "通过";
      } else if (value == "STOP") {
        return "驳回";
      }
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },
    returnJD(status) {
      var strArr = [
        "资质审核",
        "现场考察",
        "入库审批",
        "从合格中转入",
        "重新考察",
        "从不合格中转入",
        "转黑库",
      ];
      if (status) {
        return strArr[Number(status - 1)];
      } else {
        return "";
      }
    },
    // 历史转换
    returnLS(status) {
      var strArr = [
        "资质审查通过",
        "退回修改",
        "发起考察",
        "跳过现场考察",
        "考察不通过",
        "入库评估",
        "入库审核提交",
        "入库审批通过",
        "入库审批终止",
        "转黑库",
        "启动评估",
        "转不合格",
        "转备选",
        "转潜在",
      ];
      if (status == "3.1") {
        return "现场考察通过";
      } else if (status == "10.1") {
        return "转黑库成功";
      } else if (status == "10.2") {
        return "转黑库终止";
      } else if (status) {
        return strArr[Number(status - 1)];
      } else {
        return "";
      }
    },
    // 考察报告预览
    lookBg() {
      
    },

    // 请求接口 渲染数据

    // 考察报告列表
    baogaoList() {
      this.api
        .getInspectList(this.sso_sessionid, { supplierCode: this.supplierCode })
        .then((res) => {
          console.log(res);
          this.ksBaogaoList = res.data.data;
        });
    },
    // 审批历程列表
    getInspectByCheck(pageNum) {
      this.api
        .getInspectByCheck(this.sso_sessionid, {
          supplierCode: this.supplierCode,
        })
        .then((res) => {
          this.shenpiList = res.data.data;
        });
      var params = {
        supplierCode: this.supplierCode,
        pageNum: pageNum,
        size: 10,
      };
      this.api.getApproveList(this.sso_sessionid, params).then((res) => {
        this.approveList = res.data.data;
        this.total = Number(res.data.count);
      });
    },
    // 分页
    changePage(page, size) {
      this.getInspectByCheck(page);
    },
    // 弹窗分页
    changePageDT(page, size) {
      this.clickScore(page);
    },
    // 合同分页
    changePageHT(page, size) {
      this.zcListFn(page, 'e5,e6', '合同审定');
    },
    // 支出单列表分页
    changePageZC(page, size) {
      this.zcListFn(page, 'e4', '支出凭单');
    },
// 点击分数
    clickScore(page, code){
      if(code){
        var code = code;
      } else {
        var code = this.fkNumber;
      }
      this.fkNumber = code;
      this.contractListShow = true;
      var params = {
        supplierCode: this.supplierCode,
        estimateHeadType: 'e5,e6',
        headType: '合同审定',
        pageNum: page || 1,
        size: 10,
        code: code
      }
      this.api.getContractByScore(this.sso_sessionid, params).then((res) => {
        this.contractDetailList = res.data.data;
        this.expenditureTotal = Number(res.data.count);
        // this.contractDetailList.push({score: 13});
        
      })
    },
    // 获取支出单列表
    zcListFn(page, estimateHeadType, headType){
      console.log(estimateHeadType)
      this.zcListParams.pageNum = page || this.zcListParams.pageNum;
      this.zcListParams.supplierCode = this.supplierCode;
      this.zcListParams.estimateHeadType = estimateHeadType;
      this.zcListParams.headType = headType;
      this.api.getContractByScore(this.sso_sessionid, this.zcListParams).then((res) => {
        if(estimateHeadType == 'e4'){
          this.expenditureList = res.data.data;
          this.expenditureTotal = Number(res.data.count);
          if(res.data.count == 0){
            this.zcIn = false;
          } else {
            this.zcIn = true;
          }
          this.zcListFn(1, 'e5,e6', '合同审定');
        }
        if(estimateHeadType == 'e5,e6'){
          this.contractList = res.data.data;
          this.contractTotal = Number(res.data.count);
          if(res.data.count == 0){
            this.htIn = false;
          } else {
            this.htIn = true;
          }
        }
      })
    },
    //变更历史
    historyList() {
      this.changeList = [];
      this.api
        .getUpdateList(this.sso_sessionid, {
          supplierCode: this.supplierCode,
        })
        .then((res) => {
          console.log(res);
          this.changeList = res.data.data;
        });
    },
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
            if (this.changeIf) {
              this.changeOldQua = this.deepCopyTwo(this.tableForm);
            }
          }
        });
    },
    // 根据供应商code查询业绩信息
    getKpi() {
      let params = this.supplierCode;
      this.zcListFn(1, 'e4', '支出凭单');
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
              url: data[0].approveUrl,
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
                    url: data[s].approveUrl,
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
                    url: data[s].approveUrl,
                  });
                }
              }
            }
          }
        }
        if (this.changeIf) {
          this.changeOldKpi = this.deepCopyTwo(this.kpiForm);
        }
      });
    },
    // 根据code获取供应商基本信息
    getCodester() {
      var _this = this;
      let params = {
        supplierCode: this.supplierCode,
        type: this.getCodesterType,
      };
      this.api.getCodester(this.sso_sessionid, params).then((res) => {
        this.estimateHeadCode =
          res.data.data.supplierInfosList[0].estimateHeadCode || "";
        this.blacklistCode =
          res.data.data.supplierInfosList[0].blacklistCode || "";
        // this.blackToQzCode =
        //   res.data.data.supplierInfosList[0].blackToQzCode || "";
        this.ruleForm = Object.assign(
          this.ruleForm,
          res.data.data.supplierInfosList[0]
        );
        console.log(this.ruleForm.establishmentStatus)
        this.supplierName =
          res.data.data.supplierInfosList[0].supplierName || "";
        // this.ruleForm = res.data.data.supplierInfosList[0];
        this.ruleForm.shareholderList = [];
        for (var i in res.data.data.supplierPeopleList) {
          if (res.data.data.supplierPeopleList[i].peopleType == "3") {
            this.ruleForm.shareholderList.push(
              res.data.data.supplierPeopleList[i]
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
        this.ruleForm.supplierPeopleList = res.data.data.supplierPeopleList;
        this.ruleForm.supplierQualificationsList =
          res.data.data.supplierQualificationsList;
        // 所属单元
        this.scForm.supplierCostCenter =
          res.data.data.supplierInfosList[0].supplierCostCenter;
        // 营业期限
        this.times.push(
          res.data.data.supplierInfosList[0].licenseValidBegin,
          res.data.data.supplierInfosList[0].licenseValidEnd
        );
        // 城市回显
        if (res.data.data.supplierInfosList[0].supplierServiceregion) {
          var city = res.data.data.supplierInfosList[0].supplierServiceregion.split(
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

        // 星际辉县
        this.ruleForm.supplierStar = res.data.data.supplierInfosList[0].supplierStar + '星' || '';
        // 供应商类别回显

        if (res.data.data.supplierInfosList[0].supplierSort) {
          var lb = res.data.data.supplierInfosList[0].supplierSort.split(",");
          if (lb.length > 0) {
            for (var b = 0; b < lb.length; b++) {
              lb[b] = lb[b].split("_");
            }
          }
          this.ruleForm.supplierSort = lb;
          this.scForm.supplierSort = lb;
                  console.log( lb)
        } else {
          this.ruleForm.supplierSort = "";
          this.scForm.supplierSort = "";
        }
        //
        if (res.data.data.supplierInfosList[0].estimateScore) {
          this.rukuForm.supplierScore =
            res.data.data.supplierInfosList[0].estimateScore;
        }
        if (res.data.data.supplierInfosList[0].estimateHeadRemark) {
          this.rukuForm.estimateHeadRemark =
            res.data.data.supplierInfosList[0].estimateHeadRemark;
        }
        if (this.getCodesterType == "Blacklist") {
          this.zztForm.supplierOption =
            res.data.data.supplierInfosList[0].blacklistAddReason || "";
        }
        if (this.changeIf) {
          this.changeOldData = this.deepCopyTwo(this.ruleForm);
        }
      });
    },
    // 深拷贝
    deepCopyTwo(obj) {
      let objClone = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj == "object") {
        for (const key in obj) {
          //判断obj子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = JSON.parse(JSON.stringify(obj[key]));
          } else {
            //如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
      return objClone;
    },
    // 根据code获取银行信息
    getMoney() {
      let params = this.$route.query.supplierCode;
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
            var data = res.data.data;
            // this.moeneyForm = res.data.data;
            this.moeneyForm = [];
            var t = 0;
            this.moeneyForm.push(data[0]);
            this.moeneyForm[t].fileBank = [];
            if (data[0].bankFileName) {
              this.moeneyForm[t].fileBank.push({
                name: data[0].bankFileName,
                code: data[0].bankFileCode,
                url: data[0].bankFileDolUrl,
              });
            }
            for (var i in data) {
              if (i != data.length - 1) {
                var s = Number(i) + 1;
                if (data[i].performanceId == data[s].performanceId) {
                  if (data[s].bankFileName) {
                    this.moeneyForm[t].fileBank.push({
                      name: data[s].bankFileName,
                      code: data[s].bankFileCode,
                      url: data[s].bankFileDolUrl,
                    });
                  }
                } else {
                  t++;
                  this.moeneyForm.push(data[s]);
                  this.moeneyForm[t].fileBank = [];
                  if (data[s].bankFileName) {
                    this.moeneyForm[t].fileBank.push({
                      name: data[s].bankFileName,
                      code: data[s].bankFileCode,
                      url: data[s].bankFileDolUrl,
                    });
                  }
                }
              }
            }
          }
        }
        if (this.changeIf) {
          this.changeOldBank = this.deepCopyTwo(this.moeneyForm);
        }
      });
    },

    // 评估详情
    pgDetail() {
      this.pgShow = true;
      this.api
        .getStockByCode(this.sso_sessionid, {
          supplierCode: this.supplierCode,
          estimateHeadCode: this.estimateHeadCode,
        })
        .then((res) => {
          var data = res.data.data;
          
          for(let i in data){
            var arr = [];
            if (data[i].ITEM_SCORE_STANDARD) {
              var arr2 = data[i].ITEM_SCORE_STANDARD.split("&");
              for (let i in arr2) {
                var indexK = arr2[i].indexOf("（") + 1;
                arr.push({
                  title: arr2[i],
                  score: arr2[i].substring(indexK, arr2[i].length - 1),
                });
              }
            }
            data[i].xize = arr;
            data[i].score = data[i].ESTIMATE_LINE_SCORE || '';
          }
          this.pgData = data;
          console.log(this.pgData)
        });
    },
    // 保存评分
    saveKu() {
      var params = {
        supplierCode: this.supplierCode,
        estimateLineList: [],
        estimateHeadCode: this.estimateHeadCode, // 评估headCode
        estimateHeadType: "e3", // 维度类型
        estimateHeadStatus: "edit",
      };
      var sum = 0;
      for (var i in this.pgData) {
        if (!this.pgData[i].score) {
          this.pgData[i].score = 0;
        }
        sum += Number(this.pgData[i].score);
        params.estimateLineList.push({
          estimateScoreItem: this.pgData[i].ITEM_CODE,
          estimateLineScore: this.pgData[i].score,
        });
      }
      this.api.AddStockList(this.sso_sessionid, params).then((res) => {
        this.estimateHeadCode = res.data.message;
        this.rukuForm.supplierScore = sum;
        this.pgShow = false;
      });
    },
    // 变更审批
    changeFn() {
      var params = {
        headCode: this.supplierCode, // supplierCode
        updateHeadCode: this.updateHeadCode || "", //修改code
        updateLineList: [],
      };
      var arr = [];
      if (this.indexActive == 1) {
        //业绩信息
        var oldStr = "",
          newStr = "";
        var oldArr = [],
          newArr = [];
        if (this.kpiForm.length > 0) {
          for (var i in this.kpiForm) {
            // debugger
            var performanceCode = this.kpiForm[i].performanceCode || "";
            var reg = new RegExp(",", "g"); //g,表示全部替换。
            if (this.kpiForm[i].dealFileCode) {
              var dealFileCode = this.kpiForm[i].dealFileCode.replace(reg, ".");
            } else {
              var dealFileCode = "";
            }
            if (this.kpiForm[i].fileKpi.length > 0) {
              var name = [];
              for (var f in this.kpiForm[i].fileKpi) {
                name.push(this.kpiForm[i].fileKpi[f].name);
              }
              var fileName = name.join("+");
            } else {
              var fileName = "";
            }
            if (!this.kpiForm[i].performanceCooperationAmount) {
              this.kpiForm[i].performanceCooperationAmount = "";
            }
            newArr.push(
              performanceCode +
                "_" +
                this.kpiForm[i].performanceCooperationCompany +
                "_" +
                this.kpiForm[i].performanceCooperationSize +
                "_" +
                this.kpiForm[i].performanceCooperationRegion +
                "_" +
                this.kpiForm[i].performanceCooperationItem +
                "_" +
                this.kpiForm[i].performanceCooperationRange +
                "_" +
                this.kpiForm[i].performanceCooperationAmount +
                "_" +
                dealFileCode +
                "_" +
                fileName
            );
          }
          newStr = newArr.join(",");
          console.log(newArr);
        } else {
          newStr = "";
        }
        if (this.changeOldKpi.length > 0 && this.delectKpi.length > 0) {
          for (var i in this.changeOldKpi) {
            var performanceCode = this.changeOldKpi[i].performanceCode || "";
            if (this.kpiForm[i].yejiFileDelect) {
              if (this.kpiForm[i].yejiFileDelect.length > 0) {
                var code = [],
                  name = [];
                for (var k in this.kpiForm[i].yejiFileDelect) {
                  code.push(this.kpiForm[i].yejiFileDelect[k].code);
                  name.push(this.kpiForm[i].yejiFileDelect[k].name);
                }
                var dealFileCode = code.join("+");
                var fileName = name.join("+");
              }
            } else {
              var dealFileCode = "";
              var fileName = "";
            }
            oldArr.push(
              performanceCode +
                "_" +
                this.changeOldKpi[i].performanceCooperationCompany +
                "_" +
                this.changeOldKpi[i].performanceCooperationSize +
                "_" +
                this.changeOldKpi[i].performanceCooperationRegion +
                "_" +
                this.changeOldKpi[i].performanceCooperationItem +
                "_" +
                this.changeOldKpi[i].performanceCooperationRange +
                "_" +
                this.changeOldKpi[i].performanceCooperationAmount +
                "_" +
                dealFileCode +
                "_" +
                fileName
            );
          }
          for (var i in this.delectKpi) {
            var performanceCode = this.delectKpi[i].performanceCode || "";
            if (this.delectKpi[i].dealFileCode) {
              var arrCode = this.delectKpi[i].dealFileCode.split(",");
              var dealFileCode = arrCode.join("+");
              if (this.delectKpi[i].fileName) {
                var name = this.delectKpi[i].fileName.split(",");
                var fileName = name.join("+");
              } else {
                var fileName = "";
              }
            } else {
              var dealFileCode = "";
              var fileName = "";
            }
            oldArr.push(
              performanceCode +
                "_" +
                this.delectKpi[i].performanceCooperationCompany +
                "_" +
                this.delectKpi[i].performanceCooperationSize +
                "_" +
                this.delectKpi[i].performanceCooperationRegion +
                "_" +
                this.delectKpi[i].performanceCooperationItem +
                "_" +
                this.delectKpi[i].performanceCooperationRange +
                "_" +
                this.delectKpi[i].performanceCooperationAmount +
                "_" +
                dealFileCode +
                "_" +
                fileName
            );
          }
          oldStr = oldArr.join(",");
        } else if (this.changeOldKpi.length > 0 && this.delectKpi.length == 0) {
          for (var i in this.changeOldKpi) {
            var performanceCode = this.changeOldKpi[i].performanceCode || "";
            if (this.kpiForm[i].yejiFileDelect) {
              if (this.kpiForm[i].yejiFileDelect.length > 0) {
                var code = [],
                  name = [];
                for (var k in this.kpiForm[i].yejiFileDelect) {
                  code.push(this.kpiForm[i].yejiFileDelect[k].code);
                  name.push(this.kpiForm[i].yejiFileDelect[k].name);
                }
                var dealFileCode = code.join("+");
                var fileName = name.join("+");
              }
            } else {
              var dealFileCode = "";
              var fileName = "";
            }
            oldArr.push(
              performanceCode +
                "_" +
                this.changeOldKpi[i].performanceCooperationCompany +
                "_" +
                this.changeOldKpi[i].performanceCooperationSize +
                "_" +
                this.changeOldKpi[i].performanceCooperationRegion +
                "_" +
                this.changeOldKpi[i].performanceCooperationItem +
                "_" +
                this.changeOldKpi[i].performanceCooperationRange +
                "_" +
                this.changeOldKpi[i].performanceCooperationAmount +
                "_" +
                dealFileCode +
                "_" +
                fileName
            );
          }
          oldStr = oldArr.join(",");
        } else if (this.changeOldKpi.length == 0 && this.delectKpi.length > 0) {
          for (var i in this.delectKpi) {
            var performanceCode = this.delectKpi[i].performanceCode || "";
            if (this.delectKpi[i].dealFileCode) {
              var arr = this.delectKpi[i].dealFileCode.split(",");
              var dealFileCode = arr.join("+");
              if (this.delectKpi[i].fileName) {
                var name = this.delectKpi[i].fileName.split(",");
                var fileName = name.join("+");
              } else {
                var fileName = "";
              }
            } else {
              var dealFileCode = "";
              var fileName = "";
            }
            oldArr.push(
              performanceCode +
                "_" +
                this.delectKpi[i].performanceCooperationCompany +
                "_" +
                this.delectKpi[i].performanceCooperationSize +
                "_" +
                this.delectKpi[i].performanceCooperationRegion +
                "_" +
                this.delectKpi[i].performanceCooperationItem +
                "_" +
                this.delectKpi[i].performanceCooperationRange +
                "_" +
                this.delectKpi[i].performanceCooperationAmount +
                "_" +
                dealFileCode +
                "_" +
                fileName
            );
          }
          oldStr = oldArr.join(",");
        } else {
          oldStr = "";
        }

        console.log(arr);
        if (newStr != oldStr) {
          arr.push({
            zdName: "performance",
            zdLabel: "业绩",
            oldValue: oldStr,
            newValue: newStr,
          });
        }
      } else if (this.indexActive == 0) {
        for (var key in this.changeOldData) {
          if (typeof this.ruleForm[key] != "object") {
            if (this.changeOldData[key] != this.ruleForm[key]) {
              if (key == "licenseValidEnd") {
                var zdLabel = "营业期限-结束时间";
              } else if (key == "licenseValidBegin") {
                var zdLabel = "营业期限-开始时间";
              } else {
                if (!this.$refs[key].label) {
                  var zdLabel = "备注";
                } else {
                  var zdLabel = this.$refs[key].label;
                }
              }
              console.log(zdLabel);
              arr.push({
                zdName: key,
                oldValue: this.changeOldData[key],
                newValue: this.ruleForm[key],
                zdLabel: zdLabel,
              });
            }
          } else {
            if (key == "supplierQualificationsList") {
              // 资质等级
              var oldStr = "",
                newStr = "";
              var oldArr = [],
                newArr = [];
              if (this.ruleForm[key].length > 0) {
                for (var key2 in this.ruleForm[key]) {
                  var spCode = this.ruleForm[key][key2].spCode || "";
                  var spSeverFileCode =
                    this.ruleForm[key][key2].spSeverFileCode || "";
                  var spFileName = this.ruleForm[key][key2].spFileName || "";
                  newArr.push(
                    spCode +
                      "_" +
                      this.ruleForm[key][key2].spType +
                      "_" +
                      this.ruleForm[key][key2].spName +
                      "_" +
                      this.ruleForm[key][key2].spNumber +
                      "_" +
                      this.ruleForm[key][key2].createdDate +
                      "_" +
                      this.ruleForm[key][key2].spLevel +
                      "_" +
                      this.ruleForm[key][key2].spLimit +
                      "_" +
                      spSeverFileCode +
                      "_" +
                      spFileName
                  );
                }
                newStr = newArr.join(",");
                console.log(newStr);
              } else {
                newStr = "";
              }
              if (this.changeOldData[key].length > 0) {
                for (var key2 in this.changeOldData[key]) {
                  var spCode = this.changeOldData[key][key2].spCode || "";
                  var spSeverFileCode =
                    this.changeOldData[key][key2].spSeverFileCode || "";
                  var spFileName =
                    this.changeOldData[key][key2].spFileName || "";
                  oldArr.push(
                    spCode +
                      "_" +
                      this.changeOldData[key][key2].spType +
                      "_" +
                      this.changeOldData[key][key2].spName +
                      "_" +
                      this.changeOldData[key][key2].spNumber +
                      "_" +
                      this.changeOldData[key][key2].createdDate +
                      "_" +
                      this.changeOldData[key][key2].spLevel +
                      "_" +
                      this.changeOldData[key][key2].spLimit +
                      "_" +
                      spSeverFileCode +
                      "_" +
                      spFileName
                  );
                }
                oldStr = oldArr.join(",");
              } else {
                oldStr = "";
              }
              if (newStr != oldStr) {
                arr.push({
                  zdName: "qualifications",
                  zdLabel: "资质证书",
                  oldValue: oldStr,
                  newValue: newStr,
                });
              }
            } else if (key == "supplierPeopleList") {
              // 联系人
              console.log(this.ruleForm[key]);
              var oldStr = "",
                newStr = "";
              var oldArr = [],
                newArr = [];
              if (this.ruleForm[key].length > 0) {
                for (var key2 in this.ruleForm[key]) {
                  if(this.ruleForm[key][key2].peopleType != 3){
                    var peopleCode = this.ruleForm[key][key2].peopleCode || "";
                    newArr.push(
                      peopleCode +
                        "_" +
                        this.ruleForm[key][key2].peopleType +
                        "_" +
                        this.ruleForm[key][key2].peopleName +
                        "_" +
                        this.ruleForm[key][key2].peoplePhone +
                        "_" +
                        this.ruleForm[key][key2].peopleCellPhone +
                        "_" +
                        this.ruleForm[key][key2].peopleEmail +
                        "_" +
                        this.ruleForm[key][key2].peopleIdCode +
                        "_" +
                        this.ruleForm[key][key2].peoplePosition
                    );
                  }
                }
                newStr = newArr.join(",");
                console.log(newStr);
              } else {
                newStr = "";
              }
              if (this.changeOldData[key].length > 0) {
                for (var key2 in this.changeOldData[key]) {
                  if(this.changeOldData[key][key2].peopleType != 3){
                    var peopleCode = this.changeOldData[key][key2].peopleCode || "";
                    oldArr.push(
                      peopleCode +
                        "_" +
                        this.changeOldData[key][key2].peopleType +
                        "_" +
                        this.changeOldData[key][key2].peopleName +
                        "_" +
                        this.changeOldData[key][key2].peoplePhone +
                        "_" +
                        this.changeOldData[key][key2].peopleCellPhone +
                        "_" +
                        this.changeOldData[key][key2].peopleEmail +
                        "_" +
                        this.changeOldData[key][key2].peopleIdCode +
                        "_" +
                        this.changeOldData[key][key2].peoplePosition
                    );
                  }
                }
                oldStr = oldArr.join(",");
              } else {
                oldStr = "";
              }
              if (newStr != oldStr) {
                arr.push({
                  zdName: "people",
                  zdLabel: "人员",
                  oldValue: oldStr,
                  newValue: newStr,
                });
              }
            } else if (key == "shareholderList") {
              // 股东
              console.log(this.ruleForm[key]);
              var oldStr = "",
                newStr = "";
              var oldArr = [],
                newArr = [];
              if (this.ruleForm[key].length > 0) {
                for (var key2 in this.ruleForm[key]) {
                  var peopleCode = this.ruleForm[key][key2].peopleCode || "";
                  newArr.push(
                    peopleCode +
                      "_" +
                      this.ruleForm[key][key2].peopleType +
                      "_" +
                      this.ruleForm[key][key2].peopleName +
                      "_" +
                      this.ruleForm[key][key2].peoplePhone +
                      "_" +
                      this.ruleForm[key][key2].peopleCellPhone +
                      "_" +
                      this.ruleForm[key][key2].peopleEmail +
                      "_" +
                      this.ruleForm[key][key2].peopleIdCode +
                      "_" +
                      this.ruleForm[key][key2].peoplePosition
                  );
                }
                newStr = newArr.join(",");
                console.log(newStr);
              } else {
                newStr = "";
              }
              if (this.changeOldData[key].length > 0) {
                for (var key2 in this.changeOldData[key]) {
                  var peopleCode =
                    this.changeOldData[key][key2].peopleCode || "";
                  oldArr.push(
                    peopleCode +
                      "_" +
                      this.changeOldData[key][key2].peopleType +
                      "_" +
                      this.changeOldData[key][key2].peopleName +
                      "_" +
                      this.changeOldData[key][key2].peoplePhone +
                      "_" +
                      this.changeOldData[key][key2].peopleCellPhone +
                      "_" +
                      this.changeOldData[key][key2].peopleEmail +
                      "_" +
                      this.changeOldData[key][key2].peopleIdCode +
                      "_" +
                      this.changeOldData[key][key2].peoplePosition
                  );
                }
                oldStr = oldArr.join(",");
              } else {
                oldStr = "";
              }
              if (newStr != oldStr) {
                arr.push({
                  zdName: "people",
                  zdLabel: "人员",
                  oldValue: oldStr,
                  newValue: newStr,
                });
              }
            }
            //  else if (key == "supplierSort") {
            //   // 供应商类别

            // } else if (key == "supplierServiceregion") {
            //   // 区域
            // }
          }
        }
      } else if (this.indexActive == 3) {
        // 银行信息
        var oldStr = "",
          newStr = "";
        var oldArr = [],
          newArr = [];
        if (this.moeneyForm.length > 0) {
          for (var i in this.moeneyForm) {
            if (!this.moeneyForm[i].bankOpenName) {
              this.$message.error("开户行类型不能为空！");
              return false;
            }
            if (!this.moeneyForm[i].bankName) {
              this.$message.error("开户行不能为空！");
              return false;
            }
            if (!this.moeneyForm[i].bankNumber) {
              this.$message.error("银行账户不能为空！");
              return false;
            }
            if (!this.moeneyForm[i].bankCurrency) {
              this.$message.error("币种不能为空！");
              return false;
            }
            if (!this.moeneyForm[i].bankBranchName) {
              this.$message.error("开户支行不能为空！");
              return false;
            }
            if (!this.moeneyForm[i].bankFileCode) {
              this.$message.error("相关附件不能为空！");
              return false;
            }
            var bankCode = this.moeneyForm[i].bankCode || "";
            var reg = new RegExp(",", "g"); //g,表示全部替换。
            if (this.moeneyForm[i].bankFileCode) {
              var bankFileCode = this.moeneyForm[i].bankFileCode.replace(
                reg,
                "."
              );
            } else {
              var bankFileCode = "";
            }
            newArr.push(
              bankCode +
                "_" +
                this.moeneyForm[i].bankOpenName +
                "_" +
                this.moeneyForm[i].bankName +
                "_" +
                this.moeneyForm[i].bankNumber +
                "_" +
                this.moeneyForm[i].bankCurrency +
                "_" +
                this.moeneyForm[i].bankDefault +
                "_" +
                this.moeneyForm[i].bankBranchName +
                "_" +
                this.moeneyForm[i].bankBranchNumber +
                "_" +
                bankFileCode +
                "_" +
                this.moeneyForm[i].bankFileName
            );
          }
          newStr = newArr.join(",");
        } else {
          newStr = "";
        }
        if (this.changeOldBank.length > 0) {
          for (var i in this.changeOldBank) {
            var bankCode = this.changeOldBank[i].bankCode || "";
            var reg = new RegExp(",", "g"); //g,表示全部替换。
            if (this.moeneyForm[i].bankFileCode) {
              var bankFileCode = this.moeneyForm[i].bankFileCode.replace(
                reg,
                "."
              );
            } else {
              var bankFileCode = "";
            }
            oldArr.push(
              bankCode +
                "_" +
                this.changeOldBank[i].bankOpenName +
                "_" +
                this.changeOldBank[i].bankName +
                "_" +
                this.changeOldBank[i].bankNumber +
                "_" +
                this.changeOldBank[i].bankCurrency +
                "_" +
                this.changeOldBank[i].bankDefault +
                "_" +
                this.changeOldBank[i].bankBranchName +
                "_" +
                this.changeOldBank[i].bankBranchNumber +
                "_" +
                bankFileCode +
                "_" +
                this.changeOldBank[i].bankFileName
            );
          }
          for (var i in this.delectBankArr) {
            var bankCode = this.delectBankArr[i].bankCode || "";
            if (this.delectBankArr[i].bankFileCode) {
              var arrCode = this.delectBankArr[i].bankFileCode.split(",");
              var bankFileCode = arrCode.join("+");
              if (this.delectBankArr[i].bankFileName) {
                var name = this.delectBankArr[i].bankFileName.split(",");
                var fileName = name.join("+");
              } else {
                var fileName = "";
              }
            } else {
              var dealFileCode = "";
              var fileName = "";
            }
            oldArr.push(
              bankCode +
                "_" +
                this.changeOldBank[i].bankOpenName +
                "_" +
                this.changeOldBank[i].bankName +
                "_" +
                this.changeOldBank[i].bankNumber +
                "_" +
                this.changeOldBank[i].bankCurrency +
                "_" +
                this.changeOldBank[i].bankDefault +
                "_" +
                this.changeOldBank[i].bankBranchName +
                "_" +
                this.changeOldBank[i].bankBranchNumber +
                "_" +
                bankFileCode +
                "_" +
                fileName
            );
          }
          oldStr = oldArr.join(",");
        } else {
          oldStr = "";
        }
        console.log(newStr, oldStr);
        if (newStr != oldStr) {
          arr.push({
            zdName: "bank",
            zdLabel: "银行",
            oldValue: oldStr,
            newValue: newStr,
          });
        }
      } else if (this.indexActive == 2) {
        // 资质证照
        var oldStr = "",
          newStr = "";
        var oldArr = [],
          newArr = [];
        if (this.tableForm.length > 0) {
          for (var i in this.tableForm) {
            var list2 = this.tableForm[i].fileList2;
            var spCode = this.tableForm[i].spCode || "";
            var fileCode = "",
              fileName = "";
            var fileCodeArr = [],
              fileNameArr = [];
            var fileCode2 = "",
              fileName2 = "";
            var fileCodeArr2 = [],
              fileNameArr2 = [];
            if (this.tableForm[i].fileList2.length > 0) {
              for (var k in list2) {
                fileCodeArr.push(list2[k].serviceCode);
                fileNameArr.push(list2[k].name);
              }
              fileCode = fileCodeArr.join("+");
              fileName = fileNameArr.join("+");
            } else {
              fileCode = "";
              fileName = "";
            }
            newArr.push(
              spCode +
                "_" +
                this.tableForm[i].spType +
                "_" +
                this.tableForm[i].spName +
                "_" +
                "" +
                "_" +
                "" +
                "_" +
                "" +
                "_" +
                "" +
                "_" +
                fileCode +
                "_" +
                fileName
            );
            if (this.tableForm[i].delectZZ.length > 0) {
              var delectZZ = this.tableForm[i].delectZZ;
              for (var j in delectZZ) {
                fileCodeArr2.push(delectZZ[k].serviceCode);
                fileNameArr2.push(delectZZ[k].name);
              }
              fileCode2 = fileCodeArr2.join("+");
              fileName2 = fileNameArr2.join("+");
            } else {
              fileCode2 = "";
              fileName2 = "";
            }
            oldArr.push(
              spCode +
                "_" +
                this.tableForm[i].spType +
                "_" +
                this.tableForm[i].spName +
                "_" +
                "" +
                "_" +
                "" +
                "_" +
                "" +
                "_" +
                "" +
                "_" +
                fileCode2 +
                "_" +
                fileName2
            );
          }
          newStr = newArr.join(",");
          oldStr = oldArr.join(",");
        } else {
          newStr = "";
          oldStr = "";
        }
        if (newStr != oldStr) {
          arr.push({
            zdName: "qualifications",
            zdLabel: "资质证书",
            oldValue: oldStr,
            newValue: newStr,
          });
        }
      }

      for (var a in arr) {
        params.updateLineList.push({
          updateAfter: arr[a].newValue, //修改后
          updateBegin: arr[a].oldValue, //修改前
          updateFieldCode: arr[a].zdName, //字段code
          updateFieldName: arr[a].zdLabel, //字段名称
          updateRemark: this.updateRemark, // 备注
        });
      }
      this.api.saveApproveByStatus(this.sso_sessionid, params).then((res) => {
        this.updateHeadCode = res.data.message;
        this.$message.success("发起变更申请成功！");
        setTimeout(() => {
          window.location.href = "about:blank";
          window.close();
        }, 1000);
      });
    },
    
    // 修改值截取
    changeValue(row, value) {
      if(value){
        var arr1 = value.split(",");
        var arr = [];
        if (arr1.length > 0) {
          for (var i in arr1) {
            var arr2 = arr1[i].split("_");
            if(arr2.length>1){
              if (arr2.length > 8) {
                arr2.splice(7, 1);
              }
              arr2.splice(0, 1);
              arr.push(arr2);
            } else {
              return value;
            }
          }
        }
        if(row.UPDATE_FIELD_NAME == '人员'){
          var titleArr = ['人员类型', '姓名', '电话', '手机号', '个人邮箱', '身份证号', '职位'];
          var m = '';
          for(var j in arr){
            for(var k in arr[j]){
              if(arr[j][k] && arr[j][k] != 'undefined' && arr[j][k] != 'null'){
                var val = arr[j][k];
                if(k == 0){
                  if(val == 1){
                    val = '主联系人'
                  } else if(val == 2){
                    val = '联系人'
                  } else if(val == 3){
                    val = '股东'
                  }
                }
                var str = titleArr[k] + '：' + val + '<br>';
                m += (str);
              }
            }
          }
          return m;
        } else if(row.UPDATE_FIELD_NAME == '资质证书'){
          var titleArr = ['证件类型', '资质名称', '资质编号', '证书有效期', '级别', '可承接范围', '附件code', '附件名称'];
          var m = '';
          for(var j in arr){
            for(var k in arr[j]){
              if(arr[j][k] && arr[j][k] != 'undefined' && arr[j][k] != 'null'){
                var val = arr[j][k];
                if(k != 0){
                  var str = titleArr[k] + '：' + val + '<br>';
                  m += (str);
                }
              }
            }
          }
          return m;
        } else if(row.UPDATE_FIELD_NAME == '银行'){
          var titleArr = ['开户银行', '银行名称', '银行账号', '币种', '默认账户', '开户支行', '开户支行行号', '附件code', '附件名称'];
          var m = '';
          for(var j in arr){
            if(j>0){
              m += '-<br>'
            }
            for(var k in arr[j]){
              if(arr[j][k] && arr[j][k] != 'undefined' && arr[j][k] != 'null'){
                var val = arr[j][k];
                if(k != 0){
                  var str = titleArr[k] + '：' + val + '<br>';
                  m += (str);
                }
              }
            }
          }
          return m;
        }
      } else {
        return '';
      }
      
      if (value) {
        var arr1 = value.split(",");
        if (arr1.length > 1) {
          for (var i in arr1) {
            var arr2 = arr1[i].split("_");
            if (arr2.length > 8) {
              arr2.splice(7, 1);
            }
            arr2.splice(0, 1);
            arr1[i] = arr2.join("_");
            console.log(arr1[i])
          }
          return arr1.join(",");
        } else {
          var arr2 = arr1[0].split("_");
          if(arr2.length>1){
            if (arr2.length > 8) {
              arr2.splice(7, 1);
            }
            arr2.splice(0, 1);
            arr1[0] = arr2.join("_");
            return arr1.join(",");
          } else {
             return value;
          }
        }
      }
    },
 
    // 入库审批
    async rukuFn() {
      if (!this.rukuForm.supplierScore) {
        this.$message.error("发起入库审批前，请先点击右侧评估详情进行评分！");
        return;
      }
      if (!this.rukuForm.estimateHeadRemark) {
        this.$message.error("请填写审查意见！");
        return;
      }
      this.$confirm("确认发起入库审批?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.rukuFn2();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    rukuFn2() {
      var params = {
        approveContent: "审定内容",
        approveHeadCode: this.estimateHeadCode,
        approveTitle: "	审定标题",
        estimateHeadRemark: this.rukuForm.estimateHeadRemark,
        supplierScore: this.rukuForm.supplierScore,
        supplierCode: this.supplierCode,
      };
      this.api.supplierByStock(this.sso_sessionid, params).then((res) => {
        setTimeout(() => {
          window.location.href = "about:blank";
          window.close();
        }, 100);
        window.open(res.data.message);
      });
    },

    radioChange(index) {
      this.moeneyForm[index].bankDefault = "Y";
      for (var i in this.moeneyForm) {
        if (i != index) {
          this.moeneyForm[i].bankDefault = "N";
        }
      }
    },
    // 评分改变
    radioChangeFn(row, index) {
      // var f = Number(row.score);
      // this.pgData[index].score = f.toFixed(2);
      // var sum = 0;
      // for (let i in this.pgData) {
      //   sum += Number(this.pgData[i].score);
      // }
      // this.nowScore = sum;
    },
  },
};
</script>

<style lang="less">
@import "../../assets/utils.less";
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
    .el-radio-group{
      display: block;
      .radioRoup {
        width: 100%;
        float: left;
        line-height: 24px;
        white-space: normal;
      }
    }
    
    .el-input__inner {
      width: 100%;
    }
  }
}
.htsd{
  .el-dialog {
    padding-bottom: 50px;
    .el-table{
      width: 96%;
      margin: 10px 2%;
    }
  }
  .el-dialog__header{
    padding: 10px!important;
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
.yj{
  width: 1180px;
  .yejiSpan{
    font-size: 13px;
    color: #666;
    // float: left;
    display: block;
    width: 100%;
    padding-left: 30px;
    margin-top: 20px;
  }
  .el-table{
    width: 1120px;
    float: left;
    margin: 15px 30px;
  }
  .pagination{
    width: 100%;
    float: left;
  }
}

</style>