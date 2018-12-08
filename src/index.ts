import { decorate, renderComponent } from './funcoes';
import { renderTemplate } from './funcoes';


function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}


function renderModel() {
    const component = renderComponent(new DOMParser, template, model);
    const oldComponent = body[0].firstElementChild;
    body[0].replaceChild(component, oldComponent);
};



const model = decorate({
    value: "1"
});

model.addListener(console.log);

const template = `
    <div class="container">
    <form>
        <div class="form-group">
            <label> Some Field </label>
            <input type="text" value="{{ value }}" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Do something</button>
   </form>
   <form>
    <div class="form-group">
        <label> Some Field </label>
        <input type="text" value="{{ value }}" bind="value" class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Do something</button>
    </form>
   </div>
`;

const body = document.getElementsByTagName("body");
const component = createElementFromHTML(template);

model.addListener(renderModel);
renderModel();
