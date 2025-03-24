import userSlice, {
  register,
  login,
  apiGetUser,
  updateUser,
  logout,
  initialState
} from '../src/slices/user';

// const initialState = {
//   isAuthChecked: false,
//   user: {
//     email: '',
//     name: ''
//   },
//   error: ''
// };

const mockUser = {
  email: 'test@test.ru',
  name: 'testt'
};

describe('тесты userSlice', () => {
  it('register success', () => {
    const action = {
      type: register.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('register rejected', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'Error' }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('login success', () => {
    const action = {
      type: login.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('login rejectes', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'Error' }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('success call getUser', () => {
    const action = {
      type: apiGetUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('error call getUser', () => {
    const action = {
      type: apiGetUser.rejected.type,
      error: { message: 'Error' }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('user upd success', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('user upd success fail', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error' }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: 'Error'
    });
  });

  it('logout success', () => {
    const action = {
      type: logout.fulfilled.type
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: ''
    });
  });
});
