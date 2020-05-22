import React from 'react';
import ReactDOM from 'react-dom';

class AppBk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            number: 0,
            form: 'Initial data...',
            keyList: [
                {
                    component: 'First...',
                    id: 1
                },
                {
                    component: 'Second...',
                    id: 2
                },
                {
                    component: 'Third...',
                    id: 3
                }
            ]
        };

        this.setStateHander = this.setStateHander.bind(this);
        this.forceUpdateHander = this.forceUpdateHander.bind(this);
        this.setNewNumber = this.setNewNumber.bind(this);
        this.formUpdateState = this.formUpdateState.bind(this);
        this.layThongTin = this.layThongTin.bind(this);
        this.xoaThongTin = this.xoaThongTin.bind(this);
        this.addComponent = this.addComponent.bind(this);
        // this.removeComponent = this.removeComponent.bind(this);
    }

    forceUpdateHander() {
        this.forceUpdate();
    }

    setStateHander() {
        const newState = this.state.data.slice();
        newState.push("Add new State... /n");
        this.setState({data: newState});
    }

    setNewNumber() {
        this.setState({number: this.state.number+1})
    }

    formUpdateState(e) {
        this.setState({form: e.target.value})
    }

    layThongTin() {
        const text = this.refs.myInput.value;
        alert(text);
    }
    xoaThongTin() {
        this.setState({form: ''});
        ReactDOM.findDOMNode(this.refs.myInput).focus();
    }
    addComponent() {
        const newComponent = this.state.keyList;
        newComponent.push({
            id: this.state.keyList.length + 1,
            component: this.refs.icomponent.value
        });
        this.setState({keyList: newComponent});
    }
    removeComponent(param, event) {
        console.log('remove: '+param.component);
        console.log('remove: '+param.id);
    };
    render() {
        return (
            <div>
                <button onClick={this.setStateHander}>Set State</button>: <span>New state: {this.state.data}</span>
                <br/>
                <button onClick={this.forceUpdateHander}>Force Update</button>: <span>Random: {Math.random()}</span>
                <br/>
                <button onClick={this.setNewNumber}>Increment</button>
                <Content myNumber={this.state.number}></Content>
                <br/>

                {/*{form}*/}
                {/*<input type="text" value={this.state.form} onChange={this.formUpdateState}/>*/}
                {/*<br/>*/}
                {/*value: <span>{this.state.form}</span>*/}

                {/*<FormJs dataProp={this.state.form} updateStateProp={this.formUpdateState}></FormJs>*/}

                <input type="text" ref="myInput" value={this.state.form} onChange={this.formUpdateState}/>
                <br/>
                <button onClick={this.layThongTin} > Click Read</button>
                <button onClick={this.xoaThongTin} > Click Xoa </button>
                <br/>
                <br/>
                <br/>

                {/*{list}*/}
                <input type="text" ref="icomponent"/>
                <button onClick={this.addComponent}>Add component</button>

                <div className="key-list">
                    {this.state.keyList.map((dynamicComponent, i) => <KeyList
                        componentData={dynamicComponent}
                        remove={(e) => this.removeComponent(dynamicComponent, e)}
                        id={i}>
                    </KeyList>)}
                </div>

            </div>
        );
    }
}
class KeyList extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.componentData.component}</div>
                <div>{this.props.componentData.id}</div>
                <button onClick={this.props.remove}>[X]</button>
            </div>
        );
    }
}
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.headerProp}</h1>
            </div>
        );
    }
}

class Content extends React.Component {
    componentWillMount() {
        console.log('1. Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('2. Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('3. Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('4. Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('5. Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('6. Component WILL UNMOUNT!')
    }
    render() {
        return (
            <div>
                <h2>{this.props.myNumber}</h2>
            </div>
        );
    }
}

class FormJs extends React.Component {
    render() {
        return (
            <div>
                <input type = "text" value = {this.props.dataProp}
                       onChange = {this.props.updateStateProp} />
                <h3>{this.props.dataProp}</h3>
            </div>
        );
    }
}
export default App;
