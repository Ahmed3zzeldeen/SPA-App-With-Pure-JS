export function checkValidityReq(formData) {
  const topicInputElm = document.querySelector('[name=topic_title]');
  const topicDetailsInputElm = document.querySelector('[name=topic_details]');

  const topic = formData.get('topic_title');
  const topicDetails = formData.get('topic_details');

  if (!topic || topic.length > 99) {
    topicInputElm.classList.add('is-invalid');
  }
  if (!topicDetails) {
    topicDetailsInputElm.classList.add('is-invalid');
  }

  const allInvalidElms = document.getElementById('formVideoRequest').querySelectorAll('.is-invalid');

  if (allInvalidElms.length) {
    allInvalidElms.forEach(elem => {
      elem.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
    return false;
  }

  return true;
}