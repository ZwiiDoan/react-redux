import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should update and create courses", () => {
  const store = createStore(rootReducer, initialState);
  const newCourses = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];
  const updatedCourse = { id: 2, title: "New Title" };

  newCourses.forEach(course =>
    store.dispatch(courseActions.createCourseSuccess(course))
  );
  store.dispatch(courseActions.updateCourseSuccess(updatedCourse));

  const updatedState = store.getState();
  expect(updatedState.courses.length).toEqual(3);
  expect(updatedState.courses[0].title).toEqual("A");
  expect(updatedState.courses[1].title).toEqual(updatedCourse.title);
  expect(updatedState.courses[2].title).toEqual("C");
});
