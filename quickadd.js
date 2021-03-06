// Quickadd Plugin
// Plugin box

quickadd_html = '<div id="quickadd-box" class="widget-box"> \
                     <a id="quickadd-header" class="button" href="#">quickadd</a> \
                     <div id="quickadd-content" class="widget-content" style="display: none"> \
                        <table> \
                            <tr><td>date:&nbsp;</td><td><input id="quickadd-input-date" type="text" /></td></tr> \
                            <tr><td>$:</td><td><input id="quickadd-input-val" type="text" /></td></tr> \
                            <tr><td>tags:</td><td><input id="quickadd-input-tags" type="text" /></td></tr> \
                            <tr><td>desc:&nbsp;</td><td><input id="quickadd-input-desc" type="text" /></td></tr> \
                        </table> \
                        <div id="quickadd-state">Salvando...</div> \
                        <div id="quickadd-buttons"> \
                        <button id="quickadd-button-submit" style="margin-left: 32px;">salvar</button> <button id="quickadd-button-clear">limpar</button> \
                        </div> \
                     </div> \
                 </div>';


var css_quickadd_inputs = {
    'width': '112px',
    'padding': '1px 0'
}

var css_quickadd_state = {
    'color': 'red',
    'display': 'none',
    'font-size': '11px',
    'margin-left': '33px',
    'padding-top': '7px'
}

var css_quickadd_buttons = {
    'border': '1px solid #EEE',
    'background': '#F4F4F4',
    'margin-top': '6px',
    'width': '55px',
    'color': '#333'
}

function quickaddSave() {
    quickadd_val = $('#quickadd-input-date').val() + '\t';
    quickadd_val += $('#quickadd-input-val').val() + '\t';
    if($('#quickadd-input-tags').val()) {
        quickadd_val += $('#quickadd-input-tags').val() + ' | ';
    }
    quickadd_val += $('#quickadd-input-desc').val();
     
    $("#editor-data").val(rawData + "\n" + quickadd_val)
    $("#quickadd-buttons").hide();
    $("#quickadd-state").show();
    $('#quickadd-buttons').ajaxStop(function(){
        $(this).show();
        $("#quickadd-state").hide();

        // Clear fields
        quickaddClear();

        // Set focus to value field
        $('#quickadd-input-val').focus();
    });
    editorSave();
}

function quickaddClear() {
    $('#quickadd-input-date').val(getCurrentDate());
    $('#quickadd-input-val').val('')
    $('#quickadd-input-tags').val('')
    $('#quickadd-input-desc').val('')
}

function toggleQuickAddBox() { // show / hide
    current_state = $('#quickadd-content').css('display');
    if(current_state == 'none') {
        $('#quickadd-header').addClass('active');
        $('#quickadd-content').css('display', 'block');
    } else {
        $('#quickadd-header').removeClass('active');
        $('#quickadd-content').hide();
    }
}

$(function() {
    // Append elements
    $(quickadd_html).insertAfter('#search-box');
    $('#quickadd-header').click(function() {
        toggleToolbarBox('quickadd-header', 'quickadd-content');
    });

    // Apply plugin elements styles
    $('[id^="quickadd-input-"]').css(css_quickadd_inputs);
    $('[id^="quickadd-button-"]').css(css_quickadd_buttons);
    $('#quickadd-state').css(css_quickadd_state);

    // Comment below to start hidden
    //toggleQuickAddBox();

    // Others
    $('#quickadd-input-date').val(getCurrentDate());

    // Functions
    $('#quickadd-button-submit').click(quickaddSave);
    $('#quickadd-button-clear').click(quickaddClear);
});