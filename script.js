$(function () {
    var operacao = "A";
    var indice_selecionado = -1;
    var tblcadastro = localStorage.getItem("tblcadastro");
    tblcadastro = JSON.parse(tblcadastro);
    if (tblcadastro == null)
        tblcadastro = [];

    $("#frmCadastro").on("btnSalvar", function () {

        if (operacao == "A")
            adicionarElemento();
        else
            editarElemento();
    });
    
    $("#tblcadastro").on("click", "#btnSalvar", function(){
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        
        var cli = JSON.parse(tblcadastro[indice_selecionado]);
        $("#txtcpf").val(cli.cpf);
        $("#txtnome").val(cli.nome);
        $("#txtprofissao").val(cli.profissao);
        $("#txttelefone").val(cli.telefone);
        $("#txtcpf").focus();
    });
    
    $("#tblcadastro").on("click", "#btnExcluir", function(){
        indice_selecionado = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });
    

    function adicionarElemento() {
        var cliente = JSON.stringify({
            
            cpf: $("#txtcpf").val(),
            nome: $("#txtnome").val(),
            profissao: $("#txtprofissao").val(),
            telefone: $("#txttelefone").val()
        });
        tblcadastro.push(cliente);
        localStorage.setItem("tblcadastro", JSON.stringify(tblcadastro));
        alert("Registro adicionado com sucesso");
        return true;
    }
    
    function editarElemento(){
         tblcadastro[indice_selecionado] = JSON.stringify({
            nome: $("#txtnome").val(),
            cpf: $("#txtcpf").val(),
            profissao: $("#txtprofissao").val(),
            telefone: $("#txttelefone").val()
        });
        localStorage.setItem("tblcadastro", JSON.stringify(tblcadastro));
        alert("Registro editado com sucesso");
        operacao = "A";
        return true;
    }
    
    function excluir(){
        tblcadastro.splice(indice_selecionado, 1);
        localStorage.setItem("tblcadastro", JSON.stringify(tblcadastro));
        alert("Registro Exluido com Sucesso");
    }

    function listar() {
        $("#tblcadastro").html("");
        $("#tblcadastro").html(
                "<thead>" +
                "   <tr>" +
                "       <th>CPF</th>" +
                "       <th>Nome</th>" +
                "       <th>Profissao</th>" +
                "       <th>Telefone</th>"  + 
                "       <th></th>" +
                "   </tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                );
        for (var i in tblcadastro) {
            var cli = JSON.parse(tblcadastro[i]);
            $("#tblcadastro tbody").append("<tr>");
            $("#tblcadastro tbody").append("<td>" + 
                    cli.cpf + "</td>");
            $("#tblcadastro tbody").append("<td>" + 
                    cli.profissao + "</td>");
             $("#tblcadastro tbody").append("<td>" + 
                    cli.telefone + "</td>");
              $("#tblcadastro tbody").append("<td>" + 
                    cli.salario + "</td>");
            $("#tblcadastro tbody").append(
                    "<td> "+
                        " <img src='img/edit.png' alt='" + 
                        i + "' id='btnSalvar'></img>"+
                        "<img src='img/delete.png' alt='" + 
                        i + "' id='btnExcluir'></img>"+
                    "</td>");
            $("#tblcadastro tbody").append("</tr>");
        }
    }

    listar();
});