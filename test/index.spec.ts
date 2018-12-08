
import { expect } from 'chai';
import { Model, renderComponent } from '../src/funcoes';
import { decorate} from '../src/funcoes';
import {renderTemplate} from '../src/funcoes';
import { DOMParser } from 'xmldom';

describe('Model', () => {
    it('iniciar com lista vazia',()=>{
        const model = new Model;
        expect(model.listeners).to.empty;
    });

    it('addListener', () => { 
        const model = new Model;
        const listener = () =>{};

        const total = model.listeners.length;
        model.addListener(listener);
        
        expect(model.listeners.length).to.equal(total + 1);
    });

    it('publish', () => {
        
        let called = false;
        const listener = (event) => {
            called = true;
            expect(event).to.equal('alow')

        };
        const model = new Model;
        model.addListener(listener);
        model.publish('alow');
        expect(called).to.equal(true);
    
    });

});

describe('decorate', () => {

    it('must return the same model but observable', () =>{
        const a  = {};
        const b = decorate(a);
        expect('addListener' in b ).to.equal(true);
        expect('addListener' in a ).to.equal(false);
    });

    it('"A" acessível', () => {
        const a =decorate({});
        a['name'] = 'test';
        expect(a['name']).to.equal('test');
    });

    it("addListener must be a function", () =>{
        const a = decorate({});
        expect(typeof a.addListener === 'function').to.true
    });

    it('addListener must receive a listener', ()=>{
        const a = decorate({});
        const listener = () => {};
        a.addListener(listener)
    });


    it('addListener must add  a listener on listeners', ()=>{
        const a = decorate({});
        const listener = () => {};
        a.addListener(listener)
        expect(a.listeners.indexOf(listener) !== -1).to.true
    });

    it('must be called when set', () => {
        const a = decorate({});
        let called = false;
        const listener = () => {
            called = true;
        }
        a.addListener(listener)
        a['field'] = 'value';
        expect(called).to.true
    });
});

describe('Template Tests', () => {
    it('interpolation', () => {
        const model = {name:'world'};
        const template = `hello {{ name }}`;
        const result = renderTemplate(template,model)
        expect(result).to.equal('hello world')

    });

    it('DOM Test', () => {
    
        const document = '<input id = "id">'
        const component = renderComponent(new DOMParser, document, {})
        expect(component.getElementById('id')).to.not.null
        
    });

});
