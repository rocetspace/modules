import React from 'react';
import ReactDOM from 'react-dom';
import ReactJSS from 'react-jss';

const render = (children) => ReactDOM.render(
    React.createElement("h1", { children }),
    document.getElementById('root'),
);;

System.import('/second.js').then((response) => {
    const Module = response['default']['default'];
    console.log(ReactJSS === Module.reactJss);

    setTimeout(() => {
        render(
            React.createElement("div", {
                children: [
                    React.createElement("h1", { children: "Hello world" }),
                    Module.element
                ]
            }),
        );
    }, 1000);
});

// first render
render(
    React.createElement("div", {
        children: [
            React.createElement("h1", { children: "Hello world" }),
            React.createElement("h5", { children: "Loading..." }),
        ]
    })
);
