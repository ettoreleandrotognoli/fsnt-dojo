function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

const model = {
    value : "model value"
};

const template = `
    <div class="container">
    <form>
        <div class="form-group">
            <label> Some Field </label>
            <input type="text" value="${model.value}" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Do something</button>
   </form>
   </div>
`;

const body = document.getElementsByTagName("body");
const component = createElementFromHTML(template);
body[0].append(component);


let counter = 0;
setInterval(() => {
    model.value = `${++counter}`;
    console.log(counter);
}, 1000);