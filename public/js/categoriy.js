$(document).ready(function() {
    $("#categoriy_table").DataTable({
        ajax: "/categoriy/categoryjson",
        retrieve: true,
        paging: true,
        bProcessing: true,
        serverSide: true,
        columns: [{
                data: "id"
            },
            {
                data: "name"
            },
            {
                render: function(data, type, row, meta) {
                    return (
                        "<button type='button' categoriyid='" +
                        row.id +
                        "'  class='btn btn-success btn-md edit_categoriy' data-toggle='modal'  data-target='#myModal8'>  edit </button>                    <button type='button' categoriyid='" +
                        row.id +
                        "' id='deletecategoriy' class='btn btn-danger btn-md delete_categoriy' data-toggle='modal'  data-target='#myModal9'>  delete </button>"
                    );
                }
            }
        ]
    });

    $("body").on("click", ".add_categoriy", function() {
        $(".modal-body").load("/categoriy/add");
    });

    $("body").on("click", ".edit_categoriy", function() {
        var categoriyid = $(this).attr("categoriyid");
        $(".modal-body").load("/categoriy/edit?id=" + categoriyid);
    });

    $("body").on("click", ".delete_categoriy", function() {
        var categoriyid = $(this).attr("categoriyid");
        $(".modal-body").load("/categoriy/delete/id/" + categoriyid);
    });

    $("body").on("click", ".submit_Add_Categoriy", function() {
        $("#add_categories_Form").ajaxForm({
            success: function() {
                $("#myModal7").modal("hide");
                $("#categoriy_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".submit_Edit_Categoriy", function() {
        $("#edit_categories_Form").ajaxForm({
            success: function() {
                $("#myModal8").modal("hide");
                $("#categoriy_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".submit_Delete_Categoriy", function() {
        $("#delete_categories_Form").ajaxForm({
            success: function() {
                $("#myModal9").modal("hide");
                $("#categoriy_table")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });
});