let tableNameNow="";  //имя открытой таблицы
let tableDataNow;     //данные открытой таблицы

//передаваемый массив преобразует в table и вставляет table в HTML
function arraysToTable(arrays) { 
  let alterN=true;
  const div = document.createElement('div');
  div.setAttribute("id", "divTable");
  const table = document.createElement('table');
  table.className = "tableClass";
  //создаем массив единиц, шириной как у входного массива
  let arr=[];
  for (var i=0;i < arrays[0].length; i++) 
    arr[i] = 1;
  //делаем проход по входному массиву забивая максимальные значения длины input в единичный
  for (var i = 0; i < arrays.length-1; i++) {
    for (var j = 0; j < arrays[0].length; j++) {
      if(arr[j].toString().length < arrays[i][j].toString().length){
             arr[j] = arrays[i][j].toString().length;
      }
    }
  } 
  i=0; //номера для id input         
  for (const row of arrays) {
    const tr = table.insertRow();
    alterN = alterN ? false : true;  //смена цвета строк
    var inputWidth=0;  //номер ширины поля в arr                 
    for (const number of row) {
      const td = tr.insertCell();     
      let NewInput = document.createElement('input');
      if(alterN){                           //смена цвета строк
        NewInput.className="trFirstClass";
      }else{
        NewInput.className="trSecondClass";
      }
      NewInput.id="id"+i;
      i++;
      let val=arr[inputWidth]/2+2;
      inputWidth++;
      NewInput.style.width = val+'em';
      NewInput.value = number;
      td.appendChild(NewInput);  
    }
  }
  div.appendChild(table)
  return div;
}

//создает из CSV двумерный массив
function CSVtoTable(arrayCSV) {   
  let ar=arrayCSV.split(/,/);
  let limit=0;
  while(ar[limit].toString().indexOf('\n') <= -1)
    limit++; 
  limit++;
  ar=arrayCSV.split(/,|\n/);
  const array2 = [];
  let section;
  for (const [index, element] of ar.entries()) {
    if (index % limit === 0) array2.push(section = []);
    section.push(element);
  }
  tableDataNow=array2;
  return array2;
}

//Открывает CSV файлы
let arrayForCSV;
let fileInput;
document.addEventListener('DOMContentLoaded', function() {
  fileInput = document.getElementById('customFile'); 
  fileInput.addEventListener('change', function() {
    const selectedFile = fileInput.files[0];
    if (fileInput.files[0].name.split('.').reverse()[0] == 'csv'){  //если файл csv
      const reader = new FileReader();
      reader.onload = function(e) {
       arrayForCSV=e.target.result.toString();    
       tableFromData(CSVtoTable(arrayForCSV));  //открывает фаил, создает из него 2мерный массив и отправляет его в tableFromData  
      };
      reader.readAsText(selectedFile);
    }else{
      alert('Желательно выбрать CSV');
    }
  });
});

//очистка предыдушего table
function clearTable(){
var divi = document.getElementById('divTable');
if (divi !==null)
  divi.remove();
}

//Очищает table и вызывает arraysToTable
 function tableFromData(table){
clearTable();
document.body.append(arraysToTable(table));
}

//пример c CSV
function Example(fileName){
  var request = new XMLHttpRequest;
  request.open('GET', fileName, true);
  request.onload = function (){
    tableFromData(CSVtoTable(request.responseText));
    ChangeDivVisible(1);
   };
 request.send(null);
}

//меняет видимость div с именами таблиц
function ChangeDivVisible(stage) {
  var divForTableName = document.getElementById('blockR');
  var actualDisplay = getComputedStyle(divForTableName).display;
  if (stage){
    divForTableName.style.display = 'none';
  }else{
    divForTableName.style.display = 'block';
  }
}

//Пример с БД. Принимает имена таблиц и создает button с ними
function ExampleDB() {
  clearTable();
    $.ajax({
      url: "../tableNames",
      success: function(data){
      divT = document.getElementById('blockR');
      dataS = data.replace(/['\][ ]/g, '');
      dataArray = dataS.split(',');
      let strForDiv="";
      for (i = 0; i < dataArray.length; ++i) {
        str="<button class=\"for_table_but\" type=\"\"  onclick=\"doTable(\'" + dataArray[i] + "\');\">"
         + dataArray[i] +" </button>";
        strForDiv+=str;
        }
      strForDiv+="<button class=\"for_save_but\" type=\"\" onclick=\"saveChanges();\">Сохранить изменения</button>"
      divT.innerHTML=strForDiv;
      ChangeDivVisible(0);
      }
    });    
}

//отправлет запрос с именем таблицы
function doTable(tableName){
  tableNameNow=tableName;
    $.ajax({
      url: "../fromTable",
      data:tableName,
      success: function(data){fromTableToCSV(data)}
    });
}

//делает из принятого от БД списка CSV файл
function fromTableToCSV(data){
  str = data.replace(/[\][(']/g, '');
  str2 = str.replace(/\),/g, '\n');
  str1 = str2.replace(/[)]/g, '');
  tableFromData(CSVtoTable(str1));
  ChangeDivVisible(0);
}

//отправляет запрос на update таблицы, после нажатия "сохранить изменения" 
function saveChanges(){
  iTData=tableDataNow.length;
  jTData=tableDataNow[0].length;
  id=0;
  listForUpdateTable=[];
  for (i=0;i<iTData;i++){
    for (j=0;j<jTData;j++){
      idVal="id"+id;
      if(tableDataNow[i][j]!=document.getElementById(idVal).value){  //если что-то изменилось в таблице
         dataForUp=[];
         dataForUp.push(i);
         dataForUp.push(j);
         dataForUp.push(document.getElementById(idVal).value);
         listForUpdateTable.push(dataForUp);
         }
      id++;
    }
  }
  listForUpdateTable.unshift(tableNameNow);
    $.ajax({
      url: "../updateTable",
      data:{listForUpdateTable}
    });
}
