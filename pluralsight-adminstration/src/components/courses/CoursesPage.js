import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import * as authorActions from "../../redux/actions/authorActions";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToManageCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch(error => alert("Failed to load courses " + error));
    }
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert("Failed to load authors " + error));
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToManageCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.setState({ redirectToManageCoursePage: true })}
          style={{ marginBottom: 20 }}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
