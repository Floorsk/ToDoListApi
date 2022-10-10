Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "67903mBc10QJ3uJcgNHq5K5S1BffVinqdjjl89YY", // This is your Application ID
  "Zi8cUs0Wf9O50TRIWl4OE9Ok6p8WSKk870o7P8xQ" // This is your Javascript key
);
const Tarefa = Parse.Object.extend("Assignment");
const listaTarefas = document.getElementById("listaTarefas");
const inputDescricao = document.getElementById("inputDescricao");
const btInsert = document.getElementById("btInserir");

const handleClickBtRemover = async (id) => {
  const query = new Parse.Query(Assignment);
  try {
    const tarefa = await query.get(id);
    const response = await tarefa.destroy();
    console.log("Deleted ParseObject", response);
    lerTarefas();
  } catch (error) {
    console.log("Error while fetching Tarefa", error);
  } 
};

const handleClickBtFeita = async (id) => {
  const query = new Parse.Query(Assignment);
  try {
  const tarefa = await query.get(id);
  const feita = tarefa.get("feita");
  tarefa.set("feita", !feita);
  tarefa.save();
  lerTarefas(); 
  } catch (error) {
    console.log("Error while fetching Tarefa", error);
  } 
};

const lerTarefas = async () => {
  const query = new Parse.Query(Tarefa);
  try {
    const results = await query.find();
    listaTarefas.innerHTML = "";
    for (const tarefa of results) {
      const descricao = tarefa.get("descricao");
      const aspas="'"
      const nome = tarefa.id
      const feita = tarefa.get("feita");
      if(feita==true){
        var check="V"
      }else{
        var check="X"
      }
      listaTarefas.innerHTML += '<li>'+descricao+' - <input type="button" onclick=" handleClickBtRemover('+aspas+nome+aspas+') " value="Remover"/>  - <input type="button"  onclick=" handleClickBtFeita('+aspas+nome+aspas+') " value="'+check+'"/>';
    }
  } catch (error) {
    console.error("Error while fetching Tarefa", error);
  }
};

const inserirTarefa = async () => {
  const descricao = inputDescricao.value.trim();
  if (!descricao) {
    alert("Favor inserir uma descrição!");
    return;
  }
  const tarefa = new Parse.Object("Tarefa");
  tarefa.set("descricao", descricao);
  try {
    const result = await tarefa.save();
    console.log("Tarefa created", result.id);
  } catch (error) {
    console.error("Error while creating Tarefa: ", error);
  }
  inputDescricao.value = "";
  inputDescricao.focus();
  lerTarefas();
};

lerTarefas();

btInsert.onclick = inserirTarefa;