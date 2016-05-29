import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // subscribe to state
  store.subscribe(() => io.emit('state', store.getState().toJS()));

  io.on('connection', (socket) => {
    // emit current state upon connection event
    socket.emit('state', store.getState().toJS());

    // emit action events into redux store
    socket.on('action', store.dispatch.bind(store));
  });
}
