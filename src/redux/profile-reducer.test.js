import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

const state = {
    posts: [
        {id: 1, name: 'Rustam', message: 'Hi, how are you?', likes: 'like', likesCount: 10},
        {id: 2, name: 'Artem', message: 'It\'s my first post', likes: 'dislike', likesCount: 15},
        {id: 3, name: 'Kamol', message: "I'm driver", likes: 'like', likesCount: 20},
        {id: 4, name: 'Masha', message: "I'm barmen", likes: 'like', likesCount: 20},
        {id: 5, name: 'Dasha', message: "I'm manager", likes: 'like', likesCount: 20},
    ]
}

test('length of posts should be incremented', () => {
    const action = addPostActionCreator("it-kamasutra.com");
    const newState = profileReducer(state, action);
    
    expect(newState.posts.length).toBe(6);
    
  });

test('message of new posts should be correct', () => {
    const action = addPostActionCreator("it-kamasutra.com");
    const newState = profileReducer(state, action);

    expect(newState.posts[5].message).toBe("it-kamasutra.com");
})

test('after deleting of messages should be decrement', () => {
    const action = deletePost(1);
    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4)
})

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    const action = deletePost(1000);
    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
})
