
import React, { useEffect, useRef, useState } from 'react';
import {
    TouchableOpacity,
    View,
    TouchableOpacityProps,
    StyleSheet,
    Image,
    TextInput
} from 'react-native';

import { Feather } from '@expo/vector-icons'
import trashIcon from '../assets/icons/trash/trash.png';
import edit from '../assets/icons/edit/edit.png';
import { Task } from './TasksList';


interface TaskItemProps extends TouchableOpacityProps {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string) => void;
}

export const TaskItem = ({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) => {

    const [taskEdit, setTaskEdit] = useState(item.title);
    const [isEdit, setIsEdit] = useState(false);
    const textInput = useRef<TextInput>(null);

    function handleActiveEditingTask() {
        setIsEdit(true);
    }

    function handleCancelEditingTask() {
        setTaskEdit(item.title);
        setIsEdit(false);
    }

    function handleSubmitEditingTask() {
        editTask(item.id, taskEdit);
        setIsEdit(false);
    }

    function handleCursorForEditingTask() {

        if (textInput.current && isEdit) {
            textInput.current.focus();
        } else {
            textInput.current?.blur;
        }

    }

    useEffect(handleCursorForEditingTask, [isEdit]);


    return (

        <>
            <View style={styles.containerLeft}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {
                            item.done && (
                                <Feather
                                    name="check"
                                    size={12}
                                    color="#FFF"
                                />
                            )}
                    </View>

                    <TextInput
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        value={taskEdit}
                        onChangeText={setTaskEdit}
                        editable={isEdit}
                        ref={textInput}
                        onSubmitEditing={handleSubmitEditingTask}

                    />

                </TouchableOpacity>
            </View>

            <View style={styles.containerRight}>

                { isEdit ?

                    <TouchableOpacity activeOpacity={0.6} onPress={handleCancelEditingTask}>
                        <Feather name="x" size={24} color="#b2b2b2"  />
                    </TouchableOpacity>
                
                   :

                    <TouchableOpacity
                        testID={`edit-${index}`}
                        activeOpacity={0.6} 
                        onPress={handleActiveEditingTask}
                    >
                        <Image source={edit} />
                    </TouchableOpacity>

                }                

                <TouchableOpacity
                    activeOpacity={0.6}
                    testID={`trash-${index}`}
                    style={{paddingHorizontal: 24, opacity: isEdit ? 0.2 : 1}}
                    disabled={isEdit}
                    onPress={() => removeTask(item.id)} //comunicação indireta: remove a task
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>

            </View>


        </>

    )

}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    containerLeft: {
        width: '70%'
    },
    containerRight: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '27%',
    }
})