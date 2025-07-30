console.log('SideNote initialized');  

const note = document.getElementById('note-anchor');

if (note) {
  note.innerHTML = `
    <p class="note">This is a test page for embedding SideNote comments.</p>
  `;
}

export function initSideNote() {
  console.log('SideNote logic goes here');
}
