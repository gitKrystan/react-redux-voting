import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // subscribe to state
  store.subscribe(() => io.emit('state', store.getState().toJS()));

  // emit current state upon connection event
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  });
}
