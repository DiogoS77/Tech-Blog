const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if (title && body) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const showEditForm = () => {
  const noteDisplay = document.querySelector('.text-center');
  const editForm = document.querySelector('.edit-note-form');

  noteDisplay.classList.add('d-none');
  editForm.classList.remove('d-none');
};

const hideEditForm = () => {
  const noteDisplay = document.querySelector('.text-center');
  const editForm = document.querySelector('.edit-note-form');

  noteDisplay.classList.remove('d-none');
  editForm.classList.add('d-none');
};

const editFormHandler = async (event) => {
  event.preventDefault();

  const postId = '{{postId}}';

  const title = document.querySelector('#edit-post-title').value.trim();
  const body = document.querySelector('#edit-post-body').value.trim();

  if (title && body) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload(); // Reload the page to see the updated note
    } else {
      alert('Failed to update note');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.classList.contains('btn-danger')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
document.querySelector('.edit-btn').addEventListener('click', showEditForm);
document.querySelector('.cancel-btn').addEventListener('click', hideEditForm);
document
  .querySelector('.edit-form')
  .addEventListener('submit', editFormHandler);
