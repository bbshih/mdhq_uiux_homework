$(function() {
  $.fn.peity.defaults.line = {
    colour: "#666666",
    strokeColour: "#666666",
    strokeWidth: 1,
    delimiter: ",",
    height: 20,
    max: null,
    min: 0,
    width: 70
  }
  $(".line").peity("line");

  var stdHeight = $("#funnel-numbers").height();
  var noHeaderHeight = stdHeight - 58;
  $("#total-graph").height(noHeaderHeight);
  $("#visits-clicks").height(noHeaderHeight);

  var visits = [], clickthroughs = [], ctr = [],
  rawVisits = [300,295,292,275,267,268,256,259,277,426,522,516,425,344,305,291,283,285],
  rawClickthroughs = [40,33,35,32,25,26,26,26,23,59,92,76,49,37,36,29,38,32],
  rawDates=["1/1/13","1/2/13","1/3/13","1/4/13","1/5/13","1/6/13","1/7/13","1/8/13","1/9/13","1/10/13","1/11/13","1/12/13","1/13/13","1/14/13","1/15/13","1/16/13","1/17/13","1/18/13"]

  for (var i = 0; i < rawDates.length ; i += 1) {
    var str = rawDates[i];
    var date = new Date(Date.parse(str.replace(/-/g, " ")));

    visits.push([date, rawVisits[i]]);
    clickthroughs.push([date, rawClickthroughs[i]]);
  }

  var plot = $.plot("#visits-clicks", [
    { data: visits, label: "Visits"},
    { data: clickthroughs, label: "Clickthroughs"}
  ], {
    series: {
      lines: {
        show: true
      },
      shadowSize: 0
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
  $("#visits-clicks").bind("plothover", function (event, pos, item) {
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

  $("#clickthrough-rate").height(noHeaderHeight);

  var earnedMedia = [], search = [], social = [],
  rawEarnedMedia = [0.20,0.17,0.18,0.16,0.09,0.10,0.17,0.11,0.09,0.20,0.18,0.20,0.15,0.12,0.15,0.12,0.12,0.10],
  rawSearch = [0.11,0.08,0.09,0.12,0.10,0.10,0.11,0.10,0.11,0.07,0.17,0.13,0.10,0.10,0.11,0.10,0.16,0.13],
  rawSocial = [0.09,0.09,0.10,0.08,0.09,0.09,0.06,0.09,0.05,0.10,0.18,0.10,0.10,0.10,0.10,0.09,0.12,0.09]

  for (var i = 0; i < rawDates.length ; i += 1) {
    str = rawDates[i];
    date = new Date(Date.parse(str.replace(/-/g, " ")));

    earnedMedia.push([date, rawEarnedMedia[i]]);
    search.push([date, rawSearch[i]]);
    social.push([date, rawSocial[i]]);
  }

  var percFormatter = function(val, axis) {
      return (val * 100).toFixed() + '%';
  }

  var plot = $.plot("#clickthrough-rate", [
    { data: earnedMedia, label: "Earned Media"},
    { data: search, label: "Search"},
    { data: social, label: "Social"}
  ], {
    series: {
      lines: {
        show: true
      },
      shadowSize: 0
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
      max: .25,
      color: "#ffffff",
      tickFormatter: percFormatter
    },
    xaxis: {
        mode: "time",
        timezone: "browser",
        timeformat: "%m/%d/%y",
        minTickSize: [1, "day"],
        color: "#ffffff"
    },
    legend: {
        
    },
    colors: ["#efb669", "#5d9da1", "#3b68aa"]
  });
  var previousPoint = null;
  $("#clickthrough-rate").bind("plothover", function (event, pos, item) {
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
            stringDate + " - " + item.series.label + " " + percFormatter(y, y));
      }
    } else {
      $("#tooltip").remove();
      previousPoint = null;
    }

  });
});
