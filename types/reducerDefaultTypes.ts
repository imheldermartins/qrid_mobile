type Action<Payload = unknown> = {
  type: string;
  payload: Payload;
};

type Reducer<State = unknown, Payload = unknown> = (
  state: State,
  action: Action<Payload>
) => State;

export { Action, Reducer };
