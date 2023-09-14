import "./login.scss";
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AuthService from "../../api/auth/AuthService";
import * as Yup from "yup";

type Props = {};

type State = {
  redirect: string | null;
  mail: string;
  password: string;
  loading: boolean;
  message: string;
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      redirect: null,
      mail: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  async componentDidMount() {
    const currentUser = await AuthService.getCurrentUser();
    console.log("login" + currentUser);
    if (currentUser) {
      this.setState({ redirect: "/home" });
    }
  }

  // componentWillUnmount() {
  //   window.location.reload();
  // }

  validationSchema() {
    return Yup.object().shape({
      mail: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { mail: string; password: string }) {
    const { mail, password } = formValue;

    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(mail, password).then(
      () => {
        this.setState({
          redirect: "/home",
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { loading, message } = this.state;

    const initialValues = {
      mail: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="mail">Email</label>
                <Field
                  name="mail"
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="mail"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
