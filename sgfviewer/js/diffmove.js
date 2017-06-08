var pos2int = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'J':8,'K':9,
'L':10,'M':11,'N':12,'O':13,'P':14,'Q':15,'R':16,'S':17,'T':18}
var to_num = function(str, i) {
  var result = 0;
  if(i==0){
    result = pos2int[str[0]];
  }else{
    result = 19 - parseInt(str.substring(1));
  }
	return result;
}

window.onload = function(){
  var number_markers = [];
  var default_csv = {"move":"0","selected":"0","mcount":"0","mpn":"0","count":"0","pn":"0"}

  var bplayer = new WGo.BasicPlayer(document.getElementById("player"), {
      sgfFile: "AlphaGO_SelfPlay/1.sgf",
  });
  display_csv_info(default_csv);
  $(document).ready(function () {
  	document.getElementById('files').addEventListener('change', handleFileSelect, false);
  });
}

function handleFileSelect() {
	if (window.File) {
		var fileData = document.getElementById("files").files[0];
    if(!fileData.name.match('.csv$')) {
        alert('select csv file');
        return;
    }
		var reader = new FileReader();
		reader.onload = function(e){
      csvloaded(reader.result);
    }
    reader.readAsText(fileData);
	}
	else {
		alert("Error(FILE API is not available.) Change browser");
	}
}

function csvloaded(csvtext){
  var move_data = [];
  d3.csvParse(csvtext, function(data) {
      move_data.push(data);
  });

  var pre_update = null;
  var bplayer = new WGo.BasicPlayer(document.getElementById("player"), {
      sgfFile: "AlphaGO_SelfPlay/" + move_data[0].sgffile,
  });
  bplayer.addEventListener("update", function(e) {
      // this function will be executed after every move
      if(pre_update != null){
        bplayer.board.removeObject(pre_update);
        if(e.path.m > 0){

          var marker = {
            x: to_num(move_data[e.path.m-1].selected, 0),
            y: to_num(move_data[e.path.m-1].selected, 1),
            type:"TR",
          }
          bplayer.board.addObject(marker);
          pre_update = marker;
          display_csv_info(move_data[e.path.m - 1]);
        }
      }
      else if(e.path.m > 0){
        var marker = {
          x: to_num(move_data[e.path.m-1].selected, 0),
          y: to_num(move_data[e.path.m-1].selected, 1),
          type:"TR",
        }
        bplayer.board.addObject(marker);
        pre_update = marker;
        display_csv_info(move_data[e.path.m - 1]);
      }
  });
}

function display_csv_info(data){
  $("#csvlist").empty();
  var insert = "<thead class='thead-inverse'><tr>"
  insert += "<th style='width: 40%'></th>"
  insert += "<th style='width: 20%'>move</th>"
  insert += "<th style='width: 20%'>count</th>"
  insert += "<th style='width: 20%'>pn</th>";
  insert += "</tr></thead><tbody><tr>";
  insert += "<td> Real Player </td>";
  insert += "<td>" + data.move + "</td>";
  insert += "<td>" + (data.mcount).substring(0,4) + "</td>";
  insert += "<td>" + (data.mpn).substring(0,4) + "</td>";
  insert += "</tr><tr>";
  insert += "<td> Virtual Player </td>";
  insert += "<td>" + data.selected + "</td>";
  insert += "<td>" + (data.count).substring(0,4) + "</td>";
  insert += "<td>" + (data.pn).substring(0,4) + "</td>";
  insert += "</tr></tbody>"
  $("#csvlist").append(insert);
}
