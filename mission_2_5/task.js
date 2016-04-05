/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var dataTable = document.getElementsByClassName('aqi-chart-wrap')[0];
  dataTable.innerHTML = "";
  //console.log(dataTable);
  for(var i in chartData){
    var color;
    if(chartData[i] > 500) color = 'black';
    else if(chartData[i] > 400) color = 'purple';
    else if(chartData[i] > 300) color = 'red';
    else if(chartData[i] > 200) color = 'blue';
    else if(chartData[i] > 100) color = 'green';
    else color = 'green';
    var width;
    if(pageState.nowGraTime === "day") width = 14;
    if(pageState.nowGraTime === "week") width = 100;
    if(pageState.nowGraTime === "month") width = 300;

    dataTable.innerHTML += "<div style='height:"+ chartData[i] +
      "px;width:"+ width +"px;background-color:"+ color +
      ";display:inline-block;margin-left:1px;'title="+ i + chartData[i]+"></div>";
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
  //console.log(e.target);
  if(e.target.nodeName.toLowerCase() === "input")
    pageState.nowGraTime = e.target.value;
  // 设置对应数据

  // 调用图表渲染函数
  //renderChart();
  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  //console.log(e.target);
  if (e.target.nodeName.toLowerCase() === "select") {
    //console.log("change");
    pageState.nowSelectCity = document.getElementById('city-select').selectedOptions[0].value;
  };
  // 设置对应数据

  // 调用图表渲染函数
  //renderChart();
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var time = document.getElementById('form-gra-time').getElementsByTagName('input');
  for(var i in time)
    if(time[i].checked)
      pageState.nowGraTime = time[i].value;

  var radio = document.getElementById('form-gra-time');
  radio.addEventListener('change', graTimeChange, false);

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var dataList = document.getElementById('city-select');
  dataList.innerHTML = "";
  for(var i in aqiSourceData){
    dataList.innerHTML += "<option value=" + i + ">" + i + "</option>";
  }
  //pageState.nowSelectCity = dataList.selectedIndex;
  pageState.nowSelectCity = dataList.selectedOptions[0].value;
  dataList.addEventListener('click', citySelectChange, false);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var index = document.getElementById('city-select').selectedOptions[0].value;
  var domain = pageState.nowGraTime;
  var arr = Object.keys(aqiSourceData[index]);
  //console.log(index, domain);
  if(domain === "day"){
    chartData = aqiSourceData[index];
    //console.log("day", index, domain, chartData);

  }
  if(domain === "week"){
    var temp = [];
    var count = Math.floor(arr.length / 7);
    var last = arr.length % 7;
    chartData = {};
    console.log("week", index, domain, arr, chartData, aqiSourceData[index]);
    for (var i = 0; i < count; i++) {
      temp[i] = 0;
      for (var j = 0; j < 7; j++) {
        temp[i] += Number(aqiSourceData[index][arr[j + i*7]]);
         //console.log("del", aqiSourceData[index]);
      };
      temp[i] = temp[i]/7;
      chartData[i] = temp[i];
      //console.log("once", i, chartData);

    };
    if(last > 0){
      temp[count] = 0;
      for (var i = 0; i < last; i++) {
        temp[count] += aqiSourceData[index][arr[i + count*7]];
      };
      temp[count] = temp[count]/last;
      chartData[count] = temp[count];
    }
    //console.log("week", chartData);
  }
  if(domain === "month"){
    var temp = [];
    var count = Math.floor(arr.length / 30);
    var last = arr.length % 30;
    chartData = {};
    console.log("month", count, last, arr, chartData, aqiSourceData[index]);

    for (var i = 0; i < count; i++) {
      temp[i] = 0;
      for (var j = 0; j < 30; j++) {
        temp[i] += aqiSourceData[index][arr[j + i*count]];
      };
      temp[i] = temp[i]/30;
      chartData[i] = temp[i];
    };
    if(last > 0){
      temp[count] = 0;
      for (var i = 0; i < last; i++) {
       temp[count] = aqiSourceData[index][arr[i + count*30]];
      };
      temp[count] = temp[count]/last;
      chartData[count] = temp[count];
    }
    
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
