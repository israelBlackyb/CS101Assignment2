window.load=doShowAll();
function SaveItem() {
    var name = $("#name").val();
    var data = $("#data").val();
    localStorage.setItem(name, data);
    doShowAll();
}
