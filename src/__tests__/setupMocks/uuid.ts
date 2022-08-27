jest.mock('uuid', () => ({ v4: () => Math.floor(Math.random() * Date.now()) }));
export {};
