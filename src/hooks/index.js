import { useState, useEffect } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import db from '../firebase';
import { collatedTasksExist } from '../helpers/index';

const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = db.collection('tasks').where('userId', '==', '001');

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where('projectId', '==', selectedProject);
    } else if (selectedProject === 'TODAY') {
      unsubscribe = unsubscribe.where(
        'date',
        '==',
        format(new Date(), 'MM/dd/yyyy')
      );
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      unsubscribe = unsubscribe.where('date', '==', '');
    }

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));

      console.log(newTasks);

      setTasks(
        selectedProject === 'NEXT'
          ? newTasks.filter(
              task =>
                differenceInCalendarDays(
                  format(task.date, 'MM/dd/yyyy'),
                  format(new Date(), 'MM/dd/yyyy')
                ) <= 7 && !task.archived
            )
          : newTasks.filter(task => !task.archived)
      );

      setArchivedTasks(newTasks.filter(task => task.archived));
    });

    return () => unsubscribe();
  }, [selectedProject]);
  console.table(tasks);
  return { tasks, archivedTasks };
};

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    db.collection('projects')
      .where('userId', '==', '001')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          docId: project.id,
          ...project.data(),
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};

export { useTasks, useProjects };
