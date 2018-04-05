$(document).ready(function() {


    $("body").on("click", ".addbook", function() {
        $(".modal-body").load("/book/add");

    });




    $("body").on("click", ".addbook", function() {
        setInterval(function() {
            $("#book").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 4
                    },

                    descrabtion: {
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
                            return $("#endDate").val().length > 0;
                        }
                    },
                    endDate: {
                        required: function(element) {
                            return $("#startDate").val().length > 0;
                        }
                    }
                }
            });
        }, 100);
    });


    $("body").on("click", ".editbookbutton", function() {
        setInterval(function() {
            $("#editbookform").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 4
                    },

                    descrabtion: {
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
                    }
                }
            });
        }, 100);
    });

    $("body").on("click", ".editbookbutton", function() {
        var bookid = $(this).attr("bookid");
        $(".modal-body").load("/book/edit?id=" + bookid);
    });

    $("body").on("click", ".deletebook", function() {
        var bookid = $(this).attr("bookid");
        $(".modal-body").load("/book/delete/id/" + bookid);
    });


    $("body").on("click", ".sendbook", function() {
        $("#book").ajaxForm({
            success: function() {
                $("#myModal1").modal("hide");
                $("#booktable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".sendeditbook", function() {
        $("#editbookform").ajaxForm({
            success: function() {
                $("#myModal2").modal("hide");
                $("#booktable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".deletesubmit", function() {
        $("#deleteform11").ajaxForm({
            success: function() {
                $("#myModal3").modal("hide");
                $("#booktable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("#booktable").DataTable({
        ajax: "/book/bookjson",

        retrieve: true,
        paging: true,
        bProcessing: true,
        serverSide: true,
        columns: [{
                data: "bookname",

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

                        return "<span class='catNameSpan'>" + nameOfCat.join(" </span> " + "<span class='catNameSpan'>");
                    }
                }
            }, {
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
            }, {
                render: function(data, type, row) {
                    return (
                        "<button type='button' bookid='" +
                        row.bookid +
                        "' class='btn btn-success btn-md editbookbutton' data-toggle='modal' data-target='#myModal2'>  edit </button>                                                            <button type='button' bookid='" +
                        row.bookid +
                        "' class='btn btn-danger btn-md deletebook' data-toggle='modal' data-target='#myModal3'>delete</button> "
                    );
                }
            }
        ]
    });



    $(".js-example-basic-multiple").select2();

    $("#startDate").datepicker({
        minDate: 0,
        numberOfMonths: 1,
        onSelect: function(selected) {
            $("#endDate").datepicker("option", "minDate", selected);
        }
    });

    $("#endDate").datepicker({
        minDate: 0,
        numberOfMonths: 1,
        onSelect: function(selected) {
            $("#startDate").datepicker("option", "maxDate", selected);
        }
    });

    $(".start").datepicker({
        minDate: 0,
        numberOfMonths: 1,
        onSelect: function(selected) {
            $(".end").datepicker("option", "minDate", selected);
        }
    });

    $(".end").datepicker({
        minDate: 0,
        numberOfMonths: 1,
        onSelect: function(selected) {
            $(".start").datepicker("option", "maxDate", selected);
        }
    });

});