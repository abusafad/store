$(document).ready(function() {
    $("#indextable").DataTable({
        ajax: "/index/indexjson",
        retrieve: true,
        paging: true,
        bProcessing: true,
        serverSide: true,
        columns: [{
                data: "bookname"
            },
            {
                data: "name"
            },
            {
                data: "phone"
            }
        ]
    });
});