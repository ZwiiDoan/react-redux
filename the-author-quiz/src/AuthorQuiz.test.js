import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount, shallow, render} from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

const state = {
  turnData: {
    books:['The Adventures of Huckleberry Finn', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The Adventures of Huckleberry Finn']
    }
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>, div);
  })

  describe("when no answer has ben selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>);
    });

    it("Turn should have no background color", ()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })
  });

  describe("When wrong answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...Object.assign({}, state, {highlight: 'wrong'})} onAnswerSelected={()=>{}}/>);
    });

    it("Turn should have red background color", ()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    })
  });

  describe("When correct answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...Object.assign({}, state, {highlight: 'correct'})} onAnswerSelected={()=>{}}/>);
    });

    it("Turn should have red background color", ()=>{
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    })
  });

  describe("When the first answer is selected", ()=>{
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');    
    });

    it("onAnswerSelected should be called", ()=>{
        expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive The Adventures of Huckleberry Finn", ()=>{
        expect(handleAnswerSelected).toHaveBeenCalledWith("The Adventures of Huckleberry Finn");
    });
});
})