$(document).ready(function() {




    $("body").on("click", ".submit_Add_book", function() {
        $("#add_Book_Form").ajaxForm({
            success: function() {
                $("#myModal1").modal("hide");
                $("#book_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });



    $("body").on("click", ".edit_book", function() {
        setInterval(function() {
            $("#edit_Book_Form").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 4
                    },

                    descrabtion: {
                        required: true
                    },
                    authorid: {
                        required: true
                    },

                    priceJod: {
                        require_from_group: [1, ".price-group"]
                    },
                    priceUsd: {
                        require_from_group: [1, ".price-group"]
                    },
                    priceEru: {
                        require_from_group: [1, ".price-group"]
                    },
                    startDate: {
                        required: function(element) {
                            return $(".endDate_edit").val().length > 0;
                        }
                    },
                    endDate: {
                        required: function(element) {
                            return $(".startDate_edit").val().length > 0;
                        }
                    }
                }
            });
        }, 100);
    });


    $("body").on("click", ".add_book", function() {

        setInterval(function() {

            $("#add_Book_Form").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 4
                    },

                    descrabtion: {
                        required: true
                    },
                    authorid: {
                        required: true
                    },

                    priceJod: {
                        require_from_group: [1, ".price-group"]
                    },
                    priceUsd: {
                        require_from_group: [1, ".price-group"]
                    },
                    priceEru: {
                        require_from_group: [1, ".price-group"]
                    },
                    startDate: {
                        required: function(element) {
                            return $("#endDate_add").val().length > 0;
                        }
                    },
                    endDate: {
                        required: function(element) {
                            return $("#startDate_add").val().length > 0;
                        }
                    }
                }
            });
        }, 100);


    });

    $("#book_table").DataTable({
        ajax: {
            url: "/book/bookjson",
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
                data: "descrabtion"
            },
            {
                data: "priceJod"
            },
            {
                data: "priceUsd"
            },
            {
                data: "priceEru"
            },
            {
                data: "startDate"
            },
            {
                data: "endDate"
            },
            {
                render: function(data, type, row) {
                    var rowName = row.catname;
                    var nameOfCat = rowName.split(",");

                    for (var i = 0; i < nameOfCat.length; i++) {
                        return (
                            "<span class='catNameSpan'>" +
                            nameOfCat.join(" </span> " + "<span class='catNameSpan'>") +
                            "</span>"
                        );
                    }
                }
            },
            {
                render: function(data, type, row) {
                    var datenow = new Date().toLocaleString().split(",")[0];
                    var datenow2 = Date.parse(datenow);
                    var startDate1 = Date.parse(row.startDate);
                    var endDate1 = Date.parse(row.endDate);

                    if (datenow2 >= startDate1 && datenow2 <= endDate1) {
                        return "offer";
                    } else {
                        return "no";
                    }
                }
            },
            {
                render: function(data, type, row) {
                    return (
                        "<button type='button' bookid='" +
                        row.bookid +
                        "' class='btn btn-success btn-md edit_book' data-toggle='modal' data-target='#myModal2'>  edit </button>                                                            <button type='button' bookid='" +
                        row.bookid +
                        "' class='btn btn-danger btn-md delete_book' data-toggle='modal' data-target='#myModal3'>delete</button> "
                    );
                }
            }
        ]
    });



    $("body").on("click", ".add_book", function() {
        $(".modal-body").load("/book/add");
    });

    $("body").on("click", ".edit_book", function() {
        var bookid = $(this).attr("bookid");
        $(".modal-body").load("/book/edit?id=" + bookid);
    });

    $("body").on("click", ".delete_book", function() {
        var bookid = $(this).attr("bookid");
        $(".modal-body").load("/book/delete/id/" + bookid);
    });





    $("body").on("click", ".submit_Edit_book", function() {
        $("#edit_Book_Form").ajaxForm({
            success: function() {
                $("#myModal2").modal("hide");
                $("#book_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".submit_Delete_book", function() {
        $("#delete_Book_Form").ajaxForm({
            success: function() {
                $("#myModal3").modal("hide");
                $("#book_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });



   


    $("body").on("click", ".add_book", function() {
        setTimeout(function() {
            $("#category_select").select2();

            $("#startDate_add").datepicker({
                minDate: 0,
                numberOfMonths: 1,
                onSelect: function(selected) {
                    $("#endDate_add").datepicker(
                        "option",
                        "minDate",
                        selected
                    );
                }
            });

            $("#endDate_add").datepicker({
                minDate: 0,
                numberOfMonths: 1,
                onSelect: function(selected) {
                    $("#startDate_add").datepicker(
                        "option",
                        "maxDate",
                        selected
                    );
                }
            });
        }, 100);
    });


    $("body").on("click", ".edit_book", function() {
        setTimeout(function() {

            $(".category_select").select2();

            $(".startDate_edit").datepicker({
                minDate: 0,
                numberOfMonths: 1,
                onSelect: function(selected) {
                    $(".endDate_edit").datepicker("option", "minDate", selected);
                }
            });

            $(".endDate_edit").datepicker({
                minDate: 0,
                numberOfMonths: 1,
                onSelect: function(selected) {
                    $(".startDate_edit").datepicker("option", "maxDate", selected);
                }
            });

        }, 100);
    });
});