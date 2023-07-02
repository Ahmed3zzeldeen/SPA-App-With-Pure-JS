export function sortByStatus(sortBy) {
  if (sortBy == 'topVotedFirst') {
    document.getElementById('sort_by_top').classList.add('active');
    document.getElementById('sort_by_new').classList.remove('active');
  } else {
    document.getElementById('sort_by_new').classList.add('active');
    document.getElementById('sort_by_top').classList.remove('active');
  }
}
