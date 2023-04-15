document.addEventListener('DOMContentLoaded', function () {
  const formVidReq = document.getElementById("formVideoRequest");

  formVidReq.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formVidReq);

    fetch('http://localhost:7777/video-request', {
      method: 'POST',
      body: formData,
    })
      .then((bold) => bold.json())
      .then((data) => {
        console.log(data);
      });
  });
});