export const authSignOut = jest.fn();

jest.mock('firebase-cfg/firebase-config', () => ({
  auth: {
    currentUser: {
      uid: 'testUid',
      email: 'test@test.com',
      emailVerified: true,
      metadata: {
        creationTime: 'Mon, 18 Jul 2022 10:32:00 GMT',
        lastSignInTime: 'Mon, 18 Jul 2022 12:57:22 GMT',
      },
    },
    signOut: () => authSignOut(),
  },
}));
