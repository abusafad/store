$(document).ready(function() {
    $("#author_table").DataTable({
        ajax: {
            url: "/author/authorjson",
            type: "POST"
        },
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
                        "' id='editauthor' class='btn btn-success btn-md edit_author' data-toggle='modal'  data-target='#myModal5'>  edit </button>                                  <button type='button' authorid='" +
                        row.id +
                        "' id='deleteauthor' class='btn btn-danger btn-md delete_author' data-toggle='modal'  data-target='#myModal6'>  delete </button>"
                    );
                }
            }
        ]
    });

    $("body").on("click", ".add_author", function() {
        $(".modal-body").load("/author/add");
    });

    $("body").on("click", ".edit_author", function() {
        var authorid = $(this).attr("authorid");
        $(".modal-body").load("/author/edit?id=" + authorid);
    });

    $("body").on("click", ".delete_author", function() {
        var authorid = $(this).attr("authorid");
        $(".modal-body").load("/author/delete/id/" + authorid);
    });

    $("body").on("click", ".submit_Add_Author", function() {
        $("#add_Author_Form").ajaxForm({
            success: function() {
                $("#myModal4").modal("hide");
                $("#author_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".submit_Edit_Author", function() {
        $("#edit_Author_Form").ajaxForm({
            success: function() {
                $("#myModal5").modal("hide");
                $("#author_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".submit_Delete_Author", function() {
        $("#delete_Author_Form").ajaxForm({
            success: function() {
                $("#myModal6").modal("hide");
                $("#author_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });
});