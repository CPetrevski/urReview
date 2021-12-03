const newPostHandler = async (event) => {
    event.preventDefault();
    // const editedTitle = document.querySelector('#edit-post-title').value.trim();
    const editReview = document.querySelector('#edit').value.trim();
    const id = document.querySelector('#id').getAttribute("data-id");
    if (event.target.value == "Edit") {
        // if update button is clicked, use PUT to update the article
        const response = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, editReview }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(id)
        console.log(editReview)
        //if success, redirect to dashboard
        if (response.ok) {
            document.location.replace(`/profile`);
        } else {
            alert('Failed to update Review');
        }
    }
};
document
    .querySelector('.edit-post')
    .addEventListener('click', newPostHandler);