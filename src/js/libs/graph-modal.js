class GraphModal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    };
    this.options = Object.assign(defaultOptions, options);
    this.speed = 300;
    this.animation = 'fade';
    this.modalContainer = null;
    this.isOpen = false;
    this.previousActiveElement = null;
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.openModalsStack = [];
    this.events();
  }

  events() {
    document.addEventListener('click', (e) => {
      const clickedElement = e.target.closest(`[data-graph-path]`);
      if (clickedElement) {
        let target = clickedElement.dataset.graphPath;
        let animation = clickedElement.dataset.graphAnimation;
        let speed = clickedElement.dataset.graphSpeed;
        this.animation = animation ? animation : 'fade';
        this.speed = speed ? parseInt(speed) : 300;
        this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`);
        this.open(clickedElement.closest('.graph-modal__container'));
        return;
      }

      if (e.target.closest('.js-modal-close')) {
        this.close();
        return;
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.isOpen) {
        this.close();
      }

      if (e.which === 9 && this.isOpen) {
        this.focusCatch(e);
        return;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('graph-modal__container') && e.target.classList.contains("is-open")) {
        this.close();
      }
    });
  }

  open(parent) {
    this.previousActiveElement = document.activeElement;

    if (this.isOpen) {
      this.openModalsStack.push(this.modalContainer);
    }

    this.modalContainer = this._nextContainer;

    if (parent) {
      this.modalContainer.setAttribute('data-parent', parent.dataset.graphTarget);
      parent.classList.remove('graph-modal-open');
    }

    this.modalContainer.scrollTo(0, 0);
    this.modalContainer.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modalContainer.closest('.graph-modal').classList.add('is-open');
    this.modalContainer.classList.add('graph-modal-open');

    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';

    this.disableScroll();
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modalContainer.classList.remove('graph-modal-open');

      this.enableScroll();

      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      this.options.isClose(this);
      this.isOpen = false;

      if (this.openModalsStack.length > 0) {
        this.modalContainer = this.openModalsStack.pop();
        this.modalContainer.classList.add('graph-modal-open');
        setTimeout(() => {
          this.modalContainer.classList.add('animate-open');
          this.isOpen = true;
          this.focusTrap();
        }, this.speed);
      } else {
        this.modalContainer.closest('.graph-modal').classList.remove('is-open');
        this.focusTrap();
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement);
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const modal = new GraphModal;
});

module.exports = GraphModal;
