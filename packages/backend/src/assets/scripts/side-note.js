console.log("SideNote initialized");
const e = document.getElementById("app");
e && (e.innerHTML = `
    <h1>SideNote</h1>
    <p>This is a test page for embedding SideNote comments.</p>
    <p>Click on a paragraph to add a comment (feature coming soon).</p>
  `);
function o() {
  console.log("SideNote logic goes here");
}
export {
  o as initSideNote
};
