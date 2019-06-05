import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fecthMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

//Test async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fecthMock.restore();
  });

  describe("loadCourses", () => {
    it("Should create BEGIN_API_CALL and LOAD_COURSE_SUCCESS actions when loading courses", () => {
      fecthMock.mock("end:/courses/", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("updateCourseSuccess", () => {
  it("should create a UPDATE_COURSE_SUCCESS action", () => {
    const course = courses[0];
    const expectedAction = {
      type: types.UPDATE_COURSE_SUCCESS,
      course
    };

    const actualAction = courseActions.updateCourseSuccess(course);

    expect(actualAction).toEqual(expectedAction);
  });
});
