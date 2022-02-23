export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentId = contentId;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalEl = modalElements.querySelector(".modal");
      this.backdropEl = modalElements.querySelector(".backdrop");
      const contentEl = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalEl.appendChild(contentEl);

      document.body.insertAdjacentElement("afterbegin", this.modalEl);
      document.body.insertAdjacentElement("afterbegin", this.backdropEl);
    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    document.body.removeChild(this.modalEl);
    document.body.removeChild(this.backdropEl);

    console.log(this.modalEl instanceof Node, this.backdropEl instanceof Node);
    this.modalEl = null;
    this.backdropEl = null;
    //   const modalEl = document.querySelector(".modal");
    //   const backdrop = document.querySelector(".backdrop");
    //   backdrop.remove();
    //   modalEl.remove();
  }
}
