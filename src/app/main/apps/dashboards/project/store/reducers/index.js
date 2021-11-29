import { combineReducers } from 'redux';
import widgets from './widgets.reducer';
import projects from './projects.reducer';
import workflow from './workflowTask.reducer';
import reportState from './summary.reducer';
const reducer = combineReducers({
    widgets,
    projects,
    workflow,
    reportState
});

export default reducer;
