const API_URL = 'http://localhost:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const GET_USER_ID = 
  'query users($username:String!) {users(where: {username: $username}) {id}}'

const CREATE_TASK_LISTS =
  'mutation($id:ID, $title:String!){createTaskLists(input:{title:$title, owner:{connect:{where:{id:$id}}}}) {taskLists{id, title, owner{id, username}}}}'

const DELETE_TASK_LISTS  =
  `mutation($taskListID:ID, $title:String!, $userID:ID){
    deleteTaskLists(
      where:{
        id:$taskListID,
        AND:{title:$title}
        owner:{
          id:$userID
        }
      }
    ) {nodesDeleted}
  }`

  const CREATE_TASK = 
  `mutation($title:String!, $TaskListID:ID, $userID:ID){
    createTasks(
      input:{
        content:$title, 
        done:false, 
        belongsTo:{
          connect:{
            where:{
              id:$TaskListID,
              owner:{
                id:$userID
              }
            }
          }
        }
      }
    ) {tasks{id, content, done, belongsTo{id, title, owner{id, username, roles}}}}
  }`

const GET_TASKS = 
  `query($taskListID:ID) {
    tasks(
      where:{
        belongsTo:{
          id:$taskListID
        }
      }
    ) {id, content, done}
  }`

const DELETE_TASK =
  'mutation()'

const GET_TASKLIST = 
  'query taskLists($username: String!) {taskLists(where: { owner: { username: $username } }) {id title}}'


export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}

export function createTaskLists(id, title, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + token
    },
    body: JSON.stringify({
      query: CREATE_TASK_LISTS,
      variables: {
        id: id,
        title: title
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTaskLists
    })
    .catch(error => {
      throw error
    })
}

export function getTaskList (username, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: GET_TASKLIST,
      variables: {
        username: username
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.taskLists
  })
  .catch(error => {
    throw error
  })
}

export function getUserId (username, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: GET_USER_ID,
      variables: {
        username: username
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.users
  })
  .catch(error => {
    throw error
  })
}

export function deleteTaskLists (taskID, title, userID, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: DELETE_TASK_LISTS,
      variables: {
        taskID: taskID,
        title: title,
        userID: userID
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.deleteTaskLists
  })
  .catch(error => {
    throw error
  })
}

export function createTask(taskId, taskName, userID, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: CREATE_TASK,
      variables: {
        taskID: taskId,
        taskName: taskName,
        userID: userID
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTask
    })
    .catch(error => {
      throw error
    })
}

export function getTasks (taskListID, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: GET_TASKS,
      variables: {
        taskListID: taskListID
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.tasks
  })
  .catch(error => {
    throw error
  })
}
