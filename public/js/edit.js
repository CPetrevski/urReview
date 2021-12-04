const newPostHandler = async (event) => {
    event.preventDefault();
    // const editedTitle = document.querySelector('#edit-post-title').value.trim();
    const review = document.querySelector('#edit').value.trim();
    const id = document.querySelector('#id').getAttribute("data-id");
    if (event.target.value == "Edit") {
        // if update button is clicked, use PUT to update the article
        const response = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, review }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //if success, redirect to the previous page
        if (response.ok) {
            //document.location.replace(`/profile`);
            document.location.replace(localStorage.getItem("prevUrl"));
        } else {
            alert('Failed to update Review');
        }
    } else if (event.target.value == "cancel") {
        // if cancel button is clicked, redirect to the previous page
        document.location.replace(localStorage.getItem("prevUrl"));
    }
};
document
    .querySelector('.edit-post')
    .addEventListener('click', newPostHandler);