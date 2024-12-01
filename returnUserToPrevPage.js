document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('.return-to-prev-page');
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
        });
    }
});

