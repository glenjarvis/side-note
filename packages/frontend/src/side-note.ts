import getCssSelector from "css-selector-generator";

const NODE_ELEMENT_TYPE = 1; // 1: Node Element; 3: Text Node

// TODO: Find way to DRY with backend. This is duplicated in backend:
type SideNoteRecord = {
  pageURL: string;
  selector: string;
  targetText: string;
  noteText: string | null;
  startOffset: number | null;
  endOffset: number | null;
  isSaved?: boolean;
  context: string;
};

/*
 * On "MouseUp", check if a text selection (highlight) was
 * made on the page.
 */
function addNoteToHighlight(): SideNoteRecord | void {
  const selection = window.getSelection();
  const record: SideNoteRecord = {
    pageURL: window.location.href,
    selector: "",
    targetText: "",
    noteText: "",
    startOffset: null,
    endOffset: null,
    context: "",
    isSaved: false
  };

  // selection.isCollapsed checks if a genuine selection (highlight) was
  // made. That is, it checks that the root and focus points are defined
  // and not equal. https://w3c.github.io/selection-api/#selection-interface
  if (selection && !selection.isCollapsed) {
    record.targetText = selection.toString().trim();

    if (record.targetText.length > 0) {
      const range = selection.getRangeAt(0);
      record.startOffset = range.startOffset;
      record.endOffset = range.endOffset;

      // noteWrapper
      const noteWrapper = document.createElement("span");
      noteWrapper.className = "note-wrapper";
      // stickyNote
      const stickyNote = document.createElement("span");
      stickyNote.className = "sticky-note";
      record.noteText = window.prompt("Contents for SideNote:");
      stickyNote.textContent = record.noteText;

      // insert into Doc
      const selectedTextNode = document.createTextNode(record.targetText);
      noteWrapper.appendChild(selectedTextNode);
      noteWrapper.appendChild(stickyNote);
      range.deleteContents();
      range.insertNode(noteWrapper);

      const container = range.commonAncestorContainer;
      const parentElement: Element | null =
        container.nodeType === NODE_ELEMENT_TYPE
          ? (container as Element)
          : container.parentElement;
      if (parentElement) {
        record.selector = getCssSelector(parentElement);
      } else {
        // Please open a bug if you encounter this. I don't yet know when we
        // would ever encounter a null parentElement. Please include the
        // following error:
        throw Error(`I could not determine CSS Selector for: ${JSON.stringify(record)}`);
      }
      console.log(`Database Record: ${JSON.stringify(record)}`);

      return record;
    }
  }
}

document.addEventListener("mouseup", addNoteToHighlight);

export function initSideNote() {
  console.log("initSideNote exported...");
}
