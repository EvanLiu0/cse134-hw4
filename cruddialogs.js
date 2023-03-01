import "./node_modules/dompurify/dist/purify.js";
import { db, dbFind, notifyDBChanged } from "./blog.js";

function createLIFromString(htmlstring) {
  let newLI = document.createElement("li");
  newLI.innerHTML = htmlstring.trim();

  return newLI;
}

export function showEditDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let dialogHead = document.createElement("h2");
  dialogHead.innerText = "Edit Post";
  el.appendChild(dialogHead);

  let titleString = document.createElement("label");
  titleString.innerText = "Post Title: ";
  el.appendChild(titleString);

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "titleInput");
  el.appendChild(titleInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let dateTitle = document.createElement("label");
  dateTitle.innerText = "Post Date: ";
  el.appendChild(dateTitle);

  let dateInput = document.createElement("input");
  dateInput.setAttribute("id", "dateInput");
  el.appendChild(dateInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let summaryTitle = document.createElement("label");
  summaryTitle.innerText = "Post Summary: ";
  el.appendChild(summaryTitle);

  let summaryInput = document.createElement("input");
  summaryInput.setAttribute("id", "summaryInput");
  el.appendChild(summaryInput);

  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));

  let cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.setAttribute("id", "close-btn");
  cancel.onclick = () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  };
  el.appendChild(cancel);

  let accept = document.createElement("button");
  accept.innerText = "Ok";
  accept.setAttribute("id", "accept-btn");
  accept.onclick = () => {
    let ind = dbFind(args);
    let tempLI = createLIFromString(args);
    tempLI.childNodes[0].textContent =
      document.getElementById("titleInput").value;
    alert(db);
    db[dbFind(args)] = tempLI.innerHTML;
    alert(db);
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
    notifyDBChanged();
  };
  el.appendChild(accept);

  document.body.appendChild(el);

  el.showModal();
}

export function showDeleteDialog(args) {
  let el = document.createElement("dialog");
  el.setAttribute("autofocus", "");
  el.setAttribute("style", "text-align: center;");

  let accept = document.createElement("button");
  accept.innerText = "Ok";
  accept.setAttribute("id", "close-btn");
  el.appendChild(accept);

  document.body.appendChild(el);

  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementsByTagName("dialog")[0].close();
    document.body.removeChild(document.body.lastChild);
  });

  el.showModal();
  notifyDBChanged();
}
