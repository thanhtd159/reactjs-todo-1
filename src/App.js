import React from 'react';
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            tasks: [], // id, name, state
            isDisplayForm: false
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }

    onGenerateData = () => {
        let tasks = [
            {
                id: this.generateId(),
                name: "Di",
                status: true
            },
            {
                id: this.generateId(),
                name: "Ngu",
                status: false
            },
            {
                id: this.generateId(),
                name: "An",
                status: true
            }
        ];

        console.log(tasks);
        this.setState({
            tasks: tasks
        })

        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateId() {
        return this.s4() + this.s4() +'-'+ this.s4() + this.s4();
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    };

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    };

    render() {
        let {tasks, isDisplayForm} = this.state;
        let elmTaskForm = isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm}></TaskForm> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    {/*{form}*/}
                    {elmTaskForm}

                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>

                        <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
                            generate data
                        </button>

                        <Control></Control>


                        <TaskList tasks={tasks}></TaskList>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
