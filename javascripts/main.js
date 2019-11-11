console.log('This would be the main JS file.');

//--Drawing header and footer patterns using Trianglify library--------------------

function draw() {
  var header = document.getElementById('header');
  var footer = document.getElementById('footer');
  var colorArray = [
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#ffffff',
    '#f0f0f0',
    '#d9d9d9',
    '#bdbdbd',
    '#969696',
    '#737373',
    '#525252',
    '#252525',
    '#000000',
    '#000000',
    '#000000',
    '#000000',
  ];

  var hpattern = Trianglify({
    //Header pattern object
    width: header.offsetWidth,
    height: header.offsetHeight,
    variance: 1,
    x_colors: colorArray,
    y_colors: ['#252525', '#252525'],
    stroke_width: 1,
    cell_size: 30,
  });

  var fpattern = Trianglify({
    //Footer pattern object
    width: footer.offsetWidth,
    height: footer.offsetHeight,
    variance: 1,
    x_colors: colorArray.reverse(),
    y_colors: ['#252525', '#252525'],
    stroke_width: 1,
    cell_size: 30,
  });

  //These are to prevent the function to draw more than 1 pattern
  var hsvg = header.getElementsByTagName('svg');
  if (hsvg.length > 0) header.removeChild(hsvg[0]);
  header.appendChild(hpattern.svg());

  var fsvg = footer.getElementsByTagName('svg');
  if (fsvg.length > 0) footer.removeChild(fsvg[0]);
  footer.appendChild(fpattern.svg());
}

//--Random path(s) fill-----------------------------------------------------------

function randomPath() {
  //Choses a svg element at random.
  var svgNodes = header.getElementsByTagName('svg')[0].childNodes;
  var n = Math.floor(Math.random() * svgNodes.length);
  return svgNodes[n];
}

function randomPathsArray() {
  var svgNodes = header.getElementsByTagName('svg')[0].childNodes;
  var r = Math.floor(Math.random() * 10);
  var arr = [];

  for (i = 0; i < r; i++) {
    var n = Math.floor(Math.random() * svgNodes.length);
    arr.push(n);
  }
  for (var a = 0; a < arr.length; a++) {
    blink(svgNodes[arr[a]]);
  }
}

function randomTime(min, max) {
  //Choses a time (ms) at random between two values (inclusive).
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function blink(path, arr) {
  //(Re)fills the path, waits a bit and removes the fill (back to initial css rule).
  path.style.fill = path.getAttribute('fill');
  setTimeout(function() {
    path.style.fill = 'none';
  }, randomTime(250, 600));
}

//--Shuffle the colors of the boxes-----------------------------------------------

function shuffle(array) {
  //function to shuffle array elements
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function randomColors() {
  var colors = ['#09B3CA', '#F19F19', '#B5CF5D', '#BB1881'];
  colors = shuffle(colors); //shuffles the colors

  var elements = {
    blue: document.querySelectorAll('.blue'),
    orange: document.querySelectorAll('.orange'),
    purple: document.querySelectorAll('.purple'),
    green: document.querySelectorAll('.green'),
  };

  var j = 0;

  for (var i in elements) {
    //cicles through the elements to be colored and applies a color from the shuffled array.
    for (e = 0; e < elements[i].length; e++) {
      if (elements[i][e].className.indexOf('box') === -1) {
        elements[i][e].style.color = colors[j];
      } else elements[i][e].style.borderColor = colors[j];
    }
    j++;
  }
  /*Solves the problem with forEach loop (looks cleaner), but has browser compatibility issues.
        for (var i in elements) { //cicles through the elements to be colored and applies a color from the shuffled array.
            elements[i].forEach(function (e) { if (e.className.indexOf("box")===-1) e.style.color = colors[j];
            else e.style.borderColor = colors[j]; });
            j++;
        }*/
}

//--Execute/initialize functions--------------------------------------------------

draw(); // draws the triangles header and footer.
randomColors();
//window.onresize = function() { draw() } //Redraws the svg(s) on resize for responsive design (two ways of doing the same thing, just pick one):
window.addEventListener('resize', draw);

var noHover = setInterval(function() {
  blink(randomPath());
}, randomTime(200, 600));
var hover;

document.getElementById('myName').onmouseenter = function() {
  //On entering the name <div> switch to fill arrays of paths.
  clearInterval(noHover);
  hover = setInterval(function() {
    randomPathsArray();
  }, randomTime(200, 600));
};

document.getElementById('myName').onmouseleave = function() {
  //On exiting the name <div> return to the previous fill pattern.
  clearInterval(hover);
  noHover = setInterval(function() {
    blink(randomPath());
  }, randomTime(200, 600));
};

var arr = document.getElementsByTagName('a');

arr = Array.from(arr);

arr.forEach(function(e) {
  e.onmouseenter = function() {
    //On entering the name <div> switch to fill arrays of paths.
    clearInterval(noHover);
    hover = setInterval(function() {
      randomPathsArray();
    }, randomTime(200, 600));
  };
});

arr.forEach(function(e) {
  e.onmouseleave = function() {
    //On exiting the name <div> return to the previous fill pattern.
    clearInterval(hover);
    noHover = setInterval(function() {
      blink(randomPath());
    }, randomTime(200, 600));
  };
});

// module.exports = {shuffle, randomColors};
