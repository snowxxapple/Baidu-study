/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var value = document.getElementById('aqi-value-input').value.trim();
	value = Number(value);
	if(value === NaN) alert('输入不是数字');
	if(parseInt(value) !== value) alert('不是整数');
	//正则判断字符串
	var re = /^[\u4e00-\u9fa5|a-z]+\D$/gi
	// 以中英文开头，结尾不能有数字的正则
	if (re.test(city) && parseInt(value) === value && value !== NaN) {
		aqiData[city] = value;//这么写，属性名就叫做city
	}
	else {
		console.log('非法字符');
		return;
	}
	//aqiData = {city:value};//try everything
	//点后面不
	//console.log(city,aqiData);
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(item in aqiData){
    	table.innerHTML += "<tr><td>" + item + "</td><td>" +
    aqiData[item] + "</td><td><button>删除</button></td></tr>";
    }
    
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  //console.log(e);
  if(e.target.nodeName.toLowerCase() == "button"){
  	var name = e.target.parentNode.parentNode.firstChild.innerText;
  	delete aqiData[name];
   	//e.target.parentNode.parentNode.innerHTML = "";
   	//去掉删除操作，减少DOM操作
 	}
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn = document.getElementById('add-btn');
  add_btn.addEventListener('click', addBtnHandle, false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var del_btn = document.getElementById('aqi-table');
  del_btn.addEventListener('click', delBtnHandle, false);
  //好像不对，要用事件委托
}

init();
