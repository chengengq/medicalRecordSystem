export default function timeSelector() {
  var startDates = "";
  var endDates = "";
  let times = []
  if (this.radio == "1") {
    //计算年
    startDates = this.childyear + "-01-01";
    endDates = this.childyear + "-12-31";

  } else if (this.radio == "2") {
    //计算月份(不同年份的每月天数)
    var yearmonth = this.childmonth.split("-"); //把末尾时间分割为 两个数组用于计算当前年月对应的天数
    var endDays = new Date(yearmonth[0], yearmonth[1], 0).getDate(); //得到末尾月份天数

    startDates = this.childmonth + "-01"; //2020-01 +x月初
    endDates = this.childmonth + "-" + endDays; //2020-01 +月底
  } else if (this.radio == "3") {
    //季度判断
    // 格式2022-q-2
    // 如果存在q-1、q-2、q-3、q-4
    //则选取对应的季度时间
    var quarter = this.childquarter;
    if (quarter.indexOf("q-1") !== -1) {
      startDates = this.childyear + "-01-01";
      endDates = this.childyear + "-03-31";
    } else if (quarter.indexOf("q-2") !== -1) {
      startDates = this.childyear + "-04-01";
      endDates = this.childyear + "-06-30";
    } else if (quarter.indexOf("q-3") !== -1) {
      startDates = this.childyear + "-07-01";
      endDates = this.childyear + "-09-30";
    } else if (quarter.indexOf("q-4") !== -1) {
      startDates = this.childyear + "-10-01";
      endDates = this.childyear + "-12-31";
    }
  } else if (this.radio == "4") {
    //时间段
    //格式  2020/01-2020/07
    //把这个拆分成2020-月份 +01 - 2021-月份 +月底(需要计算)
    var range = this.childgrange.split("-"); //分割成长度为2的数组 2020/01和2020/07
    range[0] = range[0].replace("/", "-"); //从年/月 变成 年-月  2020/01->2020-01
    range[1] = range[1].replace("/", "-"); //从年/月 变成 年-月  2020/07->2020-07

    var endRange = range[1].split("-"); //把末尾时间分割为 两个数组用于计算当前年月对应的天数
    var endDays = new Date(endRange[0], endRange[1], 0).getDate(); //得到末尾月份天数

    startDates = range[0] + "-01";
    endDates = range[1] + "-" + endDays;
  } else {
    console.log("初次进入当年初到今天");
    var days = 0;
    var year = new Date().getFullYear();
    var month = "01";
    //var month = new Date().getMonth() + 1;
    /*startDates = "2020-01-01"; */
    startDates = year + "-01-01";
    if (new Date().getDate() < 10) {
      days = "0" + new Date().getDate();
    } else {
      days = new Date().getDate();
    }

    endDates = year + "-" + month + "-" + days;
  }
  times[0] = startDates;
  times[1] = endDates;
  return times;
}
