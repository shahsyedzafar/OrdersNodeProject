$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';



$(document).ready(function () {
    var template = "<div style='margin-left:15px;'><div> _id <sup>*</sup>:</div><div> {_id} </div>";
    template += "<div> Item: </div><div>{Item} </div>";
    template += "<div> Total: </div><div>{Total} </div>";
    template += "<div> Units: </div><div>{Units} </div>";
    template += "<div> Rep:</div><div> {Rep} </div>";
    template += "<div> Region:</div><div> {Region} </div>";
    template += "<div> OrderDate:</div><div> {OrderDate} </div>";
    template += "<div> __v:</div><div> {__v} </div>";
    template += "<hr style='width:100%;'/>";
    template += "<div> {sData} {cData}  </div></div>";

    $("#jqGrid").jqGrid({


        url: 'data.JSON',
        // we set the changes to be made at client side using predefined word clientArray
        editurl: 'clientArray',
        datatype: "json",
        colModel: [
            {
                label: '_id',
                name: '_id',
                width: 250,
                key: true,
                editable: true,
                editrules : { required: true}
            },
            {
                label: 'Item',
                name: 'Item',
                width: 100,
                editable: true // must set editable to true if you want to make the field editable
            },
            {
                label : 'Total',
                name: 'Total',
                width: 150,
                editable: true
            },
            {
                label: 'Units',
                name: 'Units',
                width: 80,
                editable: true
            },
            {
                label: 'Rep',
                name: 'Rep',
                width: 140,
                editable: true
            },
            {
                label: 'Region',
                name: 'Region',
                width: 140,
                editable: true
            },
            {
                label: 'OrderDate',
                name: 'OrderDate',
                width: 140,
                editable: true
            },
            {
                label: '__v',
                name: '__v',
                width: 140,
                editable: true
            }
        ],
        sortname: '_id',
        sortorder : 'asc',
        loadonce: true,
        viewrecords: true,
        width: 780,
        height: 200,
        rowNum: 10,
        pager: "#jqGridPager"
    });

    $('#jqGrid').navGrid('#jqGridPager',
        // the buttons to appear on the toolbar of the grid
        { edit: true, add: true, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
        // options for the Edit Dialog
        {
            editCaption: "The Edit Dialog",
            template: template,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Add Dialog
        {
            template: template,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Delete Dailog
        {
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        });
});
