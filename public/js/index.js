$(document).ready(function() {
    $("#indextable").DataTable({
        ajax: {
            url: "/index/indexjson",
            type: "POST"
        },
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