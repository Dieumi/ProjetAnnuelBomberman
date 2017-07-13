
var JSHINT_options = {};

function set_options() {
    JSHINT_options = {
        undef: true,
        unused: true,
        browser: $("#browser").is(":checked"),
        devel: $("#browser").is(":checked"),
        browserify: $("#browserify").is(":checked"),
        couch: $("#couch").is(":checked"),
        dojo: $("#dojo").is(":checked"),
        jasmine: $("#jasmine").is(":checked"),
        jquery: $("#jquery").is(":checked"),
        mocha: $("#mocha").is(":checked"),
        module: $("#module").is(":checked"),
        mootools: $("#mootools").is(":checked"),
        node: $("#node").is(":checked"),
        nonstandard: $("#nonstandard").is(":checked"),
        phantom: $("#phantom").is(":checked"),
        prototypejs: $("#prototypejs").is(":checked"),
        qunit: $("#qunit").is(":checked"),
        rhino: $("#rhino").is(":checked"),
        shelljs: $("#shelljs").is(":checked"),
        typed: $("#typed").is(":checked"),
        worker: $("#worker").is(":checked"),
        wsh: $("#wsh").is(":checked"),
        yui: $("#yui").is(":checked")
    };
}

set_options();



function validate(type) {

    code = txtATest;
    JSHINT(code, JSHINT_options);
    errors = JSHINT.errors;
    count = errors.length;
    data = "";


    if (count == 0) {
        data = '';
    } else {
        for (i = 0; i < count; i++) {
            if (errors[i] != null) {
                data += "Ligne : " + errors[i].line + ", erreur : " + errors[i].reason +"<br>";
            }
        }

    }
    if (count > 0) {
        console.log(document.getElementById("msgError"))
        document.getElementById("msgError").innerHTML = data;
        document.getElementById("msgError").style.visibility = "visible";
    }
    
    else if (count == 0 && type == "save") {
        document.getElementById("formBomberCode").submit();
    } else if (count == 0 && type == "test") {
        document.getElementById("formBomberCode").setAttribute("action", "/bomberCode/testInGame");
        document.getElementById("formBomberCode").submit();
    }

}

