
var player = "function Player(t,i,n){";
var playerEnd = "}var player = new Player(null, \"test\", null);";
var functionVarAuthorize = [];
$.ajax({
    type: "GET",
    url: "/gameApiDesc",
    success: function (data) {
        var gameFunctionValidator = data
        var tmpP = "";
        var paramsFunc;
        var parmsRdy = "";
        for (var i = 0; i < gameFunctionValidator.length; i++) {
            if (gameFunctionValidator[i].typeGameApiDesc == "function") {
                functionVarAuthorize.push(new RegExp("player."+gameFunctionValidator[i].nameGameApiDesc+"\\("));
                parmsRdy = "";
                paramsFunc = gameFunctionValidator[i].paramGameApiDesc.split(",");
                if (paramsFunc[0] != ""){
                    for (var j = 0; j < paramsFunc.length; j++) {
                        parmsRdy = parmsRdy + paramsFunc[j].trimLeft().split(" ")[1] + ",";
                    }
                }
                tmpP = tmpP + "this." + gameFunctionValidator[i].nameGameApiDesc + " = function (" + parmsRdy.substring(0, parmsRdy.length - 1) + ") { };";
            } else {
                functionVarAuthorize.push(new RegExp("player." + gameFunctionValidator[i].nameGameApiDesc));
                tmpP =  tmpP + "var " + gameFunctionValidator[i].nameGameApiDesc + ";";
            }
        }
        player = player + tmpP + playerEnd;
    }
    
})

   


var JSHINT_options = {};

function set_options() {
    JSHINT_options = {
        undef: true,
        unused: false,
        browser: false,
        devel: false,
        browserify: false,
        couch: false,
        dojo: false,
        jasmine: false,
        jquery: false,
        mocha: false,
        module: false,
        mootools: false,
        node: false,
        nonstandard: false,
        phantom: false,
        prototypejs: false,
        qunit: false,
        rhino: false,
        shelljs: false,
        typed: false,
        worker: false,
        wsh: false,
        yui: false
    };
}

set_options();



function validate(type) {

    if (document.getElementById("msgSuccess")) {
        document.getElementById("msgSuccess").style.visibility = "hidden";
    
    }

    if (txtATest != "") {
        code = player + "\n" + txtATest;
        JSHINT(code, JSHINT_options);
        errors = JSHINT.errors;
        count = errors.length;
        data = "";

        var listExclude = [/player[^\.]/g, /player2/g, /\.clearBomb/g, /.isAlive/g, /player\.position\.x[ ]*=[^=]/g, /player\.position\.y[ ]*=[^=]/g, /hasBonus[ ]*=[^=]/g, /hasBonus[ ]*=[^=]/g, /tourBonus[ ]*=[^=]/g, /avatar[ ]*=[^=]/g, /maxBombs[ ]*=[^=]/g, /bombs[ ]*=[^=]/g];

        for (var i = 0; i < listExclude.length; i++) {
            if (listExclude[i].test(txtATest) == true) {
                data += "Alors on triche ? <br>";
            }
        }

        var indices = getIndicesOf("player.", txtATest);
        var sizePlayerComaWord = 7;
        var testGood = false;
        var ligneErrorFuncVar = 1;
        for (var i = 0; i < indices.length; i++) {
            testGood = false;
            sizePlayerComaWord = 7;
            while (txtATest[indices[i] + sizePlayerComaWord] != " " && txtATest[indices[i] + sizePlayerComaWord] != ")" && txtATest[indices[i] + sizePlayerComaWord] != ";" && txtATest[indices[i] + sizePlayerComaWord] != "=" ) {
                sizePlayerComaWord++;
            }
            var playerFuncVarTest = txtATest.substring(indices[i], indices[i] + sizePlayerComaWord);
            for (var j = 0; j < functionVarAuthorize.length; j++) {
                if (functionVarAuthorize[j].test(playerFuncVarTest)) {
                    testGood = true;
                    break;
                    
                }

            }

            if (testGood === false) {

                /* récupération de la ligne */
                ligneErrorFuncVar = 1;
                for (var x = 0; x < indices[i]; x++) {
                    console.log("")
                    if (txtATest[x] == "\n") {
                        ligneErrorFuncVar++;
                    }
                }
                data += "Ligne : " + ligneErrorFuncVar + ", erreur : " + playerFuncVarTest + " is not defined.<br>";
            }
           
        
        }

        if (count > 0) {
            for (i = 0; i < count; i++) {
                if (errors[i] != null) {
                    if (errors[i].reason.indexOf("Unrecoverable syntax error") == -1) {
                        var ligne = errors[i].line - 1
                        data += "Ligne : " + ligne + ", erreur : " + errors[i].reason + "<br>";
                    }
                    
                }
            }

        }
        if (data != "") {
            
            document.getElementById("msgError").innerHTML = data;
            document.getElementById("msgError").style.visibility = "visible";
        }
        else if (data == "" && type == "save") {
            document.getElementById("formBomberCode").submit();
        } else if (data == "" && type == "test") {
            document.getElementById("formBomberCode").setAttribute("action", "/bomberCode/testInGame");
            document.getElementById("formBomberCode").submit();
        }
    } else {
        document.getElementById("msgError").innerHTML = "Veuillez saisir du code !";
        document.getElementById("msgError").style.visibility = "visible";
    }
    

}

function getIndicesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    var startIndex = 0, index, indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }

    return indices;
}

