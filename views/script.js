document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.getElementById('check');
    _selector.addEventListener('change', function (event) {
        if (_selector.checked) {
            document.getElementById("todo1").style.textDecoration = "line-through";
        } else {
            document.getElementById("todo1").style.textDecoration = "none";
        }
    });



});