$(document).ready(function() {
    $("#authortable").DataTable({
        ajax: "/author/authorjson",
        retrieve: true,
        paging: true,
        bProcessing: true,
        serverSide: true,
        columns: [{
                data: "name"
            },
            {
                data: "email"
            },
            {
                data: "phone"
            },
            {
                data: "address"
            },
            {
                render: function(data, type, row, meta) {
                    return (
                        "<button type='button' authorid='" +
                        row.id +
                        "' id='editauthor' class='btn btn-success btn-md editauthor' data-toggle='modal'  data-target='#myModal5'>  edit </button>                                  <button type='button' authorid='" +
                        row.id +
                        "' id='deleteauthor' class='btn btn-danger btn-md deleteauthor' data-toggle='modal'  data-target='#myModal6'>  delete </button>"
                    );
                }
            }
        ]
    });

    $("body").on("click", ".addauthor", function() {
        $(".modal-body").load("/author/add");
    });

    $("body").on("click", ".editauthor", function() {
        var authorid = $(this).attr("authorid");
        $(".modal-body").load("/author/edit?id=" + authorid);
    });

    $("body").on("click", ".deleteauthor", function() {
        var authorid = $(this).attr("authorid");
        $(".modal-body").load("/author/delete/id/" + authorid);
    });

    $("body").on("click", ".sendauthor", function() {
        $("#author").ajaxForm({
            success: function() {
                $("#myModal4").modal("hide");
                $("#authortable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".editauthor1", function() {
        $("#editauthorform").ajaxForm({
            success: function() {
                $("#myModal5").modal("hide");
                $("#authortable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".deletesubmit1", function() {
        $("#deleteform1").ajaxForm({
            success: function() {
                $("#myModal6").modal("hide");
                $("#authortable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });
});