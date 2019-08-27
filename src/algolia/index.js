import Modal from '../common/modal';
import './index.scss';

const client = algoliasearch('G9YPYSSH17', 'd7cec85d3767ad6715d4558013f94ef9');
const index = client.initIndex('nba');

const $searchInput = document.getElementById('searchInput');
const $content = document.getElementById('content');

function stringToDom(str) {
  const elm = document.createElement('div');
  elm.innerHTML = str;
  return elm.childNodes[0];
}
function generateCards(hits) {
  const frag = document.createDocumentFragment();
  for (let hit of hits) {
    frag.appendChild(
      stringToDom(`<div class="card">
    <img class="pic" src="${hit.pic}" alt="">
    <div class="info">
      <div class="cname">${hit.cname}</div>
      <div class="ename">${hit.ename}</div>
      <span class="height">${hit.height}CM</span>
      <span class="weight">${hit.weight}KG</span>
    </div>
  </div>`),
    );
  }
  return frag;
}
$searchInput.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    const query = e.target.value.trim();
    index.search(
      {
        query,
      },
      (err, { hits } = {}) => {
        if (err) throw err;
        $content.innerHTML = '';
        if (hits.length > 0) {
          $content.appendChild(generateCards(hits));
        }
      },
    );
  }
});

// const addModal = new Modal({
//   id: 'addModal',
// });

// const $addWord = document.getElementById('addWord');
// const $modalForm = document.getElementById('modalForm');
// const $modalConfirm = document.getElementById('modalConfirm');
// const $modalCancel = document.getElementById('modalCancel');
// $addWord.addEventListener('click', function() {
//   addModal.show();
// });
// $modalConfirm.addEventListener('click', function() {
//   const formData = new FormData($modalForm);
//   $modalForm.reset();
//   addModal.hide();
// });
// $modalCancel.addEventListener('click', function() {
//   addModal.hide();
// });
