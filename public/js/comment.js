const submitCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-body').value.trim();
  const post_id = window.location.toString().split('/').slice(-1)[0];

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ body: comment, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('Response OK');
      document.location.reload();
    } else {
      alert('Failed to add comment.');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', submitCommentHandler);
