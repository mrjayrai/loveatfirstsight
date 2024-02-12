let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });

    paper.addEventListener('mousedown', this.handleMouseDown.bind(this));
    paper.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('touchend', this.handleTouchEnd.bind(this));

    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  handleMouseMove(e) {
    if (!this.rotating) {
      this.touchX = e.clientX;
      this.touchY = e.clientY;

      this.velX = this.touchX - this.prevTouchX;
      this.velY = this.touchY - this.prevTouchY;
    }

    this.updatePaperPosition();
  }

  handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];

    if (!this.rotating) {
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;

      this.velX = this.touchX - this.prevTouchX;
      this.velY = this.touchY - this.prevTouchY;
    }

    this.updatePaperPosition();
  }

  handleMouseDown(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    this.setInitialTouchPosition(e.clientX, e.clientY);

    this.adjustZIndex();

    if (e.button === 2) {
      this.rotating = true;
    }
  }

  handleTouchStart(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    const touch = e.touches[0];

    this.setInitialTouchPosition(touch.clientX, touch.clientY);

    this.adjustZIndex();
  }

  handleMouseUp() {
    this.resetPaperState();
  }

  handleTouchEnd() {
    this.resetPaperState();
  }

  setInitialTouchPosition(x, y) {
    this.touchStartX = x;
    this.touchStartY = y;
    this.prevTouchX = x;
    this.prevTouchY = y;
  }

  adjustZIndex() {
    this.paper.style.zIndex = highestZ;
    highestZ += 1;
  }

  resetPaperState() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  updatePaperPosition() {
    if (!this.holdingPaper) return;

    if (!this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    }

    this.prevTouchX = this.touchX;
    this.prevTouchY = this.touchY;

    this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.paper = paper;
  p.init(paper);
});
