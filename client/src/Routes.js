import { Switch, Route } from "react-router-dom"
import UpdateNote from "./component/update-note/UpdateNote"
import Home from "./component/home/Home";

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/update/:noteId" component={UpdateNote} />
            </Switch>
        </div>
    );
};

export default Routes;