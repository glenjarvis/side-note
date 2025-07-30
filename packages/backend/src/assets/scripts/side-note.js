console.log("SideNote initialized");
const e = document.getElementById("note-anchor");
e && (e.innerHTML = `
    <p class="note">This is a test page for embedding SideNote comments.</p>
  `);
function o() {
  console.log("SideNote logic goes here");
}
export {
  o as initSideNote
};
