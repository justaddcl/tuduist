import { collatedTasks } from '../constants/index';

const collatedTasksExist = selectedProject => {
  collatedTasks.find(task => task.key === selectedProject);
};

export { collatedTasksExist };
