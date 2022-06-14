export type ConvertTimestampDB<T> = Omit<T, 'timestamp'> & { timestamp: object };
