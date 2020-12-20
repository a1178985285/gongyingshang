
import axios from '@/utils/http'; // 导入http中创建的axios实例
const apiList = {
    // 获取职员列表
    getStaffListByName(sso_sessionid,params){
        return axios.postWay(`/supplierRequest/getStaffListByName?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 获取所在区域数据
    getSupplierInArea(params){
        return axios.postWay(`/outRequest/getSupplierInArea`,params)
    },
    // 根据code获取供应商相关信息
    getSupplierInfoList(params){
        return axios.postWay(`/supplierInfo/getSupplierInfoList`,params, 'pj')
    },
    // 评星定级业务数据
    getStarList(params){
        return axios.postWay(`/outRequest/getStarList`,params, 'pj')
    },
    // 星级调整业务数据
    starChangeByCode(params){
        return axios.postWay(`/outRequest/getStarChangeByCode`,params, 'pj')
    },
    // 根据code获取供应商相关信息
    getSupplierInfoLookList(params){
        return axios.postWay(`/outRequest/getSupplierInfoLookList`,params, 'pj')
    },
    
    // 评星定级生成审定
    getApproveByStarHead(sso_sessionid,params){
        return axios.postWay(`/starHead/getApproveByStarHead?sso_sessionid=${sso_sessionid}`,params)
    },
    //  业务单元
    getOrgStructureList(sso_sessionid,params){
        return axios.postWay(`/supplierRequest/getOrgStructureList?sso_sessionid=${sso_sessionid}`,params)
    },
    // 查询供应商信息-分页
    supplierInfo(sso_sessionid,params){
        return axios.postWay(`/supplierInfo/getSupplierListByPage?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}`,params)
    },
    // 根据code获取供应商考察信息
    getSupplierByInspect(sso_sessionid,params){
        return axios.postWay(`/supplierInspect/getSupplierByInspect?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 发起现场考察申请
    initiateInspect(sso_sessionid,params){
        return axios.postWay(`/supplierInspect/initiateInspect?sso_sessionid=${sso_sessionid}`,params)
    },
    // 跳过现场考察
    noInspect(sso_sessionid,params){
        return axios.postWay(`/supplierInspect/noInspect?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 考察通过
    inspectByPass(sso_sessionid,params){
        return axios.postWay(`/supplierInspect/inspectByPass?sso_sessionid=${sso_sessionid}`,params)
    },
    //考察不通过
    InspectByWaitOrNo(sso_sessionid,params){
        return axios.postWay(`/supplierInspect/InspectByWaitOrNo?sso_sessionid=${sso_sessionid}`, params)
    },
    // 考察报告list
    getInspectList(sso_sessionid,params){
        return axios.postWay(`/supplierInspect/getInspectList?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 添加修改信息并提交审核
    saveApproveByStatus(sso_sessionid,params){
        return axios.postWay(`/updateInfo/saveApproveByStatus?sso_sessionid=${sso_sessionid}`,params)
    },
    // 查看变更历史
    getUpdateList(sso_sessionid,params){
        return axios.postWay(`/updateInfo/getUpdateListBySupplierCode?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 变更同意/不同意
    approveByStatus(sso_sessionid,params){
        return axios.postWay(`/updateInfo/approveByStatus?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 根据条件查询变更信息
    getUpdateByCode(sso_sessionid,params){
        return axios.postWay(`/updateInfo/getUpdateByCode?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 查看变更列表
    getUpdateByPage(sso_sessionid,params){
        return axios.postWay(`/updateInfo/getUpdateByPage?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 审批历程list
    getInspectByCheck(sso_sessionid,params){
        return axios.postWay(`/supplierSchedule/getInspectByCheck?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 转黑库
    approveByBlacklist(sso_sessionid,params){
        return axios.postWay(`/supplierBlacklist/approveByBlacklist?sso_sessionid=${sso_sessionid}`,params)
    },
    // 黑库list
    getBlacklistByPage(sso_sessionid,params){
        return axios.postWay(`/supplierBlacklist/getBlacklistByPage?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 导出
    excelSupplier(sso_sessionid, params) {
        return axios.exportWay(`/supplierInfo/excelSupplier?sso_sessionid=${sso_sessionid}&supplierStatus=${params.supplierStatus}&supplierName=${params.supplierName}`, params.exportExcel, { headers: { 'Content-Type': 'application/json' } }, { responseType: 'blob' });
    },
    // ces
    test(sso_sessionid, params) {
        return axios.postWay(`supplierRequest/getOrgStructureList`, params);
    },
    // 供应商账号列表
    getLoginList(sso_sessionid,params){
        return axios.postWay(`/supplierLoginByIn/getLoginList?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 供应商账号 启动/停用
    updateByStatus(sso_sessionid, params) {
        return axios.postWay(`/supplierLoginByIn/updateByStatus?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 供应商列表转状态
    updateSupplierByStatus(sso_sessionid,params){
        return axios.postWay(`/supplierInfo/updateSupplierByStatus?sso_sessionid=${sso_sessionid}`, params)
    },
    // 重置密码
    upateByPassword(sso_sessionid,params){
        return axios.postWay(`/supplierLoginByIn/upateByPassword?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 生成
    saveByLogin(sso_sessionid,params){
        return axios.postWay(`/supplierLoginByIn/saveByLogin?sso_sessionid=${sso_sessionid}`,params, 'pj')
    },
    // 供应商获取用户信息
    getUserInfo(sso_sessionid) {
        return axios.postWay(`/supplierRequest/getUserInfo?sso_sessionid=${sso_sessionid}`)
    },
    // 供应商评估列表
    getSupplierListByPage(sso_sessionid,params){
        return axios.postWay(`/estimateHead/getSupplierListByPage?sso_sessionid=${sso_sessionid}&pageNum=${params.pageNum}&size=${params.size}`, params)
    },
    // .根据供应商code获取资质列表
    getQualificationBySupplierCode(sso_sessionid,params){
        return axios.postWay(`/supplierQualifications/getQualificationBySupplierCode`, params, 'pj')
    },

    //供应商注册
    getRegister(sso_sessionid, params) {
        return axios.postWay(`/supplierInfo/addSuppierInfo?sso_sessionid=${sso_sessionid}`, params)
    },
    //供应商注册-外网
    addSuppierInfo(params) {
        return axios.postWay(`/supplierLogin/addSuppierInfo`, params)
    },
    //供应商资质审查--通过
    supplierScPass(sso_sessionid, params) {
        return axios.postWay(`/supplierInfo/supplierByOpinion?sso_sessionid=${sso_sessionid}`, params)
    },
    //根据code获取供应商相关信息
    getCodester(sso_sessionid, params) {
        return axios.postWay(`/supplierInfo/getSupplierInfoList?sso_sessionid=${sso_sessionid}&supplierCode=${params.supplierCode}&type=${params.type}`)
    },
    //根据code获取供应商相关信息
    getSupplierByLogin(params) {
        return axios.postWay(`/supplierLogin/getSupplierByLogin?loginCode=${params.loginCode}`)
    },
    //添加供应商业绩-批量
    addKpi(sso_sessionid, params) {
        return axios.postWay(`/supplierPerformance/addList`, params)
    },
    //根据供应商code查询业绩信息
    getKpi(sso_sessionid, params) {
        return axios.postWay(`/supplierPerformance/getSupplierPerformanceList?supplierCode=${params}`)
    },
    //供应商银行添加信息
    addMoney(sso_sessionid, params,submit) {
        return axios.postWay(`/supplierBank/save?submit=${submit}`, params)
    },
    //根据供应商code获取银行信息
    getMoney(sso_sessionid, params) {
        return axios.postWay(`/supplierBank/getSupplierBankList?sso_sessionid=${sso_sessionid}&supplierCode=${params}`)
    },
    //从数据字段中获取银行信息
    getBankListByKey(sso_sessionid, params) {
        return axios.postWay(`/outRequest/getBankListByKey?sso_sessionid=${sso_sessionid}`)
    },
    //根据供应商code获取入库模板信息
    getStockByCode(sso_sessionid, params) {
        return axios.postWay(`/supplierInfo/getStockByCode?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    //保存入库信息
    AddStockList(sso_sessionid, params) {
        return axios.postWay(`/supplierInfo/AddStockList?sso_sessionid=${sso_sessionid}`, params)
    },
   
    //发起入库审批
    supplierByStock(sso_sessionid, params) {
        return axios.postWay(`/supplierInfo/supplierByStock?sso_sessionid=${sso_sessionid}`, params)
    },
   
    //批量添加证照
    addlicence(sso_sessionid, params) {
        return axios.postWay(`/supplierQualifications/addList?sso_sessionid=${sso_sessionid}`, params)
    },
    //删除资质等级
    deleteDelSupplie(sso_sessionid, params) {
        return axios.postWay(`/supplierQualifications/delSupplierQualificationsByCode?sso_sessionid=${sso_sessionid}&spCode=${params}`)
    },
    //供应商类别
    getSupplierCategoryTree(sso_sessionid, params) {
        return axios.postWay(`/supplierRequest/getSupplierCategoryTree?sso_sessionid=${sso_sessionid}`, params)
    },
    //供应商类别
    outRequestTree(params) {
        return axios.postWay(`/outRequest/getSupplierCategoryTree`, params)
    },

    // 根据供应商code和过程评估code获取评估信息
    getEstimateByCode(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/getEstimateByCode?sso_sessionid=${sso_sessionid}&estimateHeadType=${params.estimateHeadType}`, params.arr)
    },
    // 根据供应商code和过程评估code获取评估信息2222
    getEstimateByCodeOut(sso_sessionid, params) {
        return axios.postWay(`/outRequest/getEstimateByCode?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 发起评估 --- 添加年度/半年度评估
    saveHead(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/saveHead?sso_sessionid=${sso_sessionid}`, params)
    },
    // 评估人获取评估信息
    getEstimateByItem(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/getEstimateByItem?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 完成评估---查询
    getEstimateList(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/getEstimateList?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 完成评估
    completeEstimate(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/completeEstimate?sso_sessionid=${sso_sessionid}`, params)
    },
    // 执行评估 打分
    saveEstimateList(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/saveEstimateList?sso_sessionid=${sso_sessionid}`, params)
    },
    // 供应商评估完成后退回上一步
    backEstimateByCode(sso_sessionid, params) {
        return axios.postWay(`/estimateHead/backEstimateByCode?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
   
    
    // 供应商评星定级列表
    getStartByPage(sso_sessionid,params){
        return axios.postWay(`/starHead/getStartByPage?sso_sessionid=${sso_sessionid}`, params)
    },
    // 获取当前评星定级的供应商
    getStarListByHead(sso_sessionid,params){
        return axios.postWay(`/starHead/getStarListByHead?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 保存评星定级
    saveStar(sso_sessionid,params){
        return axios.postWay(`/starHead/saveStar?sso_sessionid=${sso_sessionid}`, params)
    },
    // 根据评星定级code删除信息
    delByStar(sso_sessionid,params){
        return axios.postWay(`/starHead/delByStar?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 根据code获取星级调整信息
    getStarChangeByCode(sso_sessionid,params){
        return axios.postWay(`/starChange/getStarChangeByCode?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 保存星级调整
    saveStartChange(sso_sessionid,params){
        return axios.postWay(`/starChange/saveStartChange?sso_sessionid=${sso_sessionid}`, params)
    },
    // 星级调整发起审定
    getApproveByStartChange(sso_sessionid,params){
        return axios.postWay(`/starChange/getApproveByStartChange?sso_sessionid=${sso_sessionid}`, params)
    },

    
    // .根据类型获取评估模板
    getEstimateByModelName(sso_sessionid,params){
        return axios.postWay(`/estimateItem/getEstimateByModelName?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },

    // .取评估模板数据
    getEstimateByType(sso_sessionid,params){
        return axios.postWay(`/estimateItem/getEstimateByType?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 供应商相关审批
    getApproveList(sso_sessionid,params){
        return axios.postWay(`/supplierSchedule/getApproveList?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    
    // 获取业务数据--支出单
    getContractByScore(sso_sessionid,params){
        return axios.postWay(`/estimateHead/getContractByScore?sso_sessionid=${sso_sessionid}`, params, 'pj')
    },
    // 获取业务数据--支出单
    getSupplierByContract(sso_sessionid,params, arr){
        return axios.postWay(`/supplierInfo/getSupplierByContract?sso_sessionid=${sso_sessionid}&headType=${params.headType}&pageNum=${params.pageNum}&size=${params.size}`, arr)
    },

//获取企业状况数据

getSupplierEstablishment(sso_sessionid){
    return axios.postWay(`/outRequest/getSupplierEstablishment?sso_sessionid=${sso_sessionid}`)
},

//获取企业合作状态
getSupplierCooperateStatus(sso_sessionid){
    return axios.postWay(`/outRequest/getSupplierCooperateStatus?sso_sessionid=${sso_sessionid}`)
},
// //根据类型获取评估模板
// getSupplierCooperateStatus(sso_sessionid){
//     return axios.postWay(`/estimateItem/getEstimateByModelName?sso_sessionid=${sso_sessionid}`)
// },

//根据审定编号获取过程评估相关信息--审定查询
getDayEstimateByApproveNumber(sso_sessionid,params){
    return axios.postWay(`/outRequest/getDayEstimateByApproveNumber?sso_sessionid=${sso_sessionid}&approveCode=${params.approveCode}`,approveCode)
},





}
export default apiList;
