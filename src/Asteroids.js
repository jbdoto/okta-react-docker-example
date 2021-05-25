import React, {Component} from 'react';
import {withOktaAuth} from '@okta/okta-react';

export default withOktaAuth(class Asteroids extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {

        const accessToken = this.props.authState.accessToken;

        if (this.props.authState.isAuthenticated) {

            // https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native
            fetch("https://gs5xv7mt93.execute-api.us-east-1.amazonaws.com/asteroids", {
                method: 'GET',
                headers: new Headers({
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    }
                )
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(items)
            return (
                <ul>
                    {items.map(item => (
                        <li>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }
    }

});
