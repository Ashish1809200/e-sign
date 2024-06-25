window.onload = function () {
  let myCanvas = document.getElementById("myCanvas");
  //   let canvasWrapper = document.querySelector(".canvas");
  let ctx = myCanvas.getContext("2d");

  // Fill Window Width and Height
  myCanvas.width = window.innerWidth - 200;
  myCanvas.height = window.innerHeight - 250;

  // Set Background Color
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

  // Mouse Event Handlers
  let isDown = false;
  let canvasX, canvasY;
  ctx.lineWidth = 5;

  myCanvas.addEventListener("mousedown", function (e) {
    isDown = true;
    ctx.beginPath();
    canvasX = e.pageX - myCanvas.offsetLeft;
    canvasY = e.pageY - myCanvas.offsetTop;
    ctx.moveTo(canvasX, canvasY);
  });

  myCanvas.addEventListener("mousemove", function (e) {
    if (isDown) {
      canvasX = e.pageX - myCanvas.offsetLeft;
      canvasY = e.pageY - myCanvas.offsetTop;
      ctx.lineTo(canvasX, canvasY);
      ctx.strokeStyle = "#000";
      ctx.stroke();
    }
  });

  myCanvas.addEventListener("mouseup", function (e) {
    isDown = false;
    ctx.closePath();
  });

  // Touch Events Handlers
  let draw = {
    started: false,
    start: function (evt) {
      ctx.beginPath();
      ctx.moveTo(
        evt.touches[0].pageX - myCanvas.offsetLeft,
        evt.touches[0].pageY - myCanvas.offsetTop
      );
      this.started = true;
    },
    move: function (evt) {
      if (this.started) {
        ctx.lineTo(
          evt.touches[0].pageX - myCanvas.offsetLeft,
          evt.touches[0].pageY - myCanvas.offsetTop
        );
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 5;
        ctx.stroke();
      }
    },
    end: function (evt) {
      this.started = false;
    },
  };

  // Touch Events
  myCanvas.addEventListener(
    "touchstart",
    function (evt) {
      draw.start(evt);
    },
    false
  );

  myCanvas.addEventListener(
    "touchend",
    function (evt) {
      draw.end(evt);
    },
    false
  );

  myCanvas.addEventListener(
    "touchmove",
    function (evt) {
      draw.move(evt);
    },
    false
  );

  // Disable Page Move
  document.body.addEventListener(
    "touchmove",
    function (evt) {
      evt.preventDefault();
    },
    false
  );

  document.querySelector(".export-btn").addEventListener("click", function () {
    let dataUrl = myCanvas.toDataURL();
    createPDF(dataUrl);
  });

  function createPDF(imageDataUrl) {
    const {jsPDF} = window.jspdf;
    let pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imageDataUrl, "PNG", 10, 10, 190, 150);
    pdf.save("signature.pdf");
  }

  document.querySelector(".reset-btn").addEventListener("click", function () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
  });
};
