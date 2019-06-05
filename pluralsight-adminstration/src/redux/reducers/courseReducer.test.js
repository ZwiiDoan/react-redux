import courseReducer from "./courseReducer";
import * as courseActions from "../actions/courseActions";

it("Should add course when received CREATE_COURSE_SUCCESS", () => {
  const initialState = [{ title: "A" }, { title: "B" }];
  const newCourse = { title: "C" };
  const action = courseActions.createCourseSuccess(newCourse);

  const newState = courseReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("Should update course when received UPDATE_COURSE_SUCCESS", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];
  const updatedCourse = { id: 2, title: "New Title" };
  const action = courseActions.updateCourseSuccess(updatedCourse);

  const newState = courseReducer(initialState, action);

  expect(newState.find(course => course.id === updatedCourse.id).title).toEqual(
    updatedCourse.title
  );
  expect(newState.length).toEqual(3);
});
