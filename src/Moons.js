import React, { Component } from 'react';

export class Moons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {


        // https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native
        fetch("https://ngacy8xnvg.execute-api.us-east-1.amazonaws.com/v1/moons", { method: 'GET' })
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

    render() {
        const { error, isLoaded, items } = this.state;
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
}
