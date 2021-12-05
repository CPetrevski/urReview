const newReviewHandler = async (event) => {
    
    
    event.preventDefault();
    if (event.target.value == "post") {
        const review = document.querySelector('#new-review-content').value.trim();
        const movie_id = event.target.getAttribute('data-id');

        
        if (review) {
            //if there's something in the review, do a POST to create a new article 
            const response = await fetch(`/api/reviews`, {
                method: 'POST',
                body: JSON.stringify({ review, movie_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //if success, redirect to dashboard
            if (response.ok) {
                document.location.replace(`/movie/${movie_id}`);
            } else {
                alert('Failed to create article');
            }
        }
    } else if (event.target.value == "cancel") {
        document.querySelector(".new-review-form").style.display = "none";
        document.querySelector(".new-review-div").style.display = "block";
    }
};

const reviewToolHandler = async (event) => {

    if (event.target.getAttribute('value') == "edit") {
        const id = event.target.getAttribute('data-id');

        //save current URL for when edit is done
        localStorage.setItem("prevUrl", window.location.href);

        //call the /review/ID/edit API to continue edit
        document.location.replace(`/review/${id}/edit`);

    } else if (event.target.getAttribute('value') == "delete") {

        if (confirm("Confirm to delete the review?")) {
            const id = event.target.getAttribute('data-id');

            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
            });

            //if success, reload the page
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete the review');
            }
        }
    }

}


//to hide the new post button and show the post form
const newReviewBtnHandler = (event) => {
    document.querySelector(".new-review-form").style.display = "block";
    document.querySelector(".new-review-div").style.display = "none";
}



document
    .querySelector('.new-review')
    .addEventListener('click', newReviewHandler);



document
    .querySelector('.review-tool')
    .addEventListener('click', reviewToolHandler);

