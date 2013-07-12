$(function() {

  var maxHeight = 0;

  var row = $("#numbers");

  $.each(row, function(){
      var height = jQuery(this).height();
      if(maxHeight<height)
          maxHeight = height;

  });
  $("#graph").height(maxHeight);
  $("#placeholder").height($(".big-number").height());

  var visits = [], clickthroughs = [],
  rawVisits = [300,295,292,275,267,268,256,259,277,426,522,516,425,344,305,291,283,285],
  rawClickthroughs = [40,33,35,32,25,26,26,26,23,59,92,76,49,37,36,29,38,32],
  rawDates=["1/1/13","1/2/13","1/3/13","1/4/13","1/5/13","1/6/13","1/7/13","1/8/13","1/9/13","1/10/13","1/11/13","1/12/13","1/13/13","1/14/13","1/15/13","1/16/13","1/17/13","1/18/13"]

  for (var i = 0; i < rawDates.length ; i += 1) {
    str = rawDates[i];
    date = new Date(Date.parse(str.replace(/-/g, " ")));
    // date += (8 *  60);
    visits.push([date, rawVisits[i]]);

    clickthroughs.push([date, rawClickthroughs[i]]);
  }

  var plot = $.plot("#placeholder", [
    { data: visits, label: "Visits"},
    { data: clickthroughs, label: "Clicks"}
  ], {
    series: {
      lines: {
        show: true
      }
    },
    grid: {
      hoverable: true,
      clickable: true,
      borderWidth: {
        top: 0,
        bottom: 1,
        left: 1,
        right: 0
      }
    },
    yaxis: {
      min: 0,
      max: 600,
      color: "#ffffff"
    },
    xaxis: {
        mode: "time",
        timezone: "browser",
        timeformat: "%m/%d/%y",
        minTickSize: [1, "day"],
        color: "#ffffff"
    },
    legend: {
        show: false
    },
    colors: ["#efb669", "#5d9da1"]
  });
  
  function showTooltip(x, y, contents) {
    $("<div id='tooltip'>" + contents + "</div>").css({
      position: "absolute",
      display: "none",
      top: y + 5,
      left: x + 5,
      border: "1px solid #666666",
      padding: "2px",
      "background-color": "#e6ddcb"
    }).appendTo("body").fadeIn(200);
  }

  var previousPoint = null;
  $("#placeholder").bind("plothover", function (event, pos, item) {
    if (item) {
      if (previousPoint != item.dataIndex) {

        previousPoint = item.dataIndex;

        $("#tooltip").remove();

        var y = item.datapoint[1];
        var d = new Date(item.datapoint[0]);
        var someDay = d.getDate();
        var someMonth = d.getMonth() + 1; //months are zero based
        var someYear = d.getFullYear();
        var stringDate = someMonth + "/" + someDay + "/" + someYear;

        showTooltip(item.pageX, item.pageY,
            stringDate + " - " + item.series.label + " " + y);
      }
    } else {
      $("#tooltip").remove();
      previousPoint = null;
    }

  });
});



// d3.csv("homework_dataset.csv", function(data) {
//     // the columns you'd like to display
//     var columns = ["Date", "Referrer Category", "Referrers", "Clickthroughs"];

//     var table = d3.select("#container").append("table"),
//         thead = table.append("thead"),
//         tbody = table.append("tbody");

//     table.attr("class", "yui3-table yui3-table-bordered");

//     // append the header row
//     thead.append("tr")
//         .selectAll("th")
//         .data(columns)
//         .enter()
//         .append("th")
//             .text(function(column) { return column; })
//             .attr("class", "sort");

//     // create a row for each object in the data
//     var rows = tbody.selectAll("tr")
//         .data(data)
//         .enter()
//         .append("tr");

//     // create a cell in each row for each column
//     var cells = rows.selectAll("td")
//         .data(function(row) {
//             return columns.map(function(column) {
//                 return {column: column, value: row[column]};
//             });
//         })
//         .enter()
//         .append("td")
//             .text(function(d) { return d.value; });
// });
