const newReviewHandler = async (event) => {
    event.preventDefault();

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
};

const likeBtnHandler = async (event) => {
    var likes = parseInt(event.target.getAttribute('data-id'));
    likes++;
    //Something's not working here
    try {
        const response = await fetch(`/api/reviews/like`, {
            method: 'PUT',
            body: JSON.stringify({ likes }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.log(err);
    }
}

//to hide the new post button and show the post form
const newPostBtnHandler = (event) => {
    document.querySelector(".new-review-form").style.display = "block";
    document.querySelector(".new-review-div").style.display = "none";
}

const init = () => {
    document.querySelector(".new-review-form").style.display = "none";
}

init();

document
    .querySelector('.new-review')
    .addEventListener('click', newReviewHandler);

document
    .querySelector('.new-review-button')
    .addEventListener('click', newPostBtnHandler);

// document
//     .querySelector('.review-like-button')
//     .addEventListener('click', likeBtnHandler);
