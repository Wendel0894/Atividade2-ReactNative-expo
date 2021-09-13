import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
//import { Task } from '../components/TaskItem';

import { TodoInput } from '../components/TodoInput';

interface Task{
  id: number,
  title: string,
  done: boolean
}

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const taskFound = tasks.find(task => task.title === newTaskTitle);

    if ( taskFound ) {
      Alert.alert(
        'Task Invalida !',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    } else {
      setTasks([...tasks, newTask]);
    }

  }

  function handleToggleTaskDone(id: number) {
    
    const oldTasks = tasks.map(task => ({...task}));
    const taskFoundIndex = oldTasks.findIndex(task => task.id === id);

    if ( taskFoundIndex !== -1 ) {
        
        if ( oldTasks[taskFoundIndex].done ) {
          oldTasks[taskFoundIndex].done = false;
        } else {
          oldTasks[taskFoundIndex].done = true;
        }

        console.log(oldTasks)
        setTasks(oldTasks);

    } else {
      return; //sair da função
    }
       
  }

  function handleRemoveTask(id: number) {
  
      Alert.alert(
        "Remover Item",
        'Tem certeza que deseja remover essa task ?',
        [
          {
            text: 'Sim',
            onPress: () => {
              //retorna um novo array contendo somente as taks com id diferente da task a ser removida
              const taksAfterRemove = tasks.filter(index => index.id !== id);
              setTasks(taksAfterRemove);
            }
          },
          {
            text: 'Não',
            onPress: () => {return;}
          }
        ]
      );
    
  }

  function handlEditTask(id:number, newTaskTitle:string) {

      const oldTasks = tasks.map(task => ({...task}));
      const taskIndexFound = oldTasks.findIndex(task => task.id === id);

      if(taskIndexFound !== -1) {
        oldTasks[taskIndexFound].title = newTaskTitle;
        setTasks(oldTasks);
      } else {
        return;
      }

  }

  
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handlEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})