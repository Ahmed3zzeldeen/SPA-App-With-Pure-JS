import { checkValidityLogin } from './utils/checkValidityLogin.js'
import { checkValidityReq } from './utils/checkValidityReq.js';
import { debounce } from './utils/debounce.js';
import { renderSingleVidReq } from './renderSingleVidReq.js';
import { sortByStatus } from './utils/sortByStatus.js';


const SUPER_USER_ID = '20020325';
const state = {
  sortBy: 'newFirst',
  searchTerm: '',
  filterTerm: 'all',
  userId: '',
  isValidLogin: false,
  isSuperUser: false,
}


const listOfVidsElm = document.getElementById('listOfRequests');




function loadAllVidReqs(sortBy = 'newFirst', searchTerm = '', filterTerm = 'all') {
  fetch(`http://localhost:7777/video-request?sortBy=${sortBy}&searchTerm=${searchTerm}&filterTerm=${filterTerm}`)
    .then((blob) => blob.json())
    .then(data => {
      listOfVidsElm.innerHTML = '';
      data.forEach((vidInfo) => {
        renderSingleVidReq(vidInfo, state);
      });
    });
}


document.addEventListener('DOMContentLoaded', function () {
  const formVidReqElm = document.getElementById('formVideoRequest');
  const sortByElms = document.querySelectorAll('[id*=sort_by_]');
  const searchBoxElm = document.getElementById('search_box');
  const filterByElms = document.querySelectorAll('[id^=filter_by_]');
  const formLoginElm = document.querySelector('.login-form');
  const formLoginContElm = document.querySelector('.login-form-container');
  const appContainerElm = document.querySelector('.app-container');



  if (window.location.search) {
    state.userId = new URLSearchParams(window.location.search).get('id');

    if (state.userId == SUPER_USER_ID) {
      state.isSuperUser = true;
      document.querySelector('.normal-user-content').classList.add('d-none');
    }
    formLoginElm.classList.add('d-none');
    appContainerElm.classList.remove('d-none');
  } else {
    formLoginElm.addEventListener('submit', (e) => {
      const loginFormData = new FormData(formLoginContElm);
      state.isValidLogin = checkValidityLogin(loginFormData);
      if (state.isValidLogin) {
        state.userId = new URLSearchParams(window.location.search).get('id');
        formLoginElm.classList.add('d-none');
        appContainerElm.classList.remove('d-none');
      } else {
        e.preventDefault();
      }
    });
  }


  loadAllVidReqs();
  sortByStatus(state.sortBy);

  sortByElms.forEach((elem) => {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      state.sortBy = this.querySelector('input').value;
      loadAllVidReqs(state.sortBy, state.searchTerm, state.filterTerm);
      sortByStatus(state.sortBy);
    });
  });
  searchBoxElm.addEventListener('input', debounce((e) => {
    state.searchTerm = e.target.value;
    loadAllVidReqs(state.sortBy, state.searchTerm, state.filterTerm);
  }, 300));

  filterByElms.forEach((elem) => {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      const [, , filterTerm] = e.target.getAttribute('id').split('_');
      state.filterTerm = filterTerm;
      filterByElms.forEach((option) => option.classList.remove('active'));
      this.classList.add('active');
      loadAllVidReqs(state.sortBy, state.searchTerm, state.filterTerm);
    })
  });

  formVidReqElm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formVidReqElm);
    formData.append('author_id', state.userId);
    const isValidReq = checkValidityReq(formData);
    if (isValidReq) {
      fetch('http://localhost:7777/video-request', {
        method: 'POST',
        body: formData,
      })
        .then((bold) => bold.json())
        .then((data) => {
          renderSingleVidReq(data, state, true);
        });
    }
  });
});



