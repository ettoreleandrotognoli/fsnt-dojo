import {DOMParser} from 'xmldom'
export type Listener = Function;


export interface Observable {
    listeners: Array<Listener>;
    addListener(listener: Listener)
}


export function decorate<E>(model: E): E & Observable {
    const observer = new Model;

    const proxyHandler: ProxyHandler<any> = {
        get: (target, fieldName) => {
            if (fieldName in observer) {
                return observer[fieldName]
            }
            return target[fieldName];
        },
        set: (target, fieldName, value) => {
            if (fieldName in observer) {
                observer[fieldName] = value
            } else {
                target[fieldName] = value
                observer.publish(target);
            }
            return true;
        },
        has: (target, fieldName) => {
            return fieldName in target || fieldName in observer
        }

    }
    const newModel = new Proxy(model, proxyHandler) as E & Observable;
    return newModel;

}


export class Model {

    public listeners: Listener[] = [];

    public addListener(listener: Listener) {
        this.listeners.push(listener)
    }

    public publish(event: any) {
        this.listeners.forEach((item) => item(event))

    }
}

export function renderTemplate(template: string, model: object) {
    let result = template
    Object.entries(model)
        .forEach(([key, value]) => {
            const regex = RegExp('\{\{ *' + key + ' *\}\}', 'g');
            result = result.replace(regex, value)
        })
    return result
}

export function renderComponent(domParser: any, template: string, model: object){
    const result = renderTemplate(template, model)
    const element = domParser.parseFromString(result, 'text/html')
    Object.entries(model)
    .forEach(([key, value]) => {
        element.querySelector(`[bind="${key}"]`).onchange=((event) => {
            model[key] = event.target.value
        })
    })
    return element.children[0]
}