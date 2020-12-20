export default {
    returnDate(value, other) {
        if (value) {
          let date = new Date(value);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? "0" + MM : MM;
          let d = date.getDate();
          d = d < 10 ? "0" + d : d;
          let h = date.getHours();
          h = h < 10 ? "0" + h : h;
          let m = date.getMinutes();
          m = m < 10 ? "0" + m : m;
          let s = date.getSeconds();
          s = s < 10 ? "0" + s : s;
          if (!other) {
            return y + "-" + MM + "-" + d;
          } else {
            return y + "-" + MM + "-" + d + " " + h + ":" + m;
          }
        } else {
          return "";
        }
      },

      returnStar(row) {
        if(row.supplierCode){
            var lsStar = row.supplierStar;
            var approveStatus = row.approveStatus;
            var score = row.starBeginScore;
            var xy = row.supplierStrategy;
        } else{
            var lsStar = row.SUPPLIER_STAR || row.STAR_LINE_LEVEL;
            var approveStatus = row.APPROVE_STATUS;
            var score = row.COUNTSCORE || row.STAR_LINE_SCORE;
            var xy = row.supplierStrategy || '';
        }
        lsStar = Number(lsStar);
        if(approveStatus == 'submit' || approveStatus == 'PASS'){
          return lsStar;
        } else {
          if(lsStar<2){
            if(score>75){
              return lsStar + 1;
            }
          } else if(lsStar> 1 && lsStar <4){
            if(score>85){
              return lsStar + 1;
            }
          } else if(lsStar == 4){
            if(score >85){
                if(xy == 'Y'){
                    return lsStar + 1;
                } else {
                    return lsStar;
                }
            }
          }
          if(score <60){
            //   转为不合格
            return '0';
          } else if(score>=60 && score<65){
              return (lsStar -1);
          } else {
              return lsStar;
          }
        }
      },
    beforeUpload(file, vm) {
        const fileSize = file.size / 1024 / 1024 / 1024;
        if (fileSize > 1) {
            vm.$message.error('文件大小最多1G');
            return false;
        } else {
            return true;
        }
    },

    hasQx(value, vm) {
        if(!vm.$store.state.permissionList) return false;
        var permissionList = vm.$store.state.permissionList;
        var a = 0;
        for (var i = 0; i < permissionList.length; i++) {
            if (value == permissionList[i]) {
                a++;
            }
        }
        if (a > 0) {
            return true;
        } else {
            return false;
        }
    },
}