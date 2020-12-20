<template>
  <div class="information">
    <el-tabs class="infoTabs col-md-12" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C19')" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="潜在" name="1"></el-tab-pane>
      <el-tab-pane label="备选" name="2"></el-tab-pane>
      <el-tab-pane label="合格" name="3"></el-tab-pane>
      <el-tab-pane label="不合格" name="4"></el-tab-pane>
      <el-tab-pane label="黑库" name="5"></el-tab-pane>
    </el-tabs>
    <el-row class="tableArea" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C19')">
      <el-col :span="leftTree" class="leftTree">
          <!-- :icon="iconClass" -->
        <el-button
          @click="clickShow"
          size="mini"
          style="margin-top:20px; padding: 7px 7px;"
          type="primary"
        >{{iconClassName}}</el-button>
        <el-tree
          :data="leiBieData"
          v-show="treeShowIf"
          highlight-current
          :props="defaultProps"
          accordion
          aria-disabled="true"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :span="rightArea" class="borderLeft">
        <headInput
          :headInputData="headInputData"
          @exportFnEmit="exportFnEmit"
          @searchFn="searchFn"
          @zhuanFn="zhuanFn"
        ></headInput>

        <el-table
          key="5"
          :data="tableData"
          border
          size="mini"
          :cell-class-name="hoverClassFn"
          @selection-change="choseFn"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          class="listTable"
          :row-style="rowStyleFn"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column align="left" label="供应商名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="lookDetail(scope.row.SUPPLIER_CODE)"
              >{{scope.row.SUPPLIER_NAME}}</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            v-if="headInputData.type != '3' && headInputData.type != '4' && headInputData.type != '5'"
            label="入库审批状态"
            width="110"
          >
            <template slot-scope="scope">
              <blockquote v-if="weiqijian(scope.row.SUPPLER_SCHEDULE_STATUS)">
                <button type="default" class="DbtnClass" size="mini">未起件</button>
              </blockquote>
              <blockquote class="blockquoteClass" v-else>
                <button
                  type="default"
                  class="DbtnClass"
                  size="mini"
                  v-if="!scope.row.STATUSDESC"
                >未起件</button>
                <button
                  class="btnClass btnClass_bjz"
                  type="default"
                  size="mini"
                  v-if="scope.row.STATUSDESC == '编制中'"
                  slot="reference"
                >{{scope.row.STATUSDESC}}</button>
                <button
                  class="btnClass btnClass_yzz"
                  type="default"
                  size="mini"
                  v-if="scope.row.STATUSDESC == '已终止'"
                  slot="reference"
                >{{scope.row.STATUSDESC}}</button>
                <button
                  class="btnClass btnClass_yth"
                  size="mini"
                  v-if="scope.row.STATUSDESC == '已退回'"
                  slot="reference"
                  type="default"
                >{{scope.row.STATUSDESC}}</button>
                <button
                  class="btnClass btnClass_spz"
                  type="default"
                  size="mini"
                  v-if="scope.row.STATUSDESC == '审批中'"
                  slot="reference"
                >{{scope.row.STATUSDESC}}</button>
                <button
                  class="btnClass btnClass_yqh"
                  type="default"
                  size="mini"
                  v-if="scope.row.STATUSDESC == '已取回'"
                  slot="reference"
                >{{scope.row.STATUSDESC}}</button>
                <button
                  class="btnClass btnClass_ytg"
                  type="success"
                  size="mini"
                  v-if="scope.row.STATUSDESC == '已通过'"
                  slot="reference"
                >{{scope.row.STATUSDESC}}</button>
              </blockquote>

              <div class="el_Popver">
                <div class="popoverClass">
                  <div class="jtCss"></div>
                  <div class="clickClass">
                    <span style="float:left;">审定：</span>
                    <p @click="toApproval(scope.row.APPROVEURL)">{{scope.row.APPROVENUMBER}}</p>
                  </div>
                  <span>加急：{{scope.row.URGENT == "Y" ? '是' : '否'}}</span>
                  <span>状态：【{{scope.row.STATUSDESC}}】</span>
                  <div class="lineDiv"></div>
                  <span class="h">当前审批人：{{scope.row.ASSIGNEENAME}}</span>
                  <span class="h">下一审批环节：{{scope.row.NEXTTASKNAME}}</span>
                </div>
                <div class="popperArrow"></div>
              </div>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            align="center"
            v-if="headInputData.type == '5'"
            label="转潜在审批状态"
            width="110"
          >
            <template slot-scope="scope">
              <blockquote class="blockquoteClass">
                <button
                  type="default"
                  class="DbtnClass"
                  size="mini"
                  v-if="!scope.row.BASTATUSDESC"
                >未起件</button>
                <button
                  class="btnClass btnClass_bjz"
                  type="default"
                  size="mini"
                  v-if="scope.row.BASTATUSDESC == '编制中'"
                  slot="reference"
                >{{scope.row.BASTATUSDESC}}</button>
                <button
                  class="btnClass btnClass_yzz"
                  type="default"
                  size="mini"
                  v-if="scope.row.BASTATUSDESC == '已终止'"
                  slot="reference"
                >{{scope.row.BASTATUSDESC}}</button>
                <button
                  class="btnClass btnClass_yth"
                  size="mini"
                  v-if="scope.row.BASTATUSDESC == '已退回'"
                  slot="reference"
                  type="default"
                >{{scope.row.BASTATUSDESC}}</button>
                <button
                  class="btnClass btnClass_spz"
                  type="default"
                  size="mini"
                  v-if="scope.row.BASTATUSDESC == '审批中'"
                  slot="reference"
                >{{scope.row.BASTATUSDESC}}</button>
                <button
                  class="btnClass btnClass_yqh"
                  type="default"
                  size="mini"
                  v-if="scope.row.BASTATUSDESC == '已取回'"
                  slot="reference"
                >{{scope.row.BASTATUSDESC}}</button>
                <button
                  class="btnClass btnClass_ytg"
                  type="success"
                  size="mini"
                  v-if="scope.row.BASTATUSDESC == '已通过'"
                  slot="reference"
                >{{scope.row.BASTATUSDESC}}</button>
              </blockquote>

              <div class="el_Popver">
                <div class="popoverClass">
                  <div class="jtCss"></div>
                  <div class="clickClass">
                    <span style="float:left;">审定：</span>
                    <p @click="toApproval(scope.row.BAAPPROVEURL)">{{scope.row.BAAPPROVENUMBER}}</p>
                  </div>
                  <span>加急：{{scope.row.BAURGENT == "Y" ? '是' : '否'}}</span>
                  <span>状态：【{{scope.row.BASTATUSDESC}}】</span>
                  <div class="lineDiv"></div>
                  <span class="h">当前审批人：{{scope.row.BAASSIGNEENAME}}</span>
                  <span class="h">下一审批环节：{{scope.row.BANEXTTASKNAME}}</span>
                </div>
                <div class="popperArrow"></div>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="SUPPLER_SCHEDULE_STATUS" align="center" label="状态" width="100">
            <template slot-scope="scope">
              <span>{{checkStatusReturn(scope.row.SUPPLER_SCHEDULE_STATUS)}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="headInputData.type == '3'" align="center" label="分数" width="60">
            <template slot-scope="scope">
              <span>{{Number(scope.row.SUPPLIER_SCORE).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="headInputData.type == '3'" align="center" label="星级" width="60">
            <template slot-scope="scope">
              <span>{{(scope.row.SUPPLIER_STAR)}}星</span>
            </template>
          </el-table-column>
          <el-table-column prop="PEOPLE_NAME" align="center" label="联系人" width="80"></el-table-column>
          <el-table-column prop="PEOPLE_CELL_PHONE" align="center" label="联系电话" width="100"></el-table-column>
          <el-table-column prop="CREATED_NAME" align="center" label="创建人" width="80"></el-table-column>
          <el-table-column align="center" label="创建时间" width="90">
            <template slot-scope="scope">
              <span>{{returnDate(scope.row.CREATED_DATE)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="132">
            <template slot-scope="scope">
              <div v-if="headInputData.type == 1">
                <el-button
                  v-if="(!scope.row.SUPPLER_SCHEDULE_STATUS || scope.row.SUPPLER_SCHEDULE_STATUS == '2' || scope.row.SUPPLER_SCHEDULE_STATUS == '14') && hasQx('aph2_supplier_GYSXXGL-QX-C34')"
                  type="text"
                  @click="zizhishencha(scope.row.SUPPLIER_CODE)"
                  size="mini"
                >资质审查</el-button>
                <el-button
                  v-if="(!scope.row.SUPPLER_SCHEDULE_STATUS || scope.row.SUPPLER_SCHEDULE_STATUS == '2' || scope.row.SUPPLER_SCHEDULE_STATUS == '14') && hasQx('aph2_supplier_GYSXXGL-QX-C14')"
                  type="text"
                  size="mini"
                  @click="changeInfo(scope.row.SUPPLIER_CODE)"
                >修改</el-button>
                <el-button
                  v-if="(scope.row.SUPPLER_SCHEDULE_STATUS == '1' || scope.row.SUPPLER_SCHEDULE_STATUS == '3' || scope.row.SUPPLER_SCHEDULE_STATUS == '5') && hasQx('aph2_supplier_GYSXXGL-QX-C34')"
                  type="text"
                  size="mini"
                  @click="xckcFn(scope.row.SUPPLIER_CODE, 'xcks')"
                >现场考察</el-button>
                <el-button
                  v-if="(scope.row.SUPPLER_SCHEDULE_STATUS == 9 || scope.row.SUPPLER_SCHEDULE_STATUS == 6 || scope.row.SUPPLER_SCHEDULE_STATUS == 4 || scope.row.SUPPLER_SCHEDULE_STATUS == '3.1') && hasQx('aph2_supplier_GYSXXGL-QX-C34')"
                  type="text"
                  size="mini"
                  @click="rukuSp(scope.row.SUPPLIER_CODE)"
                >入库审批</el-button>
                <el-button
                  v-if="scope.row.SUPPLER_SCHEDULE_STATUS"
                  type="text"
                  size="mini"
                  @click="chakanSp(scope.row.SUPPLIER_CODE)"
                >查看审批</el-button>
              </div>
              <el-button
                v-if="headInputData.type == 5"
                @click="chakanSp(scope.row.SUPPLIER_CODE)"
                type="text"
                size="mini"
              >查看审批</el-button>

              <el-button
                v-if="headInputData.type == 4"
                @click="chakanSp(scope.row.SUPPLIER_CODE)"
                type="text"
                size="mini"
              >查看审批</el-button>
              <div v-if="headInputData.type == 3">
                <el-button type="text" size="mini" @click="chakanSp(scope.row.SUPPLIER_CODE)">查看审批</el-button>
                <el-button
                  v-if="(!scope.row.BAAPPROVESTATUS || scope.row.BAAPPROVESTATUS == 'STOP') && scope.row.UPDATE_APPROVE_STATUS != 'submit' && hasQx('aph2_supplier_GYSXXGL-QX-C68')"
                  type="text"
                  size="mini"
                  @click="changeInfoApprove(scope.row.SUPPLIER_CODE)"
                >变更</el-button>
                <el-button
                  v-if="(!scope.row.BAAPPROVESTATUS || scope.row.BAAPPROVESTATUS == 'STOP') && hasQx('aph2_supplier_GYSXXGL-QX-C80')"
                  @click="starChange(scope.row.SUPPLIER_CODE, scope.row.STAR_CHANG_CODE)"
                  type="text"
                  size="mini"
                >星级调整</el-button>
                <span
                  v-if="(!scope.row.BAAPPROVESTATUS || scope.row.BAAPPROVESTATUS == 'STOP') && scope.row.UPDATE_APPROVE_STATUS == 'submit'"
                  type="text"
                  style="color: #999;"
                  size="mini"
                >变更申请中</span>
              </div>

              <div v-if="headInputData.type == 2">
                <el-button
                  v-if="(scope.row.SUPPLER_SCHEDULE_STATUS == '1' || scope.row.SUPPLER_SCHEDULE_STATUS == '13' || scope.row.SUPPLER_SCHEDULE_STATUS == '3' || scope.row.SUPPLER_SCHEDULE_STATUS == '5') && hasQx('aph2_supplier_GYSXXGL-QX-C34')"
                  type="text"
                  size="mini"
                  @click="xckcFn(scope.row.SUPPLIER_CODE, 'cxks')"
                >重新考察</el-button>
                <el-button
                  v-if="(scope.row.SUPPLER_SCHEDULE_STATUS == 9 || scope.row.SUPPLER_SCHEDULE_STATUS == 6 || scope.row.SUPPLER_SCHEDULE_STATUS == 4 || scope.row.SUPPLER_SCHEDULE_STATUS == '3.1') && hasQx('aph2_supplier_GYSXXGL-QX-C34')"
                  type="text"
                  size="mini"
                  @click="rukuSp(scope.row.SUPPLIER_CODE)"
                >入库审批</el-button>
                <el-button @click="chakanSp(scope.row.SUPPLIER_CODE)" type="text" size="mini">查看审批</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="xckcArea">
      <el-dialog :title="kcTitle" :visible.sync="xckcFormShow" @close="ksClose">
        <h4 style="margin-bottom: 12px;">基本信息</h4>
        <div class="kcJbxx">
          <span>供应商名称</span>
          <p :title="kcJbxx.SUPPLIER_NAME">{{kcJbxx.SUPPLIER_NAME}}</p>
        </div>
        <div class="kcJbxx">
          <span>企业性质</span>
          <p>{{kcJbxx.ESTABLISHMENT_NATURE}}</p>
        </div>
        <div class="kcJbxx">
          <span>法定代表人</span>
          <p>{{kcJbxx.CEO_NAME}}</p>
        </div>
        <div class="kcJbxx">
          <span>企业注册年份</span>
          <p>{{kcJbxx.ESTABLISHMENT_FOUND_DATE}}</p>
        </div>
        <div class="kcJbxx">
          <span>企业注册地址</span>
          <p
            :title="kcJbxx.ESTABLISHMENT_REGISTER_ADDRESS"
          >{{kcJbxx.ESTABLISHMENT_REGISTER_ADDRESS}}</p>
        </div>
        <div class="kcJbxx">
          <span>注册资本</span>
          <p>{{kcJbxx.REGISTERED_CAPITAL}}</p>
        </div>
        <div class="kcJbxx">
          <span>服务区域</span>
          <p :title="kcJbxx.SUPPLIER_SERVICEREGION">{{kcJbxx.SUPPLIER_SERVICEREGION}}</p>
        </div>
        <div class="kcJbxx">
          <span>供应商类别</span>
          <p :title="kcJbxx.SUPPLIER_SORT_NAME">{{kcJbxx.SUPPLIER_SORT_NAME}}</p>
        </div>
        <el-form :model="xckcForm" :inline="true" size="mini" :disabled="popupType == 'kcdf'">
          <h4>考察模板及人员设置</h4>
          <el-form-item
          required
            v-if="popupType != 'kcdf'"
            style="width: 100%"
            label="考察模板"
            :label-width="formLabelWidth"
          >
            <a download href="../assets/FC5-WS-03%20第一资产供应商考察报告单.xls">FC5-WS-03%20第一资产供应商考察报告单</a>
          </el-form-item>
          <el-form-item label="考察组长" required :label-width="formLabelWidth">
            <el-input
              :title="xckcForm.inspectLeaderName"
              class="btnInput"
              v-model="xckcForm.inspectLeaderName"
              autocomplete="off"
            ></el-input>
            <el-button type="primary" size="mini" @click="chosePeople('leader')">选择</el-button>
          </el-form-item>
          <el-form-item label="考察组员" required :label-width="formLabelWidth">
            <el-input
              :title="xckcForm.inspectMembersName"
              class="btnInput"
              v-model="xckcForm.inspectMembersName"
              autocomplete="off"
            ></el-input>
            <el-button type="primary" size="mini" @click="chosePeople('cy')">选择</el-button>
          </el-form-item>
          <el-form-item label="考察项目" required :label-width="formLabelWidth">
            <el-input v-model="xckcForm.inspectItem" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="考察时间" required :label-width="formLabelWidth">
            <el-date-picker
              v-model="xckcForm.inspectDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div v-if="popupType == 'kcdf'">
          <h4>考察报告</h4>
          <div class="bgMuban">
            <span>考察模板</span>
            <a v-for="(item, index) in modelList" :key="index" href="../assets/FC5-WS-03%20第一资产供应商考察报告单.xls" download target="_blank">{{item}}</a>
          </div>
          <el-form :model="passForm" :inline="true" size="mini">
            <el-form-item label="考察得分" required :label-width="formLabelWidth">
              <el-input v-model="passForm.inspectScore" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="width:100%" required label="考察意见" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="passForm.inspectOpinion" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="width:100%" required label="考察报告" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                :action="actionUrl"
                :data="uploadData"
                :on-success="(res, file, fileList)=> uploadSuccess(res, file, fileList)"
                :on-exceed="exceedFn"
                :file-list="bgFileList"
                :limit="10"
                :multiple="true"
              >
                <el-button size="mini" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="xckcFormShow = false">取 消</el-button>
          <el-button v-if="popupType != 'kcdf'" size="mini" type="primary" @click="tgxckc">跳过现场考察</el-button>
          <el-button
            v-if="popupType != 'kcdf'"
            size="mini"
            type="primary"
            @click="fqShenqing"
          >发起现场考察申请</el-button>
          <el-button
            v-if="popupType == 'kcdf' && headInputData.type != 2"
            size="mini"
            type="primary"
            @click="kcPassNot('转不合格')"
          >转不合格</el-button>
          <el-button
            v-if="popupType == 'kcdf'"
            size="mini"
            type="primary"
            @click="kcPassNot('考察不通过')"
          >退回修改</el-button>
          <el-button
            v-if="popupType == 'kcdf'"
            size="mini"
            type="primary"
            @click="kcPass('通过')"
          >考察通过</el-button>
        </div>
        <member-list ref="member_list" :memberList="memberList" @memberListFn="memberListFn"></member-list>
      </el-dialog>
    </div>

    <div class="star">
      <el-dialog
        title="星级调整"
        @close="changeCloseFn"
        :visible.sync="starChangeShow"
        width="1000px"
        top="5vh"
      >
        <h4>基本信息</h4>
        <div class="info">
          <p>
            <span>供应商名称</span>
            <span class="ctspan" :title="starInfo.name">{{starInfo.name}}</span>
          </p>
          <p>
            <span>供应商类别</span>
            <span class="ctspan" :title="starInfo.sort">{{starInfo.sort}}</span>
          </p>
        </div>
        <h4>入库得分</h4>
        <div class="historyInfo">
          <el-table :data="rukuScoreList" border size="mini" style="width: 100%;margin: 20px auto;">
            <el-table-column label="时间" align="center">
              <template slot-scope="scope">
                <span v-if="scope.$index == 0">考察： {{returnDate(scope.row.updatedDate, '111')}}</span> 
                <span v-if="scope.$index == 1">入库： {{returnDate(scope.row.updatedDate, '111')}}</span> 
              </template>
            </el-table-column>
            <el-table-column label="得分" align="center">
              <template slot-scope="scope">
                <span v-if="scope.$index == 0">{{scope.row.inspectScore}}</span> 
                <span v-if="scope.$index == 1">{{scope.row.estimateScore}}</span> 
                
              </template>
            </el-table-column>
          </el-table>
        </div>
        <h4>评分加权平均</h4>
        <el-table :data="pfJiaQuanList" border size="mini" style="width: 100%;margin: 20px auto;">
          <el-table-column label="创建时间" align="center" width="100">
            <template slot-scope="scope">
                {{returnDate(scope.row.CREATED_DATE)}}
              </template>
          </el-table-column>
          <el-table-column prop="ESTIMATE_HEAD_TYPE" label="类型" align="center"></el-table-column>
          <el-table-column prop="MEMO" label="付款用途（名称）" align="center"></el-table-column>
          <el-table-column prop="PAY_NUMBER" label="审定编号" align="center"></el-table-column>
          <el-table-column prop="ESTIMATE_SCORE" label="加权得分" align="center"></el-table-column>
        </el-table>

        <h4>半年度/年度考评</h4>
        <el-table :data="yearKpiList" border size="mini" style="width: 100%;margin: 20px auto;">
          <el-table-column prop="estimateHeadYear" label="评估年度" align="center" width="100"></el-table-column>
          <el-table-column prop="estimateHeadType" label="评估类型" align="center"></el-table-column>
          <el-table-column prop="estimateHeadEndDate" label="完成评估时间" align="center"></el-table-column>
          <el-table-column prop="estimateScore" label="合计得分" align="center"></el-table-column>
        </el-table>
        <h4>评星定级</h4>
        <el-table :data="starLevelList1" border size="mini" style="width: 100%;margin: 20px auto;">
          <el-table-column prop="supplierName" label="供应商名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="supplierSortName" label="供应商类别" align="center" show-overflow-tooltip width="90"></el-table-column>
          <el-table-column label="入库得分" align="center" width="70">
            <template slot-scope="scope">{{Number(scope.row.supplierInitScore).toFixed(2)}}</template>
          </el-table-column>
          <el-table-column prop="supplierDayScore" label="评分加权平均" align="center" width="60"></el-table-column>
          <el-table-column prop="supplierYearScore" label="半年度/年度考评" align="center" width="80"></el-table-column>
          <el-table-column label="调剂分值（-10~10分）" align="center" width="100">
            <template slot-scope="scope">
              <el-input
               :disabled="approveIng"
                @input="jyScore(scope.row.starChangScore, scope.$index)"
                @blur="jyScore2(scope.row.starChangScore, scope.$index)"
                v-model="scope.row.starChangScore"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="supplierHistoryStar" label="历史星级" align="center" width="80">
            <template slot-scope="scope">
              {{scope.row.supplierStar || 0}}星
            </template>
          </el-table-column>
          <el-table-column prop="starBeginScore" label="综合得分" align="center" width="70"></el-table-column>
          
          <el-table-column label="星级" align="center" width="60">
            <template slot-scope="scope">{{returnStar(scope.row)}}星</template>
          </el-table-column>
          <el-table-column label="是否战略协议" align="center" width="130">
            <template slot-scope="scope">
              <el-radio-group
               :disabled="approveIng" v-model="scope.row.supplierStrategy" size="mini">
                <el-radio label="Y">是</el-radio>
                <el-radio label="N">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="100">
            <template slot-scope="scope">
              <el-input :disabled="approveIng" v-model="scope.row.starChangOption" size="mini"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button size="mini" @click="changeCloseFn">取 消</el-button>
          <el-button :disabled="approveIng" size="mini" type="primary" @click="saveFn('change')">保存</el-button>
          <el-button :disabled="approveIng" size="mini" type="primary" @click="starApprove">发起审定</el-button>
        </div>
      </el-dialog>
    </div>
    <Pagination
      v-if="hasQx('aph2_supplier_GYSXXGL-QX-C19')"
      :currentPage="currentPage"
      :paginationShow="paginationShow"
      :total="total"
      @changePage="changePage"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "../components/pagination";
import headInput from "../components/headInput";
import memberList from "../components/memberList";
import base from "../api/base";
export default {
  data() {
    return {
      approveIng: false,
      paginationShow: true,
      changeList: [], // 变更列表
      leftTree: 1,
      rightArea: 23,
      treeShowIf: false,
      iconClass: "el-icon-caret-right",
      iconClassName: '展开',
      propsType: {
        multiple: true,
        children: "nodeList",
        label: "name",
        value: "id",
      },
      optionsSort: "",
      currentPage: 1,
      total: 0,
      activeName: "1",
      headInputData: {
        type: 1,
        tabs: "1",
      },
      sso_sessionid: sessionStorage.getItem("sso_sessionid"),
      dialogFormVisible: true,
      ruleForm: {},
      tableData: [],
      searchData: {
        supplierName: "",
        supplierStatus: "",
        supplierSort: "",
        status: "",
          supplierStar: '',
        page: 1,
        size: 10,
      },
      supplierStatusArr: ["潜在", "备选/备选", "合格", "不合格", "黑库"],
      selectOptions: [],
      tabsStatusObj: [
        [
          {
            value: "资质审查",
            label: "资质审查",
          },
          {
            value: "现场考察",
            label: "现场考察",
          },
          {
            value: "入库审批",
            label: "入库审批",
          },
          {
            value: "现场考察中",
            label: "现场考察中",
          },
          {
            value: "入库审批中",
            label: "入库审批中",
          },
        ],
        [
          {
            value: "备选",
            label: "备选",
          },
        ],
        [
          {
            value: "转不合格审批中",
            label: "转不合格审批中",
          },
          {
            value: "转备选审批中",
            label: "转备选审批中",
          },
          {
            value: "转黑库审批中",
            label: "转黑库审批中",
          },
          {
            value: "合格",
            label: "合格",
          },
        ],
        [
          {
            value: "转潜在审批中",
            label: "转潜在审批中",
          },
          {
            value: "转黑库审批中",
            label: "转黑库审批中",
          },
          {
            value: "不合格",
            label: "不合格",
          },
        ],
        [
          {
            value: "转潜在审批中",
            label: "转潜在审批中",
          },
          {
            value: "黑库",
            label: "黑库",
          },
        ],
      ],
      xckcFormShow: false,
      xckcForm: {
        inspectLeaderName: "",
        inspectMembersName: "",
        inspectLeader: "",
        inspectMembers: "",
        inspectLeaderArr: "",
        inspectMembersArr: "",
        inspectDate: "",
        inspectItem: "",
        inspectType: "1",
        inspectModel: "FC5-WS-03%20第一资产供应商考察报告单.xls",
        supplierCode: "",
        supplerRowNum: "",
      },
      formLabelWidth: "100px",
      zhuanData: [],
      kcTitle: "",
      kcJbxx: {},
      memberList: {
        // 选择职员参数
        isShow: false,
        type: "",
        selectArr: [],
      },
      choseObj: {},
      popupType: "xcks",
      passForm: {
        inspectOpinion: "",
        inspectScore: "",
        inspectCode: "",
        supplierCode: "",
        inspectStatusName: "",
        supplerScheduleStatus: "",
        supplierStatus: "",
        supplerRowNum: "",
      },
      uploadData: {
        fileType: "14",
        headCode: "",
        fileDescription: "",
      },
      actionUrl:
        base.fileUploadList +
        "?sso_sessionid=" +
        sessionStorage.getItem("sso_sessionid"),
      bgFileList: [],
      leiBieData: [],
      defaultProps: {
        children: "nodeList",
        label: "name",
      },
      suppType: {
        categoryName: "",
        categoryNumber: "",
        parentCategoryCode: "",
      },
      starChangeShow: false,
      starInfo: {}, // 基本信息
      rukuScoreList: [], //入库的分
      pfJiaQuanList: [], //评分加权
      yearKpiList: [], // 年度半年度考评
      starLevelList1: [], // 评星定级列表
      codeObj: {
        supplierCode: '',
        starChangCode: ''
      }
    };
  },
  mounted() {
    this.$store.commit("modifyindexSi", "1");
    this.searchData.supplierStatus = this.headInputData.type;
    this.getListByPageFn();
    this.getsuppType();
  },
  methods: {
    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // zhankai 收起
    clickShow() {
      this.treeShowIf = !this.treeShowIf;
      if (!this.treeShowIf) {
        this.leftTree = 1;
        this.rightArea = 23;
        this.iconClass = "el-icon-caret-right";
        this.iconClassName = '展开';
      } else {
        this.iconClass = "el-icon-caret-left";
        this.iconClassName = '收起';
        this.leftTree = 4;
        this.rightArea = 20;
      }
    },
    // 供应商状态回显
    checkStatusReturn(status) {
      var strArr = [
        "资质审查",
        "退回修改",
        "现场考察",
        "跳过现场考察",
        "考察不通过",
        "入库审核",
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
      } else if(!status){
        return "系统导入";
      } else {
        return "";
      }
    },
    // 供应商类别选择
    handleNodeClick(data) {
      this.searchData.supplierSort = data.segmentValue;
      this.searchData.page = 1;
      this.getListByPageFn();
    },
    // 查看详情
    lookDetail(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "look",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    // 修改
    changeInfo(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "edit",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    // 星际调整
    starChange(code, starChangCode) {
      this.starChangeShow = true;
      this.codeObj = {
        starChangCode: starChangCode,
        supplierCode: code,
      };
      this.api.getStarChangeByCode(this.sso_sessionid, this.codeObj).then((res) => {
        this.starInfo.name = res.data.data.supplier[0].supplierName;
        this.starInfo.sort = res.data.data.supplier[0].supplierSortName;
        
        this.rukuScoreList = [];
        this.rukuScoreList.push(res.data.data.supplierInspect);
        this.rukuScoreList.push(res.data.data.E3[0]);
        this.pfJiaQuanList = res.data.data.dayEstimateList;
        
        this.yearKpiList = res.data.data.E12;
        for(let i in res.data.data.starChangeList){
          if(!res.data.data.starChangeList[i].supplierStrategy){
            res.data.data.starChangeList[i].supplierStrategy = 'N';
          }
        }
        res.data.data.starChangeList[0].supplierInitScore = res.data.data.supplier[0].supplierScore;
        res.data.data.starChangeList[0].starBeginScore = (Number(res.data.data.supplier[0].supplierScore) + Number(res.data.data.starChangeList[0].starChangScore)).toFixed(2);
        
        this.starLevelList1 = res.data.data.starChangeList;
        console.log(this.starLevelList1)
        // debugger
        if(this.starLevelList1[0].approveStatus == 'submit'){
          this.approveIng = true;
        } else {
          this.approveIng = false;
        }
      });
    },
    // 关闭
    changeCloseFn() {
      this.starChangeShow = false;
      this.codeObj = {
        starChangCode: '',
        supplierCode: '',
      };
      this.starInfo = {};
      this.rukuScoreList = [];
      this.pfJiaQuanList = [];
      this.yearKpiList = [];
      this.starLevelList1 = [];
    },
    // 保存-星级调整
    saveFn(from) {
      var data = this.starLevelList1[0];
      if(!data.starChangScore){
        this.$message.error('调剂分值不能为空！');
        return false;
      }
      var params = {
        supplierCode: this.codeObj.supplierCode,
        starBeginScore: data.starBeginScore,
        starChangOption: data.starChangOption,
        starChangScore: data.starChangScore,
        starChangCode: this.codeObj.starChangCode,
        supplierDayScore: data.supplierDayScore,
        supplierInitScore: data.supplierInitScore,
        supplierYearScore: data.supplierYearScore,
        supplierHistoryStar: data.supplierHistoryStar,
        supplierStrategy: data.supplierStrategy,
      }
      this.api.saveStartChange(this.sso_sessionid, params).then((res) => {
        this.codeObj.starChangCode = res.data.message;
        if(from == 'approve'){
          this.starApprove2();
        } else {
          this.$message.success('保存成功！');
          this.changeCloseFn();
        }
      });
    },
    async starApprove() {
      this.$confirm("确认调整星级分值并发起审批?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.saveFn('approve');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    starApprove2() {
      var data = this.starLevelList1[0];
      var params = {
        approveContent: "星级调整-内容",
        approveTitle: "星级调整-标题",
        approveHeadCode: this.codeObj.starChangCode,
        estimateHeadRemark: data.starChangOption,
        supplierCode: this.codeObj.supplierCode,
      };
      this.api.getApproveByStartChange(this.sso_sessionid, params).then((res) => {
        console.log(res);
        this.changeCloseFn();
        window.open(res.data.message);
      });
    },
    // 校验调剂分支
    jyScore(value, index) {
      value = value.replace(/[^\d.-]/g, ""); //清除"数字"和"."以外的字符
      value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是
      value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数\
      this.starLevelList1[index].starChangScore = value;
    },
    jyScore2(value, index) {
      if (isNaN(value)) {
        this.$message.error("调剂分值请输入-10~10之间的数字！");
        this.starLevelList1[index].starChangScore = 0;
      } else {
        if (value > 10 || value < -10) {
          this.$message.error("调剂分值请输入-10~10之间的数字！");
          this.starLevelList1[index].starChangScore = 0;
        }
      }
      this.starLevelList1[index].starBeginScore = (Number(this.starLevelList1[index].supplierInitScore) + Number(this.starLevelList1[index].starChangScore)).toFixed(2);
    },
    // 生成星级
    returnStar(row) {
      return this.commonFn.returnStar(row);
    },
    // 变更
    changeInfoApprove(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "change",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },

    zizhishencha(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "sc",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    rukuSp(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "rukuSp",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    chakanSp(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "cksp",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    // 给审批按钮加类名
    hoverClassFn(row) {
      if (this.headInputData.type == 3) {
        if (row.columnIndex == 3 || row.columnIndex == 4) {
          return "hoverClass";
        } else {
          return "";
        }
      } else {
        if (row.columnIndex == 3) {
          return "hoverClass";
        } else {
          return "";
        }
      }
    },
    // 上传
    uploadSuccess(res, file, fileList) {
      this.bgFileList = fileList;
    },
    exceedFn() {
      this.$message.error("最多上传十个附件");
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },
    // 列表多选 状态改变事件
    choseFn(v) {
      console.log(v);
      this.zhuanData = v;
    },
    // 分页
    changePage(page, size) {
      this.searchData.page = page;
      this.getListByPageFn();
    },
    // 每行的特殊处理
    rowStyleFn({ row, rowIndex }) {
      // console.log(row, rowIndex);
    },
    // 点击切换大状态
    handleClick(tab, event) {
      this.headInputData.type = Number(tab.index) + 1;
      this.searchData.supplierStatus = Number(tab.index) + 1;
      this.tableData = [];
      if (tab.index == 5) {
        this.getUpdateByPage();
      } else {
        this.getListByPageFn();
      }
    },
    // 导出
    exportFnEmit(name) {
      var status = this.supplierStatusArr[this.headInputData.type - 1];
      var params = {
        exportExcel: "exportExcel",
        supplierStatus: this.headInputData.type,
        supplierName: name,
      };
      this.api.excelSupplier(this.sso_sessionid, params).then((res) => {
        window.open(res.config.baseURL + res.config.url);
      });
    },
    // 获取列表
    getListByPageFn() {
      this.api.supplierInfo(this.sso_sessionid, this.searchData).then((res) => {
        this.total = Number(res.data.count);
        this.tableData = res.data.data;
        // this.tableData = [{}];
      });
    },
    getBlacklistByPageFn() {
      this.api
        .getBlacklistByPage(this.sso_sessionid, this.searchData)
        .then((res) => {
          this.total = Number(res.data.count);
          this.tableData = res.data.data;
          // this.tableData = [{}];
        });
    },
    // 查询/重置
    searchFn(res, type) {
      this.paginationShow = false;
      this.$nextTick(function () {
        this.paginationShow = true;
      });
      if (type == "reset") {
        this.searchData = {
          supplerName: "",
          supplierStatus: this.searchData.supplierStatus,
          supplierSort: "",
          supplierStar: '',
          status: "",
          page: 1,
          size: 10,
        };
      } else {
        this.searchData = {
          supplierName: res.supplierName,
          supplierStatus: this.searchData.supplierStatus,
          status: res.supplierStatus,
          supplierSort: this.searchData.supplierSort,
          supplierStar: res.supplierStar,
          page: 1,
          size: 10,
        };
      }
        this.getListByPageFn();
    },
    // 关闭考察弹窗
    ksClose() {
      this.bgFileList = [];
      this.kcJbxx = {};
      this.xckcForm = {
        inspectLeaderName: "",
        inspectMembersName: "",
        inspectLeader: "",
        inspectMembers: "",
        inspectLeaderArr: "",
        inspectMembersArr: "",
        inspectType: "1",
        inspectDate: "",
        inspectItem: "",
        inspectModel: "FC5-WS-03%20第一资产供应商考察报告单.xls",
        supplierCode: "",
        supplerRowNum: "",
      };
      this.passForm = {
        inspectOpinion: "",
        inspectScore: "",
        inspectCode: "",
        supplierCode: "",
        inspectStatusName: "",
        supplerScheduleStatus: "",
        supplierStatus: "",
        supplerRowNum: "",
      };
    },
    // 现场考察
    xckcFn(code, type) {
      this.xckcFormShow = true;
      if (type == "xcks") {
        this.kcTitle = "发起现场考察申请";
      } else if (type == "cxks") {
        this.kcTitle = "重新发起现场考察申请";
      } else if (type == "kcsx") {
        this.kcTitle = "考察升星";
      }
      this.popupType = type;
      this.api
        .getSupplierByInspect(this.sso_sessionid, { supplierCode: code })
        .then((res) => {
          this.kcJbxx = res.data.data[0];
          this.xckcForm.supplierName =res.data.data[0].SUPPLIER_NAME;
          var supp = res.data.data[0].SUPPLIER_SORT;
          var sortArr = [];
          if (supp) {
            sortArr = supp.split(",");
          }
          var sortArr2 = [];
          for (let j in sortArr) {
            sortArr2.push(sortArr[j].split("_"));
          }
          this.kcJbxx.SUPPLIER_SORT = sortArr2;
          if (res.data.data[0].INSPECT_MODEL) {
            this.modelList = res.data.data[0].INSPECT_MODEL.split(",");
          }

          this.xckcForm.inspectItem = res.data.data[0].INSPECT_ITEM;
          this.xckcForm.inspectDate = res.data.data[0].INSPECT_DATE;
          this.xckcForm.supplierCode = res.data.data[0].SUPPLIER_CODE;
          var str = [],
            str2 = [];
          if (res.data.data[0].INSPECT_RESULT != "STOP") {
            if (res.data.data[0].INSPECT_LEADER) {
              this.popupType = "kcdf";
              this.kcTitle = "现场考察-组长打分";
            }
          }
          var leadersArr = [],
            memberArr = [];
          if (res.data.data[0].INSPECT_LEADER) {
            var arr = res.data.data[0].INSPECT_LEADER.split(",");
            for (var i = 0; i < arr.length; i++) {
              var arr2 = arr[i].split(":");
              leadersArr.push({
                username: arr2[0],
                staffName: arr2[1],
              });
              str.push(arr2[1]);
            }
          }
          this.choseObj.inspectLeaderArr = leadersArr;
          this.xckcForm.inspectLeader = res.data.data[0].INSPECT_LEADER || "";
          this.xckcForm.inspectLeaderName = str.join(",");
          if (res.data.data[0].INSPECT_MEMBERS) {
            var arr = res.data.data[0].INSPECT_MEMBERS.split(",");
            for (var i = 0; i < arr.length; i++) {
              var arr2 = arr[i].split(":");
              memberArr.push({
                username: arr2[0],
                staffName: arr2[1],
              });
              str2.push(arr2[1]);
            }
          }
          this.choseObj.inspectMembersArr = memberArr;
          this.xckcForm.inspectMembers = res.data.data[0].INSPECT_MEMBERS || "";
          this.xckcForm.inspectMembersName = str2.join(",");

          this.passForm.supplierCode = res.data.data[0].SUPPLIER_CODE;
          this.passForm.inspectCode = res.data.data[0].INSPECT_CODE;
          this.uploadData.headCode = res.data.data[0].INSPECT_CODE;
        });
    },
    // 考察中选择考察组长等
    chosePeople(type) {
      this.memberList.type = type;
      if (type == "leader") {
        this.memberList.selectArr = this.choseObj.inspectLeaderArr;
      } else if (type == "cy") {
        this.memberList.selectArr = this.choseObj.inspectMembersArr;
      }
      console.log(this.choseObj);
      this.memberList.isShow = true;
    },
    // 职员组件调用父元素方法
    memberListFn(selectArr, selectVal, selectValName) {
      if (this.memberList.type == "leader") {
        this.xckcForm.inspectLeader = selectVal;
        this.xckcForm.inspectLeaderName = selectValName;
        this.choseObj.inspectLeaderArr = selectArr;
      } else if (this.memberList.type == "cy") {
        this.xckcForm.inspectMembers = selectVal;
        this.xckcForm.inspectMembersName = selectValName;
        this.choseObj.inspectMembersArr = selectArr;
      }
    },
    // 发起考察申请
    fqShenqing() {
      if(!this.xckcForm.inspectModel){
        this.$message.error('考察模板不能为空！');
        return false;
      }
      if(!this.xckcForm.inspectLeader){
        this.$message.error('考察组长不能为空！');
        return false;
      }
      if(!this.xckcForm.inspectMembers){
        this.$message.error('考察组员不能为空！');
        return false;
      }
      if(!this.xckcForm.inspectItem){
        this.$message.error('考察项目不能为空！');
        return false;
      }
      if(!this.xckcForm.inspectDate){
        this.$message.error('考察时间不能为空！');
        return false;
      }
      if (this.popupType == "cxks") {
        this.xckcForm.supplerRowNum = "5";
      }
      this.api
        .initiateInspect(this.sso_sessionid, this.xckcForm)
        .then((res) => {
          this.$message.success("申请成功！");
          this.xckcFormShow = false;
          this.getListByPageFn();
        });
    },
    // 跳过考察
    tgxckc() {
      this.api
        .noInspect(this.sso_sessionid, {
          supplierCode: this.xckcForm.supplierCode,
        })
        .then((res) => {
          this.$message.success("操作成功！");
          this.xckcFormShow = false;
          this.getListByPageFn();
        });
    },
    // 考察通过
    kcPass(inspectStatusName) {
      this.passForm.inspectStatusName = inspectStatusName;
      if(!this.passForm.inspectScore){
        this.$message.error('考察得分不能为空！');
        return false;
      }
      if(!this.passForm.inspectOpinion){
        this.$message.error('考察意见不能为空！');
        return false;
      }
      if (this.kcTitle == "重新发起现场考察申请") {
        this.passForm.supplerRowNum = "5";
      }
      this.api.inspectByPass(this.sso_sessionid, this.passForm).then((res) => {
        this.$message.success("操作成功！");
        this.xckcFormShow = false;
        this.getListByPageFn();
      });
    },
    // 考察不通过
    kcPassNot(inspectStatusName) {
      this.passForm.inspectStatusName = inspectStatusName;
      if (this.kcTitle == "重新发起现场考察申请") {
        this.passForm.supplerRowNum = "5";
      }
      switch (inspectStatusName) {
        case "转不合格":
          this.passForm.supplerScheduleStatus = "12";
          this.passForm.supplierStatus = "4";
          break;
        case "转备选":
          this.passForm.supplerScheduleStatus = "13";
          this.passForm.supplierStatus = "2";
          break;
        case "转潜在":
          this.passForm.supplerScheduleStatus = "14";
          break;
        case "考察不通过":
          this.passForm.supplerScheduleStatus = "5";
          break;
      }
      this.api
        .InspectByWaitOrNo(this.sso_sessionid, this.passForm)
        .then((res) => {
          this.$message.success("操作成功！");
          this.xckcFormShow = false;
          this.getListByPageFn();
        });
    },
    // 转状态
    zhuanFn(InspectStatusName, type, index) {
      if (this.zhuanData.length != 1) {
        this.$message.error("必选且只能选择一个！");
        return false;
      }
      if(this.zhuanData[0].UPDATE_APPROVE_STATUS == 'submit' && (!this.zhuanData[0].BAAPPROVESTATUS || this.zhuanData[0].BAAPPROVESTATUS == 'STOP')){
        this.$message.error("变更审批中不能进行任何操作！！");
        return false;
      }
      if (index == 3 || index == 4 || index == 5) {
        if (
          this.zhuanData[0].BAAPPROVESTATUS != "STOP" &&
          this.zhuanData[0].BAAPPROVESTATUS != "PASS" &&
          this.zhuanData[0].BAAPPROVESTATUS
        ) {
          this.$message.error("该供应商处于审批流程中，暂时不能操作！");
          return false;
        }
      }

      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "zzt",
          supplierCode: this.zhuanData[0].SUPPLIER_CODE,
          InspectStatusName: InspectStatusName,
          whereFrom: type,
          index: index,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    // 判断是否起件
    weiqijian(status) {
      if (this.headInputData.type != "4" && this.headInputData.type != "5") {
        if (status == "7" || status == "8" || status == "9") {
          return false;
        } else {
          return true;
        }
      } else {
        if (status == "10" || status == "10.1" || status == "10.2") {
          return false;
        } else {
          return true;
        }
      }
    },
    async zhuanBlackFn() {
      if (this.zhuanData.length != 1) {
        this.$message.error("必选且只能选择一个！");
        return false;
      }
      this.$confirm("确认转入黑库并发起审批?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.zhuanBlackFn2();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    zhuanBlackFn2() {
      var params = {
        approveContent: "转黑库-内容",
        approveTitle: "转黑库-标题",
        approveHeadCode: this.zhuanData[0].SUPPLIER_CODE,
      };
      this.api.approveByBlacklist(this.sso_sessionid, params).then((res) => {
        console.log(res);
        window.open(res.data.message);
      });
    },
    // 供应商类别
    getsuppType() {
      this.api
        .getSupplierCategoryTree(this.sso_sessionid, this.suppType)
        .then((res) => {
          console.log(res);
          this.leiBieData = res.data.data.data.nodeList[0].nodeList;
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

    // 审定跳转
    toApproval(url) {
      if (url) {
        window.open(url);
      }
    },
  },
  components: {
    Pagination,
  },
};
</script>
<style>
.el-dialog__body {
  padding: 10px 20px;
}
</style>
<style lang="less" scope>
@import "../assets/utils.less";

.el-form {
  width: 100%;
  .infor-box-button {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
  }
}
.information {
  float: left;
  position: relative;
  background: #fff;
  padding-bottom: 20px;
  .infoTabs {
    @box();
    margin-bottom: 0;
    padding: 20px 20px 0 20px;
    box-shadow: none;
    .el-tabs__header {
      margin: 0;
    }
  }
  .borderLeft {
    border-left: 2px solid #f1f1f1;
  }
  .tableArea {
    padding: 0 20px;
    float: left;
    width: 100%;
    .leftTree {
      .el-tree {
        padding-top: 20px;
        height: 100%;
        padding-right: 20px;
        .el-tree-node__label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 2px;
        }
      }
    }
    .listTable {
      width: 98%;
      margin-bottom: 20px;
      float: left;
      margin-left: 1%;
      overflow: inherit;
    }
  }
  .el-tabs__item.is-active {
    color: @color;
  }
  .el-tabs__active-bar {
    background-color: @color;
  }
  .el-tabs__item:hover {
    color: @color;
  }
  .xckcArea {
    .mubanSpan {
      margin-left: 20px;
    }
    .upload-demo {
      width: 400px;
    }
    .el-upload-list {
      width: 300px;
      float: left;
    }
    .el-upload-list__item:first-child {
      margin-top: 2px;
    }
    .bgMuban {
      margin-top: 10px;
      span {
        width: 100px;
        display: inline-block;
        text-align: right;
      }
      a {
        margin-left: 12px;
        color: @color;
      }
    }
    h4 {
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding: 8px 10px;
      font-size: 14px;
    }
    .el-dialog__title {
      font-size: 16px;
      line-height: 20px;
    }
    .el-dialog__body {
      padding: 10px 10px;
      .el-form-item {
        margin-bottom: 10px;
        width: 46%;
        margin-left: 2%;
        margin-top: 10px;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 178px;
        }
        .el-input--suffix .el-input__inner {
          padding-right: 15px;
        }
        .btnInput {
          width: 110px;
          margin-right: 10px;
        }
      }
      .el-textarea {
        width: 400px;
      }
      .kcJbxx {
        width: 50%;
        display: inline-block;
        margin: 5px 0;
        padding-left: 20px;
        span {
          width: 100px;
          text-align: right;
          margin-right: 12px;
          float: left;
        }
        p {
          display: inline-block;
          width: calc(100% - 130px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-cascader__tags {
        width: 100%;
        span {
          width: auto;
        }
      }
    }
  }
  .el_Popver {
    min-width: 240px;
    position: absolute;
    top: -50px;
    left: 92%;
    z-index: 2007;
    background: #fff;
    border: 1px solid #ebeef5;
    padding: 10px;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
    display: none;
  }
  .popoverClass .clickClass {
    height: 20px;
    background: none;
    line-height: 1;
    margin: 0;
    width: 100%;
  }
  .popoverClass {
    span {
      display: block;
      line-height: 20px;
      font-size: 12px;
    }
    p {
      font-size: 13px;
      line-height: 20px;
    }
  }
  .clickClass span {
    display: inline-block;
  }
  .clickClass p:hover {
    cursor: pointer;
  }
  .clickClass p {
    float: left;
    margin-right: 0;
    margin-bottom: 0;
    padding: 0;
    width: auto;
    white-space: nowrap;
    line-height: 20px;
    word-break: break-all;
    color: #1e88e5;
  }
  .hoverClass button:hover {
    cursor: pointer;
  }
  .hoverClass .cell:hover .blockquoteClass + .el_Popver {
    display: block;
  }
  .el-table__body-wrapper {
    overflow: inherit;
  }
  .jtCss {
    margin-left: -23px;
    margin-top: 44px;
    float: left;
    width: 0 !important;
    height: 0 !important;
    border-width: 6px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    background: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .star {
    .info {
      width: 100%;
      float: left;
      padding: 6px 0;
      p {
        float: left;
        width: 50%;
        line-height: 24px;
        padding-left: 20px;
        .ctspan {
          width: 360px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>