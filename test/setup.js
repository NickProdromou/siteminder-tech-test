import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

chai.use(sinonChai);

const dom = new JSDOM('<!doctype html><html><body></body></html>');

const { window } = dom;

global.window = window;
global.document = window.document;

configure({ adapter: new Adapter() });

global.sinon = sinon;
global.expect = chai.expect;
