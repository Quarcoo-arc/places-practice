class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentId = contentId;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {
      const modalElements = document.importNode(this.modalTemplateEl, true);
      const modalEl = modalElements.querySelector(".modal");
      const backdropEl = modalElements.querySelector(".backdrop");
      const contentEl = document.importNode(this.contentTemplateEl, true);

      modalEl.appendChild(contentEl);

      document.body.insertAdjacentElement("afterbegin", modalEl);
      document.body.insertAdjacentElement("afterbegin", backdropEl);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {}
}
