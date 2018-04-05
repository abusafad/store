$(document).ready(function() {

    $("#categoriytable").DataTable({
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
                        "'  class='btn btn-success btn-md editcategoriy' data-toggle='modal'  data-target='#myModal8'>  edit </button>                    <button type='button' categoriyid='" +
                        row.id +
                        "' id='deletecategoriy' class='btn btn-danger btn-md deletecategoriy' data-toggle='modal'  data-target='#myModal9'>  delete </button>"
                    );
                }
            }
        ]
    });

    $("body").on("click", ".addcategoriy", function() {
        $(".modal-body").load("/categoriy/add");
    });

    $("body").on("click", ".editcategoriy", function() {
        var categoriyid = $(this).attr("categoriyid");
        $(".modal-body").load("/categoriy/edit?id=" + categoriyid);
    });

    $("body").on("click", ".deletecategoriy", function() {
        var categoriyid = $(this).attr("categoriyid");
        $(".modal-body").load("/categoriy/delete/id/" + categoriyid);
    });

    $("body").on("click", ".sendcategoriy", function() {
        $("#categories").ajaxForm({
            success: function() {
                $("#myModal7").modal("hide");
                $("#categoriytable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".editcategoriy1", function() {
        $("#categories1").ajaxForm({
            success: function() {
                $("#myModal8").modal("hide");
                $("#categoriytable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });

    $("body").on("click", ".deletesubmitCat", function() {
        $("#deleteformCat").ajaxForm({
            success: function() {
                $("#myModal9").modal("hide");
                $("#categoriytable")
                    .DataTable()
                    .ajax.reload();
            }
        });
    });



});