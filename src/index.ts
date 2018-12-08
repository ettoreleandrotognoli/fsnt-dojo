import {decorate} from './funcoes'

function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

const model = decorate( {
    value: "model value"
});

model.addListener(console.log)

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


let counter = 1;
setInterval(() => {
    model.value = `${++counter}`;
}, 1000);