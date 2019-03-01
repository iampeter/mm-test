import React, {Component} from 'react';
import { Form, Field } from 'react-final-form'
import {Client4} from 'mattermost-redux/client';
import './App.css';

class App extends Component {
    state = {
        result: null,
        url: "http://localhost:8065",
    };

    onSubmit(data) {
        console.log(data);

        this.setState({
            ...this.state,
            url: data.url,
        });

        Client4.setUrl(data.url);

        Client4.login(data.login, data.password).then(result => {
            console.log(result);
            this.setState({
                ...this.state,
                result: "OK",
            });
        }, error => {
            console.log(error);
            this.setState({
                ...this.state,
                result: "Error",
            });
        });
    }

    render() {
        return (
            <div className="App">
                <Form
                    onSubmit={this.onSubmit.bind(this)}
                    initialValues={{url: this.state.url}}
                    render={({ handleSubmit, pristine, invalid }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>MM URL</label>
                                <br/>
                                <Field name="url" component="input" placeholder="MM URL" />
                            </div>
                            <div>
                                <label>Login</label>
                                <br/>
                                <Field name="login" component="input" placeholder="Login" />
                            </div>
                            <div>
                                <label>Password</label>
                                <br/>
                                <Field name="password" component="input" placeholder="Password" />
                            </div>
                            <button type="submit" disabled={pristine || invalid}>
                                Submit
                            </button>
                        </form>
                    )}
                />
                <pre>
                    {!!this.state.result && this.state.result}
                </pre>
            </div>
        );
    }
}

export default App;
