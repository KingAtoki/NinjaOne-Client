import {jest} from '@jest/globals';

export const mockDevicesApi = {
  get: jest.fn().mockResolvedValue([]),
  post: jest.fn().mockResolvedValue({}),
  put: jest.fn().mockResolvedValue({}),
  deleteEndpoint: jest.fn().mockResolvedValue({})
};

export default mockDevicesApi;